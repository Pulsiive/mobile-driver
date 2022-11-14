import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';

function SignUp({ navigation }) {
  const inputEmail = useRef(null);
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputPassword = useRef(null);

  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '2022-09-09T20:32:54.003Z'
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (text, field) => {
    userInput[field] = text;
    setUserInput(userInput);
  };

  const onRegister = async () => {
    try {
      errorMessage['email'] = '';
      errorMessage['password'] = '';
      errorMessage['lastName'] = '';
      errorMessage['firstName'] = '';

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(userInput.email))
        errorMessage['email'] = 'Wrong email format (e.g: test@ext.com)';
      if (userInput.email == '') errorMessage['email'] = 'Please enter your email';
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(userInput.password))
        errorMessage['password'] =
          'Wrong password format (at least 8 characters, 1 number, 1 uppercase, 1 lowercase)';
      if (userInput.password == '') errorMessage['password'] = 'Please enter your password';
      if (/[^a-zA-Z]+/g.test(userInput.lastName))
        errorMessage['lastName'] = 'Wrong format (only letters)';
      if (userInput.lastName == '') errorMessage['lastName'] = 'Please enter your last name';
      if (/[^a-zA-Z]+/g.test(userInput.firstName))
        errorMessage['firstName'] = 'Wrong format (only letters)';
      if (userInput.firstName == '') errorMessage['firstName'] = 'Please enter your first name';

      setErrorMessage({ ...errorMessage });

      if (
        errorMessage.email !== '' ||
        errorMessage.password !== '' ||
        errorMessage.firstName !== '' ||
        errorMessage.lastName !== ''
      )
        throw { data: errorMessage, status: '405' };

      const res = await api.send('POST', '/api/v1/auth/register', userInput, false);

      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        inputEmail.current.clear();
        inputFirstName.current.clear();
        inputLastName.current.clear();
        inputPassword.current.clear();
        setUserInput({ email: '', firstName: '', lastName: '', password: '' });
        navigation.navigate('DrawerStack');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
      if (e) {
        if (e.status === 409) setErrorMessage({ ...errorMessage, email: 'User already exists' });
        else if (e.status === 422)
          setErrorMessage({ ...errorMessage, email: 'User registration failed' });
      } else {
        setErrorMessage({ ...errorMessage, email: 'Internal server error' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputEmail}
          placeholder="Email"
          onChangeText={(text) => handleChange(text, 'email')}
          style={[
            styles.inputContainer,
            errorMessage.email !== '' ? styles.inputOnError : styles.input
          ]}
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
          ref={inputFirstName}
          placeholder="First name"
          onChangeText={(text) => handleChange(text, 'firstName')}
          style={[
            styles.inputContainer,
            errorMessage.firstName !== '' ? styles.inputOnError : styles.input
          ]}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.firstName === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.firstName}</Text>
        )}
      </View>

      <View style={styles.viewContainer}>
        <TextInput
          ref={inputLastName}
          placeholder="Last name"
          onChangeText={(text) => handleChange(text, 'lastName')}
          style={[
            styles.inputContainer,
            errorMessage.lastName !== '' ? styles.inputOnError : styles.input
          ]}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.lastName === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.lastName}</Text>
        )}
      </View>

      <View style={styles.viewContainer}>
        <TextInput
          ref={inputPassword}
          placeholder="Password"
          onChangeText={(text) => handleChange(text, 'password')}
          style={[
            styles.inputContainer,
            errorMessage.password !== '' ? styles.inputOnError : styles.input
          ]}
          placeholderTextColor={AppStyles.color.grey}
          secureTextEntry={true}
        />
        {errorMessage.password === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.password}</Text>
        )}
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
