FactoryBot.define do
  factory :threat do
    name { Faker::Games::WarhammerFantasy.creature }
    tier { ['God', 'Dragon', 'Tiger', 'Wolf'].sample }
    latitude { Faker::Number.between(from: -180.0, to: 180.0).round(10) }
    longitude { Faker::Number.between(from: -180.0, to: 180.0).round(10) }
  end
end
