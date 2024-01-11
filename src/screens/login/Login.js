import React, { useEffect, useState } from 'react';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';
import { useFocusEffect } from '@react-navigation/native';
import { ButtonConditional, ButtonText, InputField, TextError } from '../../components';
import { ScrollView, StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useUserSet } from '../../contexts/UserContext';

function Login({ navigation }) {
  const setUser = useUserSet();
  const { AppColor } = useTheme();

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
        setUserProfile()
          .then(() => {
            setEmail('');
            setPassword('');
            setValid(false);
            navigation.navigate('TabNavigator');
          })
          .catch((e) => console.log(e));
      }
    };

    redirectIfLoggedIn();
  }, []);

  useEffect(() => {
    if (checkForEmailErrors(email) || checkForPasswordErrors(password)) setValid(false);
    else setValid(true);
  }, [email, password]);

  const setUserProfile = async () => {
    const userObject = await api.send('get', '/api/v1/profile');
    if (userObject.status === 200) {
      setUser(userObject.data);
    } else throw "Can't fetch user profile";
    //TODO: handle entire app error message if user object not set
  };

  const LoadingScreen = () => {
    return (
      <View style={styles.loading}>
        <Animatable.Image
          animation="bounceInLeft"
          iterationCount="infinite"
          source={AppIcon.images.loadingImage}
          style={{ width: '40%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const onLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const userInput = {
        email: email,
        password: password
      };
      const res = await api.send('post', '/api/v1/auth/login', userInput, false);

      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        setUserProfile()
          .then(() => {
            setEmail('');
            setPassword('');
            setValid(false);

            setTimeout(() => {
              navigation.navigate('TabNavigator');
            }, 3000);
          })
          .catch((e) => console.log(e));
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
      setLoading(false);
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

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingBottom: '8%',
      paddingTop: '26%',
      backgroundColor: AppColor.background
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoContainer: {
      alignItems: 'center'
    },
    logo: {
      height: 120,
      resizeMode: 'contain',
      marginBottom: 10
    },
    pulsive: {
      height: 80,
      resizeMode: 'contain'
    },
    inputsContainer: {
      alignSelf: 'stretch',
      justifyContent: 'flex-end',
      marginTop: 20
    },
    accountContainer: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
    accountText: {
      color: AppColor.text,
      marginRight: 5
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? ( // Render the LoadingScreen component when loading is true
        <LoadingScreen />
      ) : (
        <View>
          <View style={styles.logoContainer}>
            <Image source={AppIcon.images.logo2} style={styles.logo} />
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
        </View>
      )}
    </ScrollView>
  );
}

export default Login;
