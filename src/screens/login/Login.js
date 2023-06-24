import React, { useEffect, useState } from 'react';
import { AppIcon, AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';
import { useFocusEffect } from '@react-navigation/native';
import {
  ButtonConditional,
  ButtonText,
  InputField,
  InputFieldMultiple,
  TextError,
  TextTitle
} from '../../components';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setValid(false);
      setLoading(false);
      setError('');
    }, [])
  );

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const accessToken = await serviceAccessToken.get();
      if (accessToken) {
        setEmail('');
        setPassword('');
        setValid(false);
        navigation.navigate('DrawerStack');
      }
    };

    redirectIfLoggedIn();
  }, []);

  useEffect(() => {
    if (checkForEmailErrors(email) || checkForPasswordErrors(password)) setValid(false);
    else setValid(true);
  }, [email, password]);

  const onLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const userInput = {
        email: email,
        password: password
      };
      const res = await api.send('post', '/api/v1/auth/login', userInput, false);

      setLoading(false);

      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        setEmail('');
        setPassword('');
        setValid(false);
        navigation.navigate('DrawerStack');
      } else {
        throw res;
      }
    } catch (e) {
      if (e) {
        if (e.status === 401) setError('Mot de passe incorrect');
        else if (e.status === 404) setError('Utilisateur introuvable');
      } else {
        setError('Error serveur');
      }
    }
  };

  const checkForEmailErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre e-mail';
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input))
      return "Le format n'est pas correct (ex: test@ext.com)";
    return false;
  };

  const checkForPasswordErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre mot de passe';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input)) return 'Format incorrecte';
    return false;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={AppIcon.images.logo} style={styles.logo} />
        <Image source={AppIcon.images.pulsive} style={styles.pulsive} />
      </View>
      <View style={styles.inputsContainer}>
        <TextError title={error} />
        <InputField
          label="E-mail"
          errorCheck={checkForEmailErrors}
          subText="Veuillez entrer votre adresse e-mail"
          setValue={setEmail}
          style={{ marginVertical: 0 }}
        />
        <InputField
          label="Mot de passe"
          errorCheck={checkForPasswordErrors}
          subText="Veuillez entrer votre mot de passe"
          setValue={setPassword}
          secure={true}
        />
      </View>
      <ButtonConditional
        title="Me connecter"
        isEnabled={true}
        onPress={onLogin}
        loading={loading}
      />
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Pas encore de compte ?</Text>
        <ButtonText title="M'inscrire" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: '8%',
    paddingTop: '26%',
    backgroundColor: AppStyles.color.lightmode
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    height: '36%',
    resizeMode: 'contain',
    marginBottom: 10
  },
  pulsive: {
    height: '20%',
    resizeMode: 'contain'
  },
  inputsContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    marginTop: 'auto'
  },
  accountContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  accountText: {
    color: AppStyles.color.text,
    marginRight: 5
  }
});

export default Login;
