import axios from 'axios';
import { REACT_APP_BACKEND_URL } from './consts';

const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    withCreadentials: true,
  },
});

export default instance;