import { useEffect, useState } from 'react';
import HeroForm from './HeroForm';
import ButtonGroup from '../../components/ButtonGroup';

function Hero(props) {
  const [isEditing, setIsEditing] = useState(props.isEditing === props.hero.id);

  useEffect(() => {
    setIsEditing(props.isEditing === props.hero.id);
  }, [props.isEditing, props.hero.id]);

  return(
    <div>
      {
        isEditing ?
          <HeroForm
            type="Hero"
            hero={props.hero}
            dispatch={props.dispatch}
            action={props.submitEdit}
            accessToken={props.accessToken}
          /> :
          <div>
            <p>Name: {props.hero.name}</p>
            <p>Rank: {props.hero.rank}</p>
            <p>Location: {props.hero.latitude} | {props.hero.longitude}</p>
          </div>
      }

      <ButtonGroup
        id={props.hero.id}
        name={props.hero.name}
        type="hero"
        accessToken={props.accessToken}
        toggleEditForm={props.toggleEditForm}
        delete={props.submitDelete}
      />
    </div>
  );
}

export default Hero;
