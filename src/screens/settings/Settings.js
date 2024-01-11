import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { AppIcon, AppStyles, useTheme } from '../../AppStyles';
import {
  ButtonCommon,
  ButtonConditional,
  ButtonTouchable,
  FloatingCard,
  InputField,
  InputFieldMultiple,
  ModalSwipeUp,
  TextError,
  TextSubTitle,
  TextTitle
} from '../../components';
import api from '../../db/Api';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

function Settings({ navigation }) {
  const { isDarkMode, toggleTheme, AppColor } = useTheme();

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
        getProfile();
      } catch (e) {
        console.log(e);
      }
    }, [])
  );

  const getProfile = () => {
    api.send('GET', '/api/v1/profile', null).then((data) =>
      setProfile({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        profilePictureId: data.data.profilePictureId,
        balance: data.data.balance
      })
    );
  };

  useEffect(() => {
    try {
      getProfile();
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
          backgroundColor: AppColor.pulsive
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
          backgroundColor: AppColor.pulsive
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
    <ScrollView
      style={[AppStyles.container, { backgroundColor: AppColor.background, paddingTop: 30 }]}
    >
      <TextTitle title="Profil" />
      <ButtonTouchable
        title={
          profile && profile.firstName && profile.lastName
            ? profile.firstName + ' ' + profile.lastName
            : 'Accéder au profil'
        }
        subtext="Accéder aux informations du profil"
        profilePicture={{ id: profile.profilePictureId, height: 60, width: 60, borderRadius: 70 }}
        onPress={() => navigation.navigate('Profile')}
      />

      <FloatingCard>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <TextSubTitle
              title="Voyagez avec Pulsive"
              style={{
                marginLeft: 10
              }}
            />
            <Text style={[AppStyles.subtext, { marginHorizontal: 10, marginTop: 10 }]}>
              Soyez assuré de trouver des bornes de recharge dans toutes la France et dans le monde
              entier grâce au réseau d'utilisateurs Pulsive
            </Text>
          </View>
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            source={isDarkMode ? AppIcon.images.stationDarkmode : AppIcon.images.stationLightmode}
            style={{ width: '40%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
      </FloatingCard>

      <TextSubTitle title="Paramètres du compte" style={{ marginLeft: 20, marginVertical: 10 }} />
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
            style={{ backgroundColor: AppColor.disabled, marginBottom: 30 }}
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
            style={{ backgroundColor: AppColor.disabled, marginBottom: 30 }}
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
      {/* <ButtonTouchable
        title="Bons de réduction"
        icon="wallet"
        onPress={() => {
          navigation.navigate('PromoCodesPage');
        }}
      />
      <ButtonTouchable
        title="Liste de contacts"
        icon="users"
        onPress={() => {
          navigation.navigate('Contacts');
        }}
      />
      <ButtonTouchable
        title="Historique de paiement"
        icon="credit-card"
        onPress={() => {
          navigation.navigate('PaymentHistory');
        }}
      />

      <TextTitle
        title="Personnalisation"
        style={{ fontSize: AppStyles.fontSize.content, marginTop: 30 }}
      /> */}
      <ButtonTouchable
        title="Liste de contacts"
        icon="users"
        onPress={() => {
          navigation.navigate('Contacts');
        }}
      />
      <ButtonTouchable
        title="Historique de paiement"
        icon="credit-card"
        onPress={() => {
          navigation.navigate('PaymentHistory');
        }}
      />

      <TextSubTitle title="Portefeuille" style={{ fontSize: AppStyles.fontSize.content, marginTop: 30 }} />
      <ButtonCommon
        title={`Ajouter de l'argent (${profile.balance/100} €)`}
        style={{ marginVertical: 10 }}
        onPress={() => {
          navigation.navigate('TopUp')
        }}
      />

      <TextSubTitle title="Personnalisation" style={{ marginLeft: 20, marginVertical: 30 }} />
      <ButtonCommon
        title={isDarkMode ? 'Clair' : 'Sombre'}
        style={{ marginBottom: 10 }}
        onPress={() => {
          toggleTheme();
        }}
        loading={loading}
      />

      <TextSubTitle
        title="Assistance"
        style={{ marginLeft: 20, marginTop: 30, marginBottom: 10 }}
      />
      <ButtonTouchable title="Centre d'aide" subtext="Bientôt disponible" icon="help-with-circle" />
      <ButtonTouchable title="Fonctionnement de Pulsive" subtext="Bientôt disponible" icon="leaf" onPress={() => {navigation.navigate('Fonctionnement');}} />
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
        <TextSubTitle
          title="Êtes vous sûr de vouloir vous déconnecter ?"
          style={{ margin: 20, marginLeft: 0 }}
        />
        <ButtonConditional
          title="Me déconnecter"
          isEnabled={true}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Login');
          }}
        />
        <ButtonCommon
          title="Annuler"
          onPress={() => {
            setModalVisible(false);
          }}
          style={{ marginBottom: 30 }}
        />
      </ModalSwipeUp>
    </ScrollView>
  );
}

export default Settings;
