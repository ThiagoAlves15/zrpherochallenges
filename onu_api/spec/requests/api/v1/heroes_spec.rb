require 'rails_helper'

RSpec.describe "Heroes", type: :request do
  setup do
    @hero = create(:hero)
    @user = create(:user)
    @token = create(:access_token)
    @params = { access_token: @token.token }
  end

  describe "GET /index" do
    it "returns heroes" do
      get api_v1_heroes_url, params: @params

      assert_response :success

      expect(response_json.size).to eq(1)
    end
  end

  describe "GET /available_heroes" do
    before do
      create(:occurrence, :assigned)
    end

    it "returns available heroes" do
      get api_v1_available_heroes_url, params: @params

      assert_response :success

      expect(response_json.size).to eq(1)
    end
  end

  describe "POST /show" do
    it "returns hero" do
      get api_v1_hero_url(@hero), params: @params

      assert_response :success
    end
  end

  describe "POST /create" do
    before do
      @params = {
        hero: {
          latitude: @hero.latitude,
          longitude: @hero.longitude,
          name: @hero.name,
          rank: @hero.rank
        },
        access_token: @token.token
      }
    end

    it "creates hero" do
      assert_difference("Hero.count") do
        post api_v1_heroes_url, params: @params, as: :json
      end

      assert_response :success
    end
  end

  describe "PATCH /update" do
    before do
      @new_name = Faker::Name.name

      @params = {
        hero: {
          latitude: @hero.latitude,
          longitude: @hero.longitude,
          name: @new_name,
          rank: @hero.rank
        },
        access_token: @token.token
      }
    end

    it "updates hero" do
      patch api_v1_hero_url(@hero), params: @params, as: :json

      assert_response :success
      @hero.reload
      expect(@hero.name).to eq(@new_name)
    end
  end

  describe "DELETE /destroy" do
    it "deletes hero" do
      assert_difference("Hero.count", -1) do
        delete api_v1_hero_url(@hero), params: @params, as: :json
      end

      assert_response :success
    end
  end
end
