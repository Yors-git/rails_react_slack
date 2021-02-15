class PrimesArr < ApplicationRecord
  validates :numbers, presence: true
  validates :numbers, uniqueness: true
end
