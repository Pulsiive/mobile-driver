import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';

function ChangeEmail({ navigation }) {
  const inputNewEmail = useRef(null);

  const [emailInput, setEmailInput] = useState({
    newEmail: ''
  });
  const [errorMessage, setErrorMessage] = useState({
    newEmail: ''
  });

  const onRegister = async () => {
    try {
      console.log(emailInput);
      errorMessage['newEmail'] = '';

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(emailInput.newEmail))
        errorMessage['newEmail'] = 'Wrong email format (e.g: test@ext.com)';
      if (emailInput.newEmail == '') errorMessage['newEmail'] = 'Please enter your new password';

      setErrorMessage({ ...errorMessage });

      if (errorMessage.newEmail !== '') throw { data: errorMessage, status: '405' };

      const res = await api.send(
        'patch',
        '/api/v1/profile',
        {
          email: emailInput.newEmail
        },
        true
      );

      if (res.status == 200) {
        inputNewEmail.current.clear();
        setEmailInput({ newEmail: '' });
        navigation.navigate('Settings');
      } else {
        throw res;
      }
    } catch (e) {
      if (e) {
        console.log('e: ', e);
        if (e.status === 422) setErrorMessage({ ...errorMessage, newEmail: 'Email already taken' });
      } else {
        setErrorMessage({ ...errorMessage, newEmail: 'Internal server error' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Change your email</Text>
      <View style={styles.viewContainer}>
        <TextInput
          ref={inputNewEmail}
          accessibilityLabel="newEmail"
          onChangeText={(text) => setEmailInput({ ...emailInput, newEmail: text })}
          style={[
            styles.inputContainer,
            errorMessage.newEmail !== '' ? styles.inputOnError : styles.input
          ]}
          placeholder="New email"
          value={emailInput.newEmail}
          placeholderTextColor={AppStyles.color.grey}
        />
        {errorMessage.newEmail === '' ? (
          <Text></Text>
        ) : (
          <Text style={{ color: 'red' }}>{errorMessage.newEmail}</Text>
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

export default ChangeEmail;
