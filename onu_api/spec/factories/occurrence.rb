FactoryBot.define do
  factory :occurrence do
    threat

    trait :assigned do
      hero
    end

    trait :resolved do
      resolved { true }
    end
  end
end
