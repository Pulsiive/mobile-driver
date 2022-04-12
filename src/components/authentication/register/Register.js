import React from 'react';
import { View, Text, Button } from 'react-native';

const Register = ({ navigation }) => {
  return (
    <View>
      <Text>S'identifier</Text>
      <Button
        title="J'ai déjà un compte"
        accessibilityLabel="Cliquer ici pour se connecter"
        onPress={() => navigation.navigate('Login')}
        color="grey"
      />
      <Button
        title="Je n'ai pas encore de compte"
        accessibilityLabel="Cliquer ici pour créer un compte"
        onPress={() => navigation.navigate('AccountCreation')}
        color="grey"
      />
    </View>
  );
};

export default Register;
