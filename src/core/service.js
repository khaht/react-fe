import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class Service {
  headers = {};
  axios;
  defaultOptions = { namespace: undefined };

  constructor(options) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    const { namespace = null } = this.defaultOptions;
    // Accept */*
    axios.defaults.headers.common.Accept = '*/*';
    const apiKey = process.env.REACT_APP_API_KEY || '';
    const endpoint = process.env.REACT_APP_API_URL || '';
    const baseURL = endpoint + (namespace ? `/${namespace}/` : '/');
    this.axios = axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        'x-api-key': apiKey,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  toQueryString = (params) => {
    const parts = [];
    for (const i in params) {
      if (params.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
      }
    }
    return parts.join('&');
  };

  async rest(
    action,
    params = {},
    options = {
      headers: {},
      method: 'post',
    },
  ) {
    const { headers } = options;
    try {
      const optHeaders = headers;
      // eslint-disable-next-line no-extra-boolean-cast
      const opts = {
        url: action,
        method: options.method,
        data: params,
        headers: {
          ...(this.headers || {}),
          ...optHeaders,
        },
      };
      const response = await this.axios.request(opts);
      return response.data;
    } catch (err) {
      throw err.response;
    }
  }

  postFormData(action, data) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return this.rest(action, data, {
      method: 'post',
      headers,
    });
  }

  get(action, params = {}, options = {}) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.rest(
      path,
      {},
      {
        method: 'get',
        headers,
      },
    );
  }

  post(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.rest(action, params, {
      method: 'post',
      headers,
    });
  }

  downloadFile = (action) => {
    return axios({
      url: action,
      method: 'GET',
      responseType: 'blob',
    });
  };
}
