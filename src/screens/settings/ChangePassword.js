import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';

function ChangePassword({ navigation }) {
  const inputPassword = useRef(null);
  const inputNewPassword = useRef(null);
  const inputConfirmPassword = useRef(null);

  const [passwordInput, setPasswordInput] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const onRegister = async () => {
    try {
      console.log(passwordInput);
      errorMessage['password'] = '';
      errorMessage['newPassword'] = '';
      errorMessage['confirmPassword'] = '';

      if (passwordInput.password == '') errorMessage['password'] = 'Please enter your password';
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordInput.newPassword))
        errorMessage['newPassword'] =
          'Wrong password format (at least 8 characters, 1 number, 1 uppercase, 1 lowercase)';
      if (passwordInput.newPassword == '')
        errorMessage['newPassword'] = 'Please enter your new password';
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordInput.confirmPassword))
        errorMessage['confirmPassword'] =
          'Wrong password format (at least 8 characters, 1 number, 1 uppercase, 1 lowercase)';
      if (passwordInput.confirmPassword == '')
        errorMessage['confirmPassword'] = 'Please enter the same password';
      if (
        passwordInput.newPassword !== passwordInput.confirmPassword &&
        passwordInput.confirmPassword !== '' &&
        passwordInput.newPassword !== ''
      )
        errorMessage['confirmPassword'] = "Passwords don't match";

      setErrorMessage({ ...errorMessage });

      if (
        errorMessage.password !== '' ||
        errorMessage.newPassword !== '' ||
        errorMessage.confirmPassword !== ''
      )
        throw { data: errorMessage, status: '405' };

      const res = await api.send(
        'patch',
        '/api/v1/profile',
        {
          password: passwordInput.password,
          new_password: passwordInput.newPassword,
          new_password_confirmation: passwordInput.confirmPassword
        },
        true
      );

      if (res.status == 200) {
        inputPassword.current.clear();
        inputNewPassword.current.clear();
        inputConfirmPassword.current.clear();
        setPasswordInput({ password: '', newPassword: '', confirmPassword: '' });
        navigation.navigate('Settings');
      } else {
        throw res;
      }
    } catch (e) {
      if (e) {
        console.log('e: ', e);
        if (e.status === 422) setErrorMessage({ ...errorMessage, password: 'Incorrect password' });
      } else {
        setErrorMessage({ ...errorMessage, email: 'Internal server error' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Change your password</Text>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputPassword}
          accessibilityLabel="password"
          onChangeText={(text) => setPasswordInput({ ...passwordInput, password: text })}
          style={[
            styles.inputContainer,
            errorMessage.password !== '' ? styles.inputOnError : styles.input
          ]}
          placeholder="Current password"
          secureTextEntry={true}
          value={passwordInput.password}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.password === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.password}</Text>
        )}
      </View>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputNewPassword}
          accessibilityLabel="new password"
          onChangeText={(text) => setPasswordInput({ ...passwordInput, newPassword: text })}
          style={[
            styles.inputContainer,
            errorMessage.newPassword !== '' ? styles.inputOnError : styles.input
          ]}
          placeholder="New password"
          secureTextEntry={true}
          value={passwordInput.newPassword}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.newPassword === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.newPassword}</Text>
        )}
      </View>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputConfirmPassword}
          accessibilityLabel="confirm password"
          onChangeText={(text) => setPasswordInput({ ...passwordInput, confirmPassword: text })}
          style={[
            styles.inputContainer,
            errorMessage.confirmPassword !== '' ? styles.inputOnError : styles.input
          ]}
          placeholder="Confirm password"
          secureTextEntry={true}
          value={passwordInput.confirmPassword}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.confirmPassword === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.confirmPassword}</Text>
        )}
      </View>
      <Button
        containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
        style={styles.facebookText}
        onPress={() => onRegister()}
      >
        Update
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
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
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

export default ChangePassword;
