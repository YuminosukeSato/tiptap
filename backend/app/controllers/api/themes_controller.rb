class Api::ThemesController < ApplicationController
  before_action :authenticate_api_user!, only: [:create, :show]
  def index
    sorted_theme_ids = Room.order('sum_counts desc').group(:theme_id).sum(:counts).keys
    @themes = Theme.find(sorted_theme_ids)
    @themes = @themes.select { |t| t.name.include? params[:name] } if params[:name]
    @themes = @themes[0, 99]
    @themes.each do |theme|
      theme.duration = theme.close_time - theme.created_at.to_i
      theme.counts = theme.rooms.sum(:counts)
    end
    render "api/theme/index.json.jb"
  end

  def show
    @theme = Theme.find(params[:id])
    @rooms = @theme.rooms
    @rooms.each do |room|
      room.user_room_total_taps = UserTap.where(user_id: current_api_user.id, room_id: room.id).sum(:counts)
    end

    # todo: themeのclose時とopen時で処理の切り分け
    if Time.current.to_i <= @theme.close_time
      render "api/theme/show_theme_open.json.jb"
    else
      #@userとして@themeにuser_tapsを持ってるuserを抜き出して，sum(:counts)を計算してランキング返したい
      @users = @rooms.map do |r|
        user_ids = UserTap.where(room_id: r.id).distinct.pluck(:user_id)
        users = User.order('counts DESC')
        users = users.find(user_ids)
      end

      @time_series = @rooms.map do |r|
        start = @theme.created_at.to_i
        stop = @theme.close_time
        step = ((stop - start) / 100).to_i

        # room内の全てのuser_tapsを[[スタートからの相対時間, counts], ...]に変換
        # 例：[[415, 10], [1633, 10], [814, 10], [3185, 10], [1325, 10], [1283, 10], ... ]
        all_room_taps = UserTap.where(room_id: r.id).pluck(:created_at, :counts).map{|t| [(t[0].to_i - start), t[1]]}

        # [[ 各ステップ, [[スタートからの相対時間, counts], ...] ], ...]に変換
        # 例：[ [0,     [[20, 10]]], 
        #      [1,     [[58, 10], [58, 10], [37, 10], [57, 10]]],
        #      [2,     [[101, 10]]], 
        #       ... ]
        steps_taps = all_room_taps.group_by{|i| i[0] / step}
        # fill empty step
        (0..99).each{|i| steps_taps[i] = [[0, 0]] if steps_taps[i].nil?}
        all_steps_taps = steps_taps.sort

        # times_seriesの欲しい形に変換
        time_series = all_steps_taps.map{|k, v| {num: k, counts: v.map{|c| c[1]}.sum }}

        # time_series = (start + step).step(by: step, to: stop).map { |t| UserTap.where(room_id: r.id, created_at: Time.at(t - step)..Time.at(t)) }
        # time_series = time_series.map.with_index(1) { |ts, idx| { num: idx, counts: ts.sum(:counts) } }
      end

      render "api/theme/show_theme_close.json.jb"
    end
  end

  def create
    @theme = Theme.create(theme_params.except(:duration))
    @theme.update(close_time: @theme.created_at.to_i + params[:duration].to_i)
    params[:rooms].each do |room_param|
      Room.create({theme_id: @theme.id, name: room_param[:name]})
    end
    @rooms = @theme.rooms
    render "api/theme/create.json.jb"
  end

  private

  def theme_params
    params.permit(:name, :rooms_num, :duration).merge(user_id: current_api_user.id)
  end

end
