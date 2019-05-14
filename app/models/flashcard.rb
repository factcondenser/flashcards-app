class Flashcard < ApplicationRecord
  has_one_attached :image
  belongs_to :user

  validates :term, :definition, presence: true
end
