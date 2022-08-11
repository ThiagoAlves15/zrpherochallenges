require 'rails_helper'

RSpec.describe "Threats", type: :request do
  setup do
    @threat = create(:threat)
    @user = create(:user)
    @token = create(:access_token)
    @params = { access_token: @token.token }
  end

  describe "GET /index" do
    it "returns threats" do
      get api_v1_threats_url, params: @params

      assert_response :success

      expect(response_json.size).to eq(1)
    end
  end

  describe "GET /unresolved_threats" do
    before do
      create(:occurrence, :assigned, :resolved)
    end

    it "returns unresolved threats" do
      get api_v1_unresolved_threats_url, params: @params

      assert_response :success

      expect(response_json.size).to eq(1)
    end
  end

  describe "POST /show" do
    it "returns threat" do
      get api_v1_threat_url(@threat), params: @params

      assert_response :success
    end
  end

  describe "POST /create" do
    before do
      @params = {
        threat: {
          latitude: @threat.latitude,
          longitude: @threat.longitude,
          name: @threat.name,
          tier: @threat.tier
        },
        access_token: @token.token
      }
    end

    it "creates threat" do
      assert_difference("Threat.count") do
        post api_v1_threats_url, params: @params, as: :json
      end

      assert_response :success
    end
  end

  describe "PATCH /update" do
    before do
      @new_name = Faker::Name.name

      @params = {
        threat: {
          latitude: @threat.latitude,
          longitude: @threat.longitude,
          name: @new_name,
          tier: @threat.tier
        },
        access_token: @token.token
      }
    end

    it "updates threat" do
      patch api_v1_threat_url(@threat), params: @params, as: :json

      assert_response :success
      @threat.reload
      expect(@threat.name).to eq(@new_name)
    end
  end

  describe "DELETE /destroy" do
    it "deletes threat" do
      assert_difference("Threat.count", -1) do
        delete api_v1_threat_url(@threat), params: @params, as: :json
      end

      assert_response :success
    end
  end
end
