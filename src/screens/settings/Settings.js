import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Button from 'react-native-button';
import { AppIcon, AppStyles } from '../../AppStyles';
import {
  ButtonCommon,
  ButtonConditional,
  ButtonTouchable,
  ModalSwipeUp,
  TextTitle
} from '../../components';
import api from '../../db/Api';

function Settings({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    firstName: null,
    lastName: null,
    email: null
  });

  useEffect(() => {
    try {
      api.send('GET', '/api/v1/profile', null).then((data) =>
        setProfile({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

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

  return (
    <ScrollView style={AppStyles.container}>
      <TextTitle title="Profil" style={{ marginTop: 50 }} />
      <ButtonTouchable
        title={profile && profile.firstName ? profile.firstName : 'Accéder au profil'}
        subtext="Accéder aux informations du profil"
        image={[AppIcon.images.profile, 60]}
        onPress={() => {
          navigation.navigate('Profile');
        }}
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
      />
      <ButtonTouchable title="Mot de passe" icon="fingerprint" action="menu" />
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
      <ButtonTouchable title="Centre d'aide" icon="help-with-circle" />
      <ButtonTouchable title="Fonctionnement de Pulsive" icon="leaf" />
      <ButtonTouchable title="Envoyez vos remarques" icon="new-message" />

      <ButtonCommon
        title="Deconnexion"
        style={{ marginVertical: 30 }}
        onPress={() => {
          setModalVisible(true);
        }}
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
      {/* <SettingsButton
        title="Change password"
        source={AppIcon.images.leftArrow}
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}
      />
      <SettingsButton
        title="Change email"
        source={AppIcon.images.leftArrow}
        onPress={() => {
          navigation.navigate('ChangeEmail');
        }}
      />*/}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//
// });

export default Settings;
