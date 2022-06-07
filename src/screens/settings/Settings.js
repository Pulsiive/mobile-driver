import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, Image } from 'react-native';
import Button from 'react-native-button';
import { AppIcon, AppStyles } from '../../AppStyles';
import SettingsButton from '../../components/SettingsButton';

function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Settings</Text>
      <SettingsButton
        title="Change password"
        source={AppIcon.images.leftArrow}
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}
      />
      <View style={styles.leftTitle}>
        <Text style={styles.mutedText}>Your informations</Text>
        <Text style={styles.text}>Email: test@test.com</Text>
        <Text style={styles.text}>Country: UK 🇬🇧</Text>
        <Text style={styles.text}>Language: English</Text>
      </View>
      <Button
        containerStyle={styles.logoutButton}
        style={styles.logoutText}
        onPress={() => {
          navigation.navigate('Logout');
        }}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  btnIcon: {
    height: 25,
    width: 25
  },
  btnText: {
    color: AppStyles.color.title,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
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
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 20,
    marginBottom: 15
  },
  mutedText: {
    fontWeight: 'bold',
    color: AppStyles.color.grey,
    fontSize: 15,
    marginBottom: 30
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
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  logoutButton: {
    width: 200,
    backgroundColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  logoutText: {
    color: AppStyles.color.white
  }
});

export default Settings;
