require "test_helper"

class ThreatsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @threat = threats(:one)
  end

  test "should get index" do
    get threats_url
    assert_response :success
  end

  test "should get new" do
    get new_threat_url
    assert_response :success
  end

  test "should create threat" do
    assert_difference("Threat.count") do
      post threats_url, params: { threat: { latitude: @threat.latitude, longitude: @threat.longitude, name: @threat.name, tier: @threat.tier } }
    end

    assert_redirected_to threat_url(Threat.last)
  end

  test "should show threat" do
    get threat_url(@threat)
    assert_response :success
  end

  test "should get edit" do
    get edit_threat_url(@threat)
    assert_response :success
  end

  test "should update threat" do
    patch threat_url(@threat), params: { threat: { latitude: @threat.latitude, longitude: @threat.longitude, name: @threat.name, tier: @threat.tier } }
    assert_redirected_to threat_url(@threat)
  end

  test "should destroy threat" do
    assert_difference("Threat.count", -1) do
      delete threat_url(@threat)
    end

    assert_redirected_to threats_url
  end
end
