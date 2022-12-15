import serviceAccessToken from './accessToken';
import fetch from 'node-fetch';

class API {
  url = 'http://192.168.1.112:3000/api/v1';

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
      // let accessToken = await serviceAccessToken.get();
      let accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiZWJiMzI2Y2MtOTExYy00Njc0LWI4YmYtYTBkYzIwZDc4M2QyIiwiZmlyc3ROYW1lIjoiaWxpYXMiLCJsYXN0TmFtZSI6ImlsaWFzIiwiZW1haWwiOiJpbGlhc0BpbGlhcy5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRSc2VzY0x0ajBQOTlzdS5MRG5tM2F1Vm0wdWt2a1Nkd1JweXF0R0p3ekhaMTlKeEtzM2pSeSIsImRhdGVPZkJpcnRoIjoiMjAyMi0wMy0wMlQxODoxMToyOS4wMDNaIiwiZW1haWxWZXJpZmllZEF0IjpudWxsLCJiYWxhbmNlIjowfSwiaWF0IjoxNjY4NTAyNDI2fQ.MZ7r57OiNTHsRGlL0XlGmEJiiBQ0dm-hpIlTveqOKT4';
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
