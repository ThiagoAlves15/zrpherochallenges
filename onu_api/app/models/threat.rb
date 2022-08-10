class Threat < ApplicationRecord
  has_one :occurrence

  scope :unresolved_threats, -> { left_outer_joins(:occurrence).where('occurrences.id IS NULL OR occurrences.resolved IS false') }
end
