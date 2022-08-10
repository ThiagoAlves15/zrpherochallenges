# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: "onu_painel", redirect_uri: "http://localhost:3001", scopes: "public")
end

User.first_or_create(email: "onu_admin@onu.com.br", password: "baldhead", password_confirmation: "baldhead", role: User.roles[:admin])

Hero.first_or_create(name: "Saitama", rank: "B", latitude: -5.836597, longitude: -35.236007)
Hero.first_or_create(name: "Andros", rank: "S", latitude: -23.2238011, longitude: -45.8944638)
Hero.first_or_create(name: "Samurai X", rank: "A", latitude: 21.9932059, longitude: 13.6643163)

Threat.first_or_create(name: "Lain", tier: "God", latitude: -5.836597, longitude: -35.236007)
Threat.first_or_create(name: "Ponyo", tier: "Tiger", latitude: -23.2238011, longitude: -45.8944638)
Threat.first_or_create(name: "Blue eyes dragon", tier: "Dragon", latitude: 21.9932059, longitude: 13.6643163)
