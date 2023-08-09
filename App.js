import React from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import { ThemeProvider } from './src/AppStyles';

function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

export default App;
