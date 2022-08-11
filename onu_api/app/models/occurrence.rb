class Occurrence < ApplicationRecord
  belongs_to :hero, optional: true
  belongs_to :threat
end
