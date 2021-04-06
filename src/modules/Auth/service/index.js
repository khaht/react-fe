import axios from 'axios';
import Service from 'core/service';
import CookiesModel from 'core/cookies';

axios.interceptors.request.use((config) => {
  const token = new CookiesModel().accessToken();
  config.headers.Authorization = token;
  return config;
});

export default class AuthService extends Service {
  getProfile = () => {
    return this.get('/');
  };
}
