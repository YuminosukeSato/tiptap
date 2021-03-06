class Theme < ApplicationRecord
  attr_accessor :counts, :duration
  belongs_to :user
  has_many :rooms
  validates :name, presence: true
  validates :rooms_num, presence: true, inclusion: { in: [1, 2] }
end
