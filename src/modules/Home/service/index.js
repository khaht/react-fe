import Service from 'core/service';

export default class HomeService extends Service {
  getHome = () => {
    return this.post('/');
  };
}
