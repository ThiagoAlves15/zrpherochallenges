json.extract! threat, :id, :name, :tier, :latitude, :longitude, :created_at, :updated_at
json.url threat_url(threat, format: :json)
