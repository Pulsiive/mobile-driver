import React from 'react';
import { View, Text, Button } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Text>Page d'accueil</Text>
      <Button
        title="Se deconnecter"
        accessibilityLabel="Cliquer ici pour se deconnecter"
        onPress={() => navigation.navigate('Login')}
        color="grey"
      />
    </View>
  );
};

export default HomePage;
