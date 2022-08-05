import React from 'react';

function Heroes(props) {
  return <div>
    {props.heroes.map((hero) => {
      return (
        <div key={hero.id}>
          <p>{hero.name}</p>
          <p>{hero.rank}</p>
        </div>
      );
    })}
  </div>;
}

export default Heroes;