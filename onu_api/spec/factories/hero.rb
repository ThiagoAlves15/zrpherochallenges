FactoryBot.define do
  factory :hero do
    name { Faker::Name.name }
    rank { ['S', 'A', 'B', 'C'].sample }
    latitude { Faker::Number.between(from: -180.0, to: 180.0).round(10) }
    longitude { Faker::Number.between(from: -180.0, to: 180.0).round(10) }
  end
end
