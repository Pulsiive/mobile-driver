import serviceAccessToken from './AccessToken';
import config from './config';
import fetch from 'node-fetch';

class API {
  url = config.API_URL;

  async send(method, route, data = null, auth = true, multiform = false) {
    const headers = !multiform
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      : {
          Accept: 'application/json'
        };
    if (auth) {
      let accessToken = await serviceAccessToken.get();
      accessToken = accessToken ? accessToken : '';
      if (accessToken) headers.Authorization = 'Bearer ' + accessToken;
    }
    if (method !== 'GET' && data && !multiform) {
      data = JSON.stringify(data);
    } else if (multiform) {
      data = this.createFormData(data);
    } else {
      data = null;
    }
    try {
      let response = await fetch(this.url + route, {
        headers: headers,
        method: method,
        body: data
      });
      if (response.status === 401) {
        AccessToken.remove();
        return {
          data: 'wrong password',
          status: 401
        };
      }
      return {
        data: await response.json(),
        status: response.status
      };
    } catch (e) {
      return {
        data: null,
        status: -1
      };
    }
  }
}

let api = new API();
export default api;
