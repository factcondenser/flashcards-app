class Flashcard < ApplicationRecord
  has_one_attached :image

  validates :definition, presence: true
  validates :term, presence: true, if: -> { image.blank? }
  validates :image, presence: true, if: -> { term.blank? }
end
