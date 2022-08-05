require "test_helper"

class ThreatsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @threat = threats(:one)
  end

  test "should get index" do
    get threats_url, as: :json
    assert_response :success
  end

  test "should create threat" do
    assert_difference("Threat.count") do
      post threats_url, params: { threat: { latitude: @threat.latitude, longitude: @threat.longitude, name: @threat.name, tier: @threat.tier } }, as: :json
    end

    assert_response :created
  end

  test "should show threat" do
    get threat_url(@threat), as: :json
    assert_response :success
  end

  test "should update threat" do
    patch threat_url(@threat), params: { threat: { latitude: @threat.latitude, longitude: @threat.longitude, name: @threat.name, tier: @threat.tier } }, as: :json
    assert_response :success
  end

  test "should destroy threat" do
    assert_difference("Threat.count", -1) do
      delete threat_url(@threat), as: :json
    end

    assert_response :no_content
  end
end
