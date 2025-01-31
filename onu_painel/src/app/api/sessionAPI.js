import axios from './axios';
import {
  LOGIN_URL,
  LOGOUT_URL,
  SIGNUP_URL,
  UPDATE_PROFILE_URL,
  CURRENT_USER_URL,
  CLIENT_ID,
  CLIENT_SECRET
} from './consts.js'

export async function createUserWithEmailAndPassword(email, password) {
  const data = {
    email: email,
    password: password,
    client_id: CLIENT_ID,
  };

  return axios.post(SIGNUP_URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function loginWithEmailAndPassword(email, password) {
  const data = {
    grant_type: 'password',
    email: email,
    password: password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios.post(LOGIN_URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function updateUserProfile(email, password, currentPassword, accessToken) {
  const data = {
    current_password: currentPassword,
    email: email,
    password: password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };


  return axios.patch(UPDATE_PROFILE_URL, data, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function logoutUserWithToken(token) {
  const data = {
    token: token,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios.post(LOGOUT_URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function requestAccessTokenWithRefreshToken(refreshToken) {
  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios.post(LOGIN_URL, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}

export async function getCurrentUser(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(CURRENT_USER_URL, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
}
