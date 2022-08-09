import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes, updateHero } from './heroSlice';
import Hero from './Hero';
import HeroForm from './HeroForm';

function HeroBoard() {
  const heroes = useSelector((state) => state.heroes.heroes);
  const accessToken = useSelector((state) => state.session.accessToken);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(0);

  useEffect(() => {
    dispatch(fetchHeroes(accessToken))
  }, [dispatch]);

  function toggleEditForm(heroId) {
    if (isEditing === heroId) {
      setIsEditing(0);
    } else {
      setIsEditing(heroId);
    }
  }

  function submitEdit(formData) {
    dispatch(updateHero(formData));
    toggleEditForm();
  }

  return (
    <div>
      <h1>HeroBoard</h1>

      <div>
        <HeroForm />
      </div>

      <div>
        {
          heroes && heroes.length > 0 && heroes.map(hero => {
            return (<div key={hero.id}>
              <Hero
                dispatch={dispatch}
                accessToken={accessToken}
                hero={hero}
                toggleEditForm={() => toggleEditForm(hero.id)}
                isEditing={isEditing}
                submitEdit={submitEdit}
              />
            </div>);
          })
        }
      </div>
    </div>
  )
}

export default HeroBoard;
