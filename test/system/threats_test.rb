require "application_system_test_case"

class ThreatsTest < ApplicationSystemTestCase
  setup do
    @threat = threats(:one)
  end

  test "visiting the index" do
    visit threats_url
    assert_selector "h1", text: "Threats"
  end

  test "should create threat" do
    visit threats_url
    click_on "New threat"

    fill_in "Latitude", with: @threat.latitude
    fill_in "Longitude", with: @threat.longitude
    fill_in "Name", with: @threat.name
    fill_in "Tier", with: @threat.tier
    click_on "Create Threat"

    assert_text "Threat was successfully created"
    click_on "Back"
  end

  test "should update Threat" do
    visit threat_url(@threat)
    click_on "Edit this threat", match: :first

    fill_in "Latitude", with: @threat.latitude
    fill_in "Longitude", with: @threat.longitude
    fill_in "Name", with: @threat.name
    fill_in "Tier", with: @threat.tier
    click_on "Update Threat"

    assert_text "Threat was successfully updated"
    click_on "Back"
  end

  test "should destroy Threat" do
    visit threat_url(@threat)
    click_on "Destroy this threat", match: :first

    assert_text "Threat was successfully destroyed"
  end
end
