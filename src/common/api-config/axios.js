/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import axios from 'axios';
import { clearLocalStorage, getToken } from '../helpers/utils';

const pathname = window.location?.pathname.split('/');

const token = getToken();

const api = axios.create({
  baseURL:
    pathname[pathname.length - 2] === 'registration'
      ? `https://auth.${process.env.REACT_APP_DOMAIN}/v1`
      : `https://${window.location.hostname.replace('app.', '')}/v1`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  function (config) {
    // Modify the request config here if needed
    // console.log('Request made:', config);
    // setCustomDataToLS('lastRequestedAt', userDetails?.data);
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    // Modify the response data here if needed
    // console.log('Response received:', response);
    return response;
  },
  async function (error) {
    // alert(error?.message);
    // Handle response error

    // Signout the user if Unauthenticated
    if (error?.response?.status === 401) {
      await clearLocalStorage().then(() => {
        // window.location.reload();
      });
    }
    // console.log('Response error:', error);
    return Promise.reject(error);
  }
);

export default api;
