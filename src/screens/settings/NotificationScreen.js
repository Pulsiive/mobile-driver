import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppStyles, useTheme } from '../../AppStyles';
import api from '../../db/Api';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonConditional, TextSubTitle, TextTitle } from '../../components';

function NotificationScreen({ navigation }) {
  const { AppColor } = useTheme();

  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const response = await Backend.me();

      if (response.status === 200) {
        console.log(response.data.isNotificationOn);
        console.log(response.data.isAlertOn);
        setProfile(response.data);
        showMessage({
          message: `Paramètres de notification récupérés avec succès`,
          type: 'success',
          backgroundColor: AppColor.pulsive
        });
        setIsNotificationEnabled(response.data.isNotificationOn);
        setIsAlertEnabled(response.data.isAlertOn);
      } else {
        showMessage({
          message: 'Impossible de récupérer le profil',
          type: 'error',
          backgroundColor: AppColor.error
        });
      }
    };

    getProfile();
  }, []);

  const onChange = async (isNotificationOn = null, isAlertOn = null) => {
    const res = await api.send(
      'patch',
      '/api/v1/profile',
      {
        ...(isNotificationOn !== null && { isNotificationOn: isNotificationOn }),
        ...(isAlertOn !== null && { isAlertOn: isAlertOn })
      },
      true
    );

    if (res.status !== 200) {
      showMessage({
        message: 'Erreur lors de la modification des paramètres',
        description: 'Error',
        type: 'error',
        backgroundColor: AppColor.error
      });
    }
  };

  return (
    <ScrollView style={[AppStyles.container, { backgroundColor: AppColor.background }]}>
      {profile && (
        <View style={{ paddingTop: 50 }}>
          <TextSubTitle title="Gérer vos notifications" style={{ margin: 20 }} />
          <ButtonConditional
            title="Alertes"
            style={{ backgroundColor: isAlertEnabled ? AppColor.pulsive : AppColor.disabled }}
            isEnabled={true}
            onPress={() => {
              setIsAlertEnabled((previousState) => !previousState);
              onChange(null, !isAlertEnabled);
            }}
          />
          <ButtonConditional
            title="Notifications"
            style={{
              backgroundColor: isNotificationEnabled ? AppColor.pulsive : AppColor.disabled
            }}
            isEnabled={true}
            onPress={() => {
              setIsNotificationEnabled((previousState) => !previousState);
              onChange(null, !isNotificationEnabled);
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default NotificationScreen;
