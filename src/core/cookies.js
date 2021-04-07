import Cookies from 'js-cookie';

const KEY_APP_TOKEN = 'APP_TOKEN';
const KEY_APP_TOKEN_EXP = 'APP_TOKEN_EXPIRATION';
const KEY_APP_TYPE = 'KEY_APP_TYPE';

class CookiesModel {
  clearCookies = () => {
    Cookies.remove(KEY_APP_TOKEN);
    Cookies.remove(KEY_APP_TOKEN_EXP);
    Cookies.remove(KEY_APP_TYPE);
  };

  storeAccessToken(value, expiration = 86400) {
    this.setKey(KEY_APP_TOKEN, value, expiration);
  }

  clearToken() {
    Cookies.remove(KEY_APP_TOKEN);
  }

  accessToken() {
    return this.getKey(KEY_APP_TOKEN);
  }

  storeAccessTokenExpiration(value, expiration = 86400) {
    this.setKey(KEY_APP_TOKEN_EXP, value, expiration);
  }

  accessTokenExpiration() {
    return this.getKey(KEY_APP_TOKEN_EXP);
  }

  setKey = (key, value, maxAge = 86400) => {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + maxAge);
    if (process.env.NODE_ENV === 'development') {
      Cookies.set(key, value, { path: '/', expires });
    } else {
      Cookies.set(key, value, {
        path: '/',
        expires,
        secure: true,
        sameSite: 'strict',
      });
    }
  };

  getKey = (key) => Cookies.get(key);
}

export default CookiesModel;
