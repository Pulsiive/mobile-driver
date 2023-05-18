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
          'Content-Type': 'multipart/form-data'
        };
    if (auth) {
      let accessToken = await serviceAccessToken.get();
      accessToken = accessToken ? accessToken : '';
      if (accessToken) headers.Authorization = 'Bearer ' + accessToken;
    }
    if (method !== 'GET' && data && !multiform) {
      data = JSON.stringify(data);
    }
    try {
      let response = await fetch(this.url + route, {
        headers: headers,
        method: method,
        body: data
      });
      console.log(this.url + route);
      if (response.status === 401) {
        // accessToken.remove();
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
      console.log(e);
      return {
        data: null,
        status: -1
      };
    }
  }
}

let api = new API();
export default api;
