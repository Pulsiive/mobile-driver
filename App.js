import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import { ThemeProvider } from './src/AppStyles';
import messaging from '@react-native-firebase/messaging';
import { showMessage } from 'react-native-flash-message';

function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      showMessage({
        message: remoteMessage.notification.title,
        description: remoteMessage.notification.body,
        type: 'info',
        duration: 5000
      });
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
