import AsyncStorage from '@react-native-async-storage/async-storage';

const storageName = 'access_token';

class AccessToken {
  accessToken = null;

  async get() {
    if (this.accessToken) return this.accessToken;

    if (typeof AsyncStorage === 'undefined') return null;
    const accessToken = await AsyncStorage.getItem(storageName);
    this.accessToken = accessToken;
    return accessToken;
  }

  set(accessToken) {
    this.accessToken = accessToken;
    AsyncStorage.setItem(storageName, accessToken);
  }

  remove() {
    this.accessToken = null;
    AsyncStorage.removeItem(storageName);
  }
}

const serviceAccessToken = new AccessToken();
export default serviceAccessToken;
