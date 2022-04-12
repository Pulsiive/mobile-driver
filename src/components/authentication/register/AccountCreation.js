import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const AccountCreation = ({ navigation }) => {
  return (
    <View>
      <Text>Créer mon compte</Text>
      <TextInput placeholder="Email"></TextInput>
      <TextInput placeholder="Mot de passe"></TextInput>
      <Button
        title="Créer mon compte"
        accessibilityLabel="Cliquer ici pour se connecter"
        onPress={() => navigation.navigate('HomePage')}
        color="grey"
      />
    </View>
  );
};

export default AccountCreation;
