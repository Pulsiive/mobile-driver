import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import { ThemeProvider } from './src/AppStyles';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body); //TODO: show a flash message when a new reservation was received
    });

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

export default App;
