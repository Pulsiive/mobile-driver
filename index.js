/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from "./App";
import { name as appName } from "./app.json";
import messaging from '@react-native-firebase/messaging';

if (Platform.OS === 'ios') {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  requestUserPermission().then();
}
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
