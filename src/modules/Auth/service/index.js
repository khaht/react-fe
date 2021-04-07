import Service from 'core/service';
import CookiesModel from 'core/cookies';

export default class AuthService extends Service {
  whiteList = ['login', 'register', 'forgot-password'];

  constructor() {
    super();
    this.axios.interceptors.request.use((request) => {
      const { url } = request;
      if (this.whiteList.includes(url)) {
        return request;
      }
      const token = new CookiesModel().accessToken();
      request.headers['Authorization'] = `Bearer ${token}`;
      return request;
    });
  }
  getCurrentUser = () => {
    return this.get('/me');
  };

  login = (user) => {
    return this.post('login', user);
  };
}
