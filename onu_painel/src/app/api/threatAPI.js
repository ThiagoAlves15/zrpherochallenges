import axios from './axios';
import { THREATS_URL } from './consts';

export async function fetchAllThreats(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(THREATS_URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function fetchUnresolvedThreats(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(UNRESOLVED_THREATS_URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function createNewThreat(payload) {
  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  };

  const data = {
    name: payload.name,
    tier: payload.tier,
    latitude: payload.latitude,
    longitude: payload.longitude
  }

  console.log(config);

  return axios.post(THREATS_URL, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function updateThreatById(payload) {
  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  };

  const data = {
    name: payload.name,
    tier: payload.tier,
    latitude: payload.latitude,
    longitude: payload.longitude
  }

  const updateUrl = `${THREATS_URL}/${payload.id}`

  return axios.patch(updateUrl, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function deleteThreatById(payload) {
  const config = {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  };

  const deleteUrl = `${THREATS_URL}/${payload.id}`

  return axios.delete(deleteUrl, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}