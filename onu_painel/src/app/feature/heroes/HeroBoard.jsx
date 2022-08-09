import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from './heroSlice';
import Hero from './Hero';

function HeroBoard() {
  const heroes = useSelector((state) => state.heroes.heroes);
  const accessToken = useSelector((state) => state.session.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes(accessToken))
  }, [dispatch]);


  return (
    <div>
      <h1>HeroBoard</h1>

      <div>
        {
          heroes && heroes.length > 0 && heroes.map(hero => {
            return (<div key={hero.id}>
              <Hero
                dispatch={dispatch}
                hero={hero}
              />
            </div>);
          })
        }
      </div>
    </div>
  )
}

export default HeroBoard;
