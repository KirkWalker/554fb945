import axios from 'axios';

let BASE_URL = 'https://aircall-api.onrender.com';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json' },
  withCredentials: false,
});
