class Hero < ApplicationRecord
  has_many :occurrences

  scope :available_heroes, -> { left_outer_joins(:occurrences).where('occurrences.id IS NULL OR occurrences.resolved IS true') }
end
