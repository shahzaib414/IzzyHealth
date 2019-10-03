import { api } from './../config/';
import axios from 'axios';

const Http = axios.create({
  baseURL: api,
  //  baseURL: 'http://localhost:3000/' 
});

Http.interceptors.request.use((config) => {
  if (window.localStorage.token) {
    config.headers.Authorization = `Bearer ${window.localStorage.token}`; // eslint-disable-line no-param-reassign
  }
  return config;
});
// }, err => Promise.reject(err)); // Do something with request error

// Add a response interceptor
Http.interceptors.response.use((res) => {
  if (res.data.message) { document.dispatchEvent(new CustomEvent('httpSuccess', { detail: res.data.message })); }
  return res;
}, (err) => {
  if (err.response && err.response.data.error) {
    if (err.response.data.error.substring(0, 6) === 'TOKEN_') {
      document.dispatchEvent(new CustomEvent('tokenError'));
    } else {
      document.dispatchEvent(new CustomEvent('httpError', { detail: err.response.data.error }));
    }
  } else if (!err.response || !err.response.data.validation) {
    document.dispatchEvent(new CustomEvent('httpError', { detail: err.message }));
  }

  return Promise.reject(err);
});

export default Http;
