class Occurrence < ApplicationRecord
  belongs_to :hero
  belongs_to :threat
end
