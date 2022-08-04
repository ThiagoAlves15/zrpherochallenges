json.extract! hero, :id, :name, :rank, :latitude, :longitude, :created_at, :updated_at
json.url hero_url(hero, format: :json)
