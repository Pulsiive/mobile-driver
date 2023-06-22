import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';
import {
  InputField,
  InputFieldMultiple,
  ButtonConditional,
  TextError,
  TextTitle
} from '../../components';

function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');

  const [valid, setValid] = useState(false);

  const [error, setError] = useState('');

  const onRegister = async () => {
    try {
      const userInput = {
        email: email,
        firstName: firstName,
        lastName: name,
        password: password,
        dateOfBirth: '2022-09-09T20:32:54.003Z'
      };
      const res = await api.send('POST', '/api/v1/auth/register', userInput, false);

      if (res.status === 200) {
        serviceAccessToken.set(res.data.accessToken);
        // setEmail('');
        // setName('');
        // setFirstName('');
        // setPassword('');
        // setValid(false);
        // setError('');
        navigation.navigate('SendEmailConfirmation', { email: email });
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

  const checkForEmailErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre e-mail';
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
    <ScrollView style={AppStyles.container}>
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
        subText="Veuillez entrer un e-mail valide"
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
        style={{ backgroundColor: AppStyles.color.darkgrey }}
        onPress={onRegister}
      />
    </ScrollView>
  );
}

export default SignUp;
