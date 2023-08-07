import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import {
  ButtonCommon,
  ButtonConditional,
  ButtonTouchable,
  InputField,
  InputFieldMultiple,
  ModalSwipeUp,
  TextError,
  TextTitle
} from '../../components';
import api from '../../db/Api';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native';

function Settings({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: null,
    email: null
  });

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setValidEmail(false);
      setValidPassword(false);
      setErrorEmail('');
      setErrorPassword('');
      setLoading(false);
      setProfile({
        firstName: null,
        lastName: null,
        email: null
      });
      try {
        api.send('GET', '/api/v1/profile', null).then((data) =>
          setProfile({
            firstName: data.data.firstName,
            email: data.data.email
          })
        );
      } catch (e) {
        console.log(e);
      }
    }, [])
  );

  useEffect(() => {
    try {
      api.send('GET', '/api/v1/profile', null).then((data) =>
        setProfile({
          firstName: data.data.firstName,
          email: data.data.email
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (checkForEmailErrors(email)) setValidEmail(false);
    else setValidEmail(true);
  }, [email]);

  useEffect(() => {
    if (
      checkForPasswordErrors(password) ||
      checkForPasswordErrors(newPassword) ||
      checkForPasswordErrors(confirmPassword)
    )
      setValidPassword(false);
    else setValidPassword(true);
  }, [password, newPassword, confirmPassword]);

  const onChangeEmail = async () => {
    setLoading(true);
    setErrorEmail('');
    try {
      if (profile.email == email) {
        setErrorEmail('Vous utilisez déjà cette adresse E-mail');
        setLoading(false);
        return;
      }
      const res = await api.send(
        'patch',
        '/api/v1/profile',
        {
          email: email
        },
        true
      );

      setLoading(false);

      if (res.status == 200) {
        setShowEmailInput(false);
        showMessage({
          message: `Votre adresse E-mail a été mise a jour`,
          type: 'success',
          backgroundColor: AppStyles.color.pulsive
        });
        setProfile({ email: email });
      } else {
        throw res;
      }
    } catch (e) {
      if (e) {
        if (e.status === 422) setErrorEmail('Cette adresse E-mail est déjà utilisée');
      } else {
        setErrorEmail('Erreur serveur');
      }
    }
  };

  const onChangePassword = async () => {
    setLoading(true);
    try {
      if (newPassword != confirmPassword) {
        setErrorPassword('Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }

      const res = await api.send(
        'patch',
        '/api/v1/profile',
        {
          password: password,
          new_password: newPassword,
          new_password_confirmation: confirmPassword
        },
        true
      );

      setLoading(false);

      if (res.status == 200) {
        setShowPasswordInput(false);
        showMessage({
          message: `Votre mot de passe a été mise a jour`,
          type: 'success',
          backgroundColor: AppStyles.color.pulsive
        });
      } else {
        throw res;
      }
    } catch (e) {
      if (e) {
        if (e.status === 422) setErrorPassword('Mot de passe invalide');
      } else {
        setErrorPassword('Erreur serveur');
      }
    }
  };

  const anonymizeEmail = (email) => {
    if (!email) return 'email';

    const atIndex = email.indexOf('@');
    if (atIndex === -1) return '';

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    if (username.length <= 2) return email;

    const anonymizedUsername = `${username.charAt(0)}${'*'.repeat(
      username.length - 2
    )}${username.charAt(username.length - 1)}`;

    return `${anonymizedUsername}${domain}`;
  };

  const checkForEmailErrors = (input) => {
    if (input == '') return 'Veuillez indiquer votre adresse e-mail';
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
    <ScrollView style={AppStyles.container}>
      <TextTitle title="Profil" style={{ marginTop: 50 }} />
      <ButtonTouchable
        title={profile && profile.firstName ? profile.firstName : 'Accéder au profil'}
        subtext="Accéder aux informations du profil"
        image={[AppIcon.images.profile, 60]}
        onPress={() => navigation.navigate('Profile')}
      />

      <TextTitle
        title="Paramètres du compte"
        style={{ fontSize: AppStyles.fontSize.content, marginTop: 30 }}
      />
      <ButtonTouchable
        title="Adresse e-mail"
        subtext={anonymizeEmail(profile.email)}
        icon="paper-plane"
        action="menu"
        onPress={() => {
          setShowEmailInput(!showEmailInput);
          setShowPasswordInput(false);
        }}
      />
      {showEmailInput && (
        <View>
          <TextError title={errorEmail} />
          <InputField
            label="Nouvelle adresse e-mail"
            errorCheck={checkForEmailErrors}
            subText="Veuillez entrer votre nouvelle adresse e-mail"
            setValue={setEmail}
          />
          <ButtonConditional
            title="Changer d'adresse E-mail"
            isEnabled={validEmail}
            onPress={onChangeEmail}
            style={{ backgroundColor: AppStyles.color.darkgrey, marginBottom: 30 }}
            loading={loading}
          />
        </View>
      )}
      <ButtonTouchable
        title="Mot de passe"
        icon="fingerprint"
        action="menu"
        onPress={() => {
          setShowEmailInput(false);
          setShowPasswordInput(!showPasswordInput);
        }}
      />
      {showPasswordInput && (
        <View>
          <TextError title={errorPassword} />
          <InputFieldMultiple
            labels={['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmation mot de passe']}
            errorChecks={[checkForPasswordErrors, checkForPasswordErrors, checkForPasswordErrors]}
            subText="Veuillez entrer votre nouveau mot de passe"
            setValues={[setPassword, setNewPassword, setConfirmPassword]}
            secures={[true, true, true]}
          />
          <ButtonConditional
            title="Changer de mot de passe"
            isEnabled={validPassword}
            onPress={onChangePassword}
            style={{ backgroundColor: AppStyles.color.darkgrey, marginBottom: 30 }}
            loading={loading}
          />
        </View>
      )}
      <ButtonTouchable
        title="Notifications"
        icon="bell"
        onPress={() => {
          navigation.navigate('Notification');
        }}
      />

      <TextTitle
        title="Assistance"
        style={{ fontSize: AppStyles.fontSize.content, marginTop: 30 }}
      />
      <ButtonTouchable title="Centre d'aide" subtext="Bientôt disponible" icon="help-with-circle" />
      <ButtonTouchable title="Fonctionnement de Pulsive" subtext="Bientôt disponible" icon="leaf" />
      <ButtonTouchable
        title="Envoyez vos remarques"
        subtext="Bientôt disponible"
        icon="new-message"
      />

      <ButtonCommon
        title="Deconnexion"
        style={{ marginVertical: 30 }}
        onPress={() => {
          setModalVisible(true);
        }}
        loading={loading}
      />
      <ModalSwipeUp visible={modalVisible} onClose={() => setModalVisible(false)}>
        <TextTitle title="Êtes vous sûr de vouloir vous deconnecter ?" style={{ marginLeft: 0 }} />
        <ButtonConditional
          title="Me deconnecter"
          isEnabled={true}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('LoginStack');
          }}
        />
        <ButtonCommon
          title="Annuler"
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </ModalSwipeUp>
    </ScrollView>
  );
}

export default Settings;
