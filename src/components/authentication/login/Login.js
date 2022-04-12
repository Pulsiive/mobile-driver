import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Se connecter</Text>
      <TextInput placeholder="Email"></TextInput>
      <TextInput placeholder="Mot de passe"></TextInput>
      <Button
        title="Se connecter"
        accessibilityLabel="Cliquer ici pour se connecter"
        onPress={() => navigation.navigate('HomePage')}
        color="grey"
      />
      <Button
        title="Créer un compte"
        accessibilityLabel="Cliquer ici pour créer un compte"
        onPress={() => navigation.navigate('Register')}
        color="grey"
      />
    </View>
  );
};

export default Login;
