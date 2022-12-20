import serviceAccessToken from './accessToken';
import fetch from 'node-fetch';

class API {
  url = 'http://172.30.1.24:3000/api/v1';

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
    // } else if (!multiform) {
    //   data = null;
    // }

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
      console.log(e);
      return {
        data: null,
        status: -1
      };
    }
  }

  //   createFormData(data) {
  //     const formData = new FormData();

  //     for (let key in data) {
  //       const value = data[key];

  //       if (Array.isArray(value)) {

  //         for (let i = 0; i < value.length; i++) {
  //           formData.append(${key}[${i}], value[i]);
  //         }

  //       } else if (value !== undefined && value !== null) {
  //         formData.append(key, value);
  //       }

  //     }

  //     return formData;
  //   }
}

let api = new API();
export default api;
