import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';

function NotificationScreen({ navigation }) {
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
          message: `Settings de notification récupéré avec succès`,
          type: "success",
          backgroundColor: "green"
        });
        setIsNotificationEnabled(response.data.isNotificationOn);
        setIsAlertEnabled(response.data.isAlertOn);
      } else {
        showMessage({
          message: 'Impossible de récupérer la balance',
          type: "error",
          backgroundColor: "red"
        });
      }
    }

    getProfile();
  }, []);

  const onChange = async (isNotificationOn = null, isAlertOn = null) => {
    const res = await api.send(
      'patch',
      '/api/v1/profile',
      {
        ...(isNotificationOn !== null && { isNotificationOn: isNotificationOn }),
        ...(isAlertOn !== null && { isAlertOn: isAlertOn }),
      },
      true
    );

    if (res.status !== 200) {
      showMessage({
        message: "Error occured when update notifications settings",
        description: "Error",
        type: "error",
        backgroundColor: "red"
      });
    }
  }

  return (
    <View style={styles.container}>
      {profile && <View style={styles.viewContainer}>
        <Text style={styles.text}>Alert</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isAlertEnabled ? 'white' : '#f4f3f4'}
          onValueChange={() => {
            setIsAlertEnabled(previousState => !previousState)
            onChange(null, !isAlertEnabled);
          }}
          value={isAlertEnabled}
        />
        <Text style={styles.text}>Notification</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isNotificationEnabled ? 'white' : '#f4f3f4'}
          onValueChange={() => {
            setIsNotificationEnabled(previousState => !previousState)
            onChange(!isNotificationEnabled);
          }}
          value={isNotificationEnabled}
        />
      </View>}
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
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 20,
    marginBottom: 15
  },
});

export default NotificationScreen;
