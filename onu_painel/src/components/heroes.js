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

// import './App.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Heroes from './components/heroes';
// import AppBar from './components/AppBar';

// const API_URL = 'http://localhost:3000/api/v1/heroes';

// function getHeroesData() {
//   return axios.get(API_URL).then((response) => response.data);
// }

// function App() {
//   const [heroes, setHeroes] = useState([]);

//   useEffect(() => {
//     let mounted = true;

//     getHeroesData().then((items) => {
//       if (mounted) {
//         setHeroes(items);
//       }
//     });

//     return () => (mounted = false);
//   }, []);

//   return (
//     <div className="App">
//       <header className='app-header'>
//         <AppBar />
//       </header>

//       <main>

//       </main>

//       <h1>Heroes</h1>

//       <Heroes heroes={heroes} />
//     </div>
//   );
// }

// export default App;
