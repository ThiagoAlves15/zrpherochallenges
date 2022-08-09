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
