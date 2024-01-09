import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppStyles, useTheme } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';
import {
  InputField,
  InputFieldMultiple,
  ButtonConditional,
  TextError,
  TextTitle,
  ModalSwipeUp,
  TextSubTitle
} from '../../components';
import { useFocusEffect } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { useUserSet } from '../../contexts/UserContext';

function SignUp({ navigation }) {
  const { AppColor } = useTheme();
  const setUser = useUserSet();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setName('');
      setFirstName('');
      setPassword('');
      setValid(false);
      setLoading(false);
      setError('');
    }, [])
  );

  useEffect(() => {
    if (
      checkForNameErrors(name) ||
      checkForFirstNameErrors(firstName) ||
      checkForEmailErrors(email) ||
      checkForPasswordErrors(password)
    )
      setValid(false);
    else setValid(true);
  }, [email, name, firstName, password]);

  const onRegister = async () => {
    setError('');
    setLoading(true);
    try {
      const fcmToken = await messaging().getToken();
      const userInput = {
        email: email,
        firstName: firstName,
        lastName: name,
        password: password,
        dateOfBirth: '2022-09-09T20:32:54.003Z',
        fcmToken
      };
      const res = await api.send('POST', '/api/v1/auth/register', userInput, false);

      setLoading(false);

      if (res.status === 200) {
        serviceAccessToken.set(res.data.accessToken);
        await setUserProfile();
        setModalVisible(true);
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
      if (e) {
        if (e.status === 409) setError("L'utilisateur est déjà inscrit");
        else if (e.status === 422) setError("Echec d'inscription");
      } else {
        setError('Error serveur');
      }
    }
  };

  const setUserProfile = async () => {
    const userObject = await api.send('get', '/api/v1/profile');
    if (userObject.status === 200) {
      setUser(userObject.data);
    } else throw "Can't fetch user profile";
    //TODO: handle entire app error message if user object not set
  };

  const acceptGCU = () => {
    navigation.navigate('SendEmailConfirmation', { email: email });
    setModalVisible(false);
  };

  const checkForEmailErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre adresse e-mail';
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input))
      return "Le format n'est pas correct (ex: test@ext.com)";
    return false;
  };

  const checkForNameErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre nom';
    if (/[^a-zA-Z]+/g.test(input)) return 'Votre nom doit comprendre uniquement des lettres';
    return false;
  };

  const checkForFirstNameErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre prénom';
    if (/[^a-zA-Z]+/g.test(input)) return 'Votre prénom doit comprendre uniquement des lettres';
    return false;
  };

  const checkForPasswordErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre mot de passe';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input)) return 'Format incorrecte';
    return false;
  };

  return (
    <ScrollView style={[AppStyles.container, { backgroundColor: AppColor.background }]}>
      <View style={{ paddingTop: 50 }}>
        <ModalSwipeUp
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Termes et conditions"
        >
          <TextSubTitle
            title="Conditions générales d'utilisation de Pulsive"
            style={{ margin: 20, marginLeft: 0, marginTop: 10 }}
          />
          <Text style={{ color: 'black', marginBottom: 30 }}>
            En acceptant les conditions générales d'utilisation de Pulsive, je m'engage à respecter
            les règles de l'application et à respecter les autres utilisateurs
          </Text>
          <ButtonConditional
            title="Accepter"
            isEnabled={true}
            onPress={() => {
              acceptGCU();
            }}
            style={{ marginBottom: 30 }}
          />
        </ModalSwipeUp>
        <TextTitle title="Inscription à Pulsive" />
        <TextError title={error} />
        <InputFieldMultiple
          labels={['Nom', 'Prénom']}
          errorChecks={[checkForNameErrors, checkForFirstNameErrors]}
          setValues={[setName, setFirstName]}
          subText="Assurez vous que les informations soient similaires à celles figurantes sur votre carte d'identité"
        />
        <InputField
          label="E-mail"
          errorCheck={checkForEmailErrors}
          subText="Veuillez entrer une adresse e-mail valide"
          setValue={setEmail}
        />
        <InputField
          label="Mot de passe"
          errorCheck={checkForPasswordErrors}
          subText="Votre mot de passe doit contenir au minimun 8 caractères, 1 majuscule/miniscule et 1 chiffre"
          setValue={setPassword}
          secure={true}
        />
        <ButtonConditional
          title="M'inscrire"
          isEnabled={valid}
          style={{ backgroundColor: AppColor.disabled }}
          onPress={onRegister}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}

export default SignUp;
