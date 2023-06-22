import React, { useState } from 'react';
import Button from 'react-native-button';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { AppStyles } from '../../AppStyles';

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome on Puslive</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}
      >
        Log In
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => navigation.navigate('SignUp')}
      >
        Sign Up
      </Button>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => navigation.navigate('Components')}
      >
        Components
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150
  },
  logo: {
    width: 200,
    height: 200
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  loginContainer: {
    width: AppStyles.buttonWidth,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  signupContainer: {
    width: AppStyles.buttonWidth,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15
  },
  signupText: {
    color: AppStyles.color.tint
  },
  spinner: {
    marginTop: 200
  }
});

export default Welcome;
