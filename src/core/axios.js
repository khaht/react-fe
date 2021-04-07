import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

let axiosInstance = null;

export const createAxiosInstance = (options) => {
  // eslint-disable-next-line prefer-object-spread
  const opts = Object.assign({ baseURL: '/', responseType: 'json', headers: {} }, options);
  if (!axiosInstance) {
    axiosInstance = axios.create(opts);
  }
  return axiosInstance;
};
