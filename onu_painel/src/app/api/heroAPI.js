import axios from './axios';
import { HEROES_URL } from './consts';

export async function fetchAllHeroes(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(HEROES_URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function createNewHero(payload) {
  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  };

  const data = {
    name: payload.name,
    rank: payload.rank,
    latitude: payload.latitude,
    longitude: payload.longitude
  }

  return axios.post(HEROES_URL, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
