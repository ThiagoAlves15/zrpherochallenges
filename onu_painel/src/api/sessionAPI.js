import axios from './axios';

const LOGIN_URL = '/oauth/token';
const LOGOUT_URL = '/oauth/revoke';
const SIGNUP_URL = '/users';
const CURRENT_USER_URL = '/users/me';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

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
