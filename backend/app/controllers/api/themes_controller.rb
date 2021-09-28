class Api::ThemesController < ApplicationController
  before_action :authenticate_api_user!, only: [:create, :show]
  def index
    sorted_theme_ids = Room.order('sum_counts desc').group(:theme_id).sum(:counts).keys
    @themes = Theme.find(sorted_theme_ids)
    @themes = @themes.select { |t| t.name.include? params[:name] } if params[:name]
    @themes = @themes[0, 99]

    render "api/theme/index.json.jb"
  end

  def show
    @theme = Theme.find(params[:id])
    @rooms = @theme.rooms
    room_ids = []
    @rooms.each do |room|
      room.user_room_total_taps = UserTap.where(user_id: current_api_user, room_id: room.id).sum(:counts)
      room_ids.push(room.id)
    end

    # todo: themeのclose時とopen時で処理の切り分け
    if Time.current.to_i <= @theme.close_time
      render "api/theme/show_theme_open.json.jb"
    else
      #@userとして@themeにuser_tapsを持ってるuserを抜き出して，sum(:counts)を計算してランキング返したい
      user_ids = UserTap.where('room_id IN (?)', room_ids).distinct.pluck(:user_id)
      @users = User.order('counts DESC')
      @users = @users.where('id IN (?)', user_ids)

      # time_series
      start = @theme.created_at.to_i
      stop = @theme.close_time
      step = ((stop - start) / 100).to_i

      @time_series = (start + step).step(by: step, to: stop).map { |t| UserTap.where(created_at: Time.at(t - step)..Time.at(t)) }
      #今できてるのは，時間ごとに区切ってthemeに属してるUserTapを持ってきてる

      @time_series.map.with_index(1) { |ts, idx| { num: idx, counts: ts.sum(:counts) } }

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
