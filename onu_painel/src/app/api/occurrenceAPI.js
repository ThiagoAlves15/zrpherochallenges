import axios from './axios';
import { OCCURRENCES_URL } from './consts';

export async function fetchAllOccurrences(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(OCCURRENCES_URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function createNewOccurrence(payload) {
  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  };

  const data = {
    hero: payload.hero,
    threat: payload.threat
  }

  console.log(config);

  return axios.post(OCCURRENCES_URL, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function updateOccurrenceById(payload) {
  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  };

  const data = {
    hero: payload.hero,
    threat: payload.threat
  }

  const updateUrl = `${OCCURRENCES_URL}/${payload.id}`

  return axios.patch(updateUrl, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
