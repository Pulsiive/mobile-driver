import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';

function Login({ navigation }) {
  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const accessToken = await serviceAccessToken.get();
      if (accessToken) {
        inputEmail.current.clear();
        inputPassword.current.clear();
        setUserInput({ email: '', password: '' });
        navigation.navigate('DrawerStack');
      }
    };

    redirectIfLoggedIn();
  }, []);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: ''
  });

  const handleChange = (text, field) => {
    userInput[field] = text;
    setUserInput(userInput);
  };

  const onLogin = async () => {
    try {
      errorMessage['email'] = '';
      errorMessage['password'] = '';

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(userInput.email))
        errorMessage['email'] = 'Wrong email format (e.g: test@ext.com)';
      if (userInput.email == '') errorMessage['email'] = 'Please enter your email';
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(userInput.password))
        errorMessage['password'] =
          'Wrong password format (at least 8 characters, 1 number, 1 uppercase, 1 lowercase)';
      if (userInput.password == '') errorMessage['password'] = 'Please enter your password';

      setErrorMessage({ ...errorMessage });

      if (errorMessage.email !== '' || errorMessage.password !== '')
        throw { data: errorMessage, status: '405' };

      const res = await api.send('post', '/api/v1/auth/login', userInput, false);

      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        inputEmail.current.clear();
        inputPassword.current.clear();
        setUserInput({ email: '', password: '' });
        navigation.navigate('DrawerStack');
      } else {
        throw res;
      }
    } catch (e) {
      if (e) {
        if (e.status === 401) setErrorMessage({ ...errorMessage, password: 'Incorrect password' });
        else if (e.status === 404) setErrorMessage({ ...errorMessage, email: 'User not found' });
      } else {
        setErrorMessage({ ...errorMessage, email: 'Internal server error' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputEmail}
          accessibilityLabel="email"
          onChangeText={(text) => handleChange(text, 'email')}
          style={[
            styles.inputContainer,
            errorMessage.email !== '' ? styles.inputOnError : styles.input
          ]}
          placeholder="Email"
          autoComplete="email"
          value={userInput.name}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.email === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.email}</Text>
        )}
      </View>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputPassword}
          accessibilityLabel="password"
          onChangeText={(text) => handleChange(text, 'password')}
          style={[
            styles.inputContainer,
            errorMessage.password !== '' ? styles.inputOnError : styles.input
          ]}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.password === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.password}</Text>
        )}
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
    width: AppStyles.buttonWidth,
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
  viewContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30
  },
  inputContainer: {
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
