import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';

function Login({ navigation }) {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    setUserInput(userInput);
  };

  const onLogin = async () => {
    try {
      if (userInput.email == '' || userInput.password == '')
        throw { data: 'Please refer email and password', status: '404' };
      const res = await api.send('post', '/api/v1/auth/login', userInput, (auth = false));
      console.log('res:', res);
      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        setErrorMessage('');
        navigation.navigate('DrawerStack');
      } else {
        throw res;
      }
    } catch (e) {
      if (e.data) {
        const code = e.status;
        if (code === 401) setErrorMessage('Incorrect password');
        else if (code === 404) setErrorMessage('User not found');
        else setErrorMessage(e.data);
        setError(true);
        alert(errorMessage);
      } else {
        setErrorMessage('Internal error');
        setError(true);
        alert(errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      {errorMessage == undefined ? null : (
        <Text style={{ color: AppStyles.color.grey }}>{errorMessage}</Text>
      )}
      <View style={styles.InputContainer}>
        <TextInput
          accessibilityLabel="email"
          onChangeText={(text) => handleChange(text, 'email')}
          style={
            errorMessage == 'User not found' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholder="Email"
          autoComplete="email"
          value={userInput.name}
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          accessibilityLabel="password"
          onChangeText={(text) => handleChange(text, 'password')}
          style={
            errorMessage == 'Incorrect password' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
          placeholderTextColor={AppStyles.color.grey}
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => onLogin()}
      >
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button containerStyle={styles.facebookContainer} style={styles.facebookText}>
        Login with Facebook
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10
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
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default Login;
