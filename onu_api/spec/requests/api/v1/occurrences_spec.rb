require 'rails_helper'

RSpec.describe "Occurrences", type: :request do
  setup do
    @occurrence = create(:occurrence)
    @user = create(:user)
    @token = create(:access_token)
    @params = { access_token: @token.token }
  end

  describe "GET /index" do
    it "returns occurrences" do
      get api_v1_occurrences_url, params: @params

      assert_response :success

      expect(response_json.size).to eq(1)
    end
  end

  describe "POST /create" do
    before do
      @threat = create(:threat)
      @params = {
        threat_id: @threat.id,
        access_token: @token.token
      }
    end

    it "creates occurrence" do
      assert_difference("Occurrence.count") do
        post api_v1_occurrences_url, params: @params, as: :json
      end

      assert_response :success
    end
  end

  describe "PATCH /update" do
    before do
      @hero = create(:hero)

      @params = {
        hero_id: @hero.id,
        access_token: @token.token
      }
    end

    it "updates occurrence" do
      patch api_v1_occurrence_url(@occurrence), params: @params, as: :json

      assert_response :success
      @occurrence.reload
      expect(@occurrence.hero.name).to eq(@hero.name)
    end
  end
end
