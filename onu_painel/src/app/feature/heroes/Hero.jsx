import { useEffect, useState } from 'react';
import ButtonGroup from './ButtonGroup';
import {
  Button,
  Input
} from '@mui/material';

function Hero(props) {
  const [name, setName] = useState(props.hero.name);
  const [rank, setRank] = useState(props.hero.rank);
  const [latitude, setLatitude] = useState(props.hero.latitude);
  const [longitude, setLongitude] = useState(props.hero.longitude);
  const [isEditing, setIsEditing] = useState(props.isEditing === props.hero.id);

  useEffect(() => {
    setIsEditing(props.isEditing === props.hero.id);

    // if (errorMessages.length > 0) {
    //   setErrors(errorMessages);
    //   dispatch(resetErrorState());
    // }
  }, [props.isEditing, props.hero.id]);

  function submitHandler(event) {
    event.preventDefault();

    const payload = {
      id: props.hero.id,
      name: name,
      rank: rank,
      latitude: latitude,
      longitude: longitude,
      accessToken: props.accessToken
    };

    props.submitEdit(payload);
    resetState();
  }

  function resetState () {
    setName(props.hero.name);
    setRank(props.hero.rank);
    setLatitude(props.hero.latitude);
    setLongitude(props.hero.longitude);
  }

  const nameElement = <p>Name: {props.hero.name}</p>;
  const rankElement = <p>Rank: {props.hero.rank}</p>;
  const locationElement = <p>Location: {props.hero.latitude} | {props.hero.longitude}</p>

  const editableNameElement =
    <Input
      id="name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />;
  const editableRankElement =
    <Input
      id="rank"
      type="text"
      value={rank}
      onChange={(e) => setRank(e.target.value)}
    />;

  const editableLocationElement =
    <div>
      <Input
        id="latitude"
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />

      <Input
        id="longitude"
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
    </div>;

  const submitButton =
    <Button
      variant="contained"
      color="primary"
      type="submit"
      id="edit-button"
      onClick={(e) => submitHandler(e)}
    >
      Edit hero
    </Button>;

  return(
    <div>
      { isEditing ? editableNameElement : nameElement }

      { isEditing ? editableRankElement : rankElement }

      { isEditing ? editableLocationElement : locationElement }

      { isEditing ? submitButton : "" }

      <ButtonGroup
        heroId={props.hero.id}
        accessToken={props.accessToken}
        toggleEditForm={props.toggleEditForm}
        dispatch={props.dispatch}
      />
    </div>
  );
}

export default Hero;
