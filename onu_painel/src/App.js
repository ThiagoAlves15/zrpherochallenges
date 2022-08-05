import './App.css';
import axios from 'axios';
import Heroes from './components/heroes';
import { useEffect, useState } from 'react';

const API_URL = "http://localhost:3000/api/v1/heroes";

function getHeroesData() {
  return axios.get(API_URL).then((response) => response.data)
}

function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    let mounted = true;

    getHeroesData().then((items) => {
      if (mounted) {
        setHeroes(items);
      }
    });

    return () => (mounted = false);
  }, []);

  return (
    <div className="App">
      <h1>Heroes</h1>

      <Heroes heroes={heroes} />
    </div>
  );
}

export default App;
