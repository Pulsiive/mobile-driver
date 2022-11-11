import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';

function SignUp({ navigation }) {
  const [userInput, setUserInput] = useState({
    email: 'default',
    password: 'default',
    firstName: 'default',
    lastName: 'default',
    dateOfBirth: '2022-09-09T20:32:54.003Z'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    setUserInput(userInput);
  };

  const onRegister = async () => {
    try {
      if (userInput.email == 'default' || userInput.password == 'default')
        throw { data: 'Please fill email and password', status: '405' };
      const res = await api.send('POST', '/api/v1/auth/register', userInput, false);
      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        setErrorMessage('');
        navigation.navigate('DrawerStack');
      } else {
        throw res;
      }
      navigation.navigate('DrawerStack');
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) setErrorMessage('User is already registered');
        else setErrorMessage('Internal error');
        setError(true);
      } else {
        setErrorMessage('Internal error');
        setError(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
      {errorMessage == undefined ? null : (
        <Text style={{ color: AppStyles.color.grey }}>{errorMessage}</Text>
      )}
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => handleChange(text, 'email')}
          style={
            errorMessage == 'User already registered' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="First name"
          onChangeText={(text) => handleChange(text, 'firstName')}
          style={
            errorMessage == 'User already registered' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Last name"
          onChangeText={(text) => handleChange(text, 'lastName')}
          style={
            errorMessage == 'User already registered' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Password"
          onChangeText={(text) => handleChange(text, 'password')}
          style={
            errorMessage == 'User already registered' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholderTextColor={AppStyles.color.grey}
          secureTextEntry={true}
        />
      </View>
      <Button
        containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
        style={styles.facebookText}
        onPress={() => onRegister()}
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: 'red'
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  input: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  inputOnError: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: AppStyles.borderRadius.main
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default SignUp;
