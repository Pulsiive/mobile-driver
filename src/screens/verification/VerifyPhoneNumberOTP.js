import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Pressable,
  Keyboard,
  ActivityIndicator
} from 'react-native';

import OTPInput from './OTPInput';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';

const styles = (isPinReady) =>
  StyleSheet.create({
    Tel: {
      color: 'white',
      fontWeight: '700',
      width: 326,
      height: 42,
      textAlign: 'left',
      lineHeight: 18,
      letterSpacing: 0,
      position: 'absolute',
      top: 10.89 + '%'
    },
    Line2: {
      width: 240,
      height: 1,
      position: 'absolute',
      top: 35 + '%',
      backgroundColor: 'grey'
    },
    container: {
      top: 25 + '%'
    },
    border: {
      minWidth: 354,
      height: 44,
      borderRadius: 9,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'white',
      position: 'absolute',
      top: 55.34 + '%',
      display: 'flex',
      alignItems: 'flex-start',
      backgroundColor: '#ffffff1a',
      paddingBottom: 36.7,
      ...padding(9.9, 36.7)
    },

    logoFB: {
      width: 24,
      height: 24,
      resizeMode: 'cover'
    },
    TextFB: {
      position: 'absolute',
      top: 55 + '%',
      alignSelf: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    Btn: {
      boxSizing: 'borderBox',
      width: 100 + '%',
      marginBottom: 0,
      ...padding(0, 4.5)
    },
    IText: {
      minHeight: 19,
      minWidth: 90,
      textAlign: 'center',
      letterSpacing: 0,
      lineHeight: 18,
      color: 'white',
      fontWeight: 'bold'
    },
    groupBtn: {
      position: 'absolute',
      top: 63 + '%',
      width: 93 + '%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'flex-start'
    },
    content: {
      backgroundColor: !isPinReady ? 'grey' : '#81cd2c',
      borderRadius: 9,
      textAlign: 'center',
      height: 100 + '%',
      padding: 12
    }
  });

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : b ? b : a
  };
}

function VerifyPhoneNumberOTP({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maximumCodeLength = 4;

  const handleSubmit = async (otp, phoneNumber) => {
    setIsLoading(true);
    const res = await Backend.verifyPhoneNumberOTP(otp, phoneNumber);

    if (res.status === 200) {
      showMessage({
        duration: 4000,
        message: 'Votre numéro de téléphone a été verifié avec succès !',
        type: 'success',
        backgroundColor: 'green'
      });
      navigation.navigate('TabNavigator');
    } else if (res.status === 401) {
      showMessage({
        duration: 4000,
        message: `Le code a expiré.`,
        description: 'Veuillez faire une nouvelle demande de code OTP',
        type: 'error',
        backgroundColor: 'red'
      });
    } else {
      showMessage({
        duration: 4000,
        message: `Le code ne correspond pas au code envoyé au ${phoneNumber}.`,
        type: 'error',
        backgroundColor: 'red'
      });
    }
    setIsLoading(false);
  };

  const handleResendCode = async (phoneNumber) => {
    setIsLoading(true);
    const res = await Backend.reqPhoneNumberOTP(phoneNumber);

    if (res.status === 200) {
      showMessage({
        message: 'Code OTP envoyé !',
        description: `Un code a été envoyé au numéro ${phoneNumber} !`,
        type: 'success',
        backgroundColor: 'green'
      });
    } else {
      showMessage({
        message: 'Une erreur interne est survenue.',
        type: 'error',
        backgroundColor: 'red'
      });
    }
    setIsLoading(false);
  };

  return (
    <Pressable
      style={{ flex: 1, alignItems: 'center', backgroundColor: 'black' }}
      onPress={Keyboard.dismiss}
    >
      <Text style={styles(this.props).Tel}>Un code a été envoyé au {phoneNumber} !</Text>
      <View style={styles(this.props).container}>
        <OTPInput
          code={otpCode}
          setCode={setOTPCode}
          maximumLength={maximumCodeLength}
          setIsPinReady={setIsPinReady}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={{ color: '#81cd2c', top: 28 + '%' }}
          onPress={() => handleResendCode(phoneNumber)}
        >
          Envoyer un autre code
        </Text>
      )}
      <TouchableHighlight
        disabled={!isPinReady}
        style={styles(this.props).groupBtn}
        onPress={() => handleSubmit(otpCode, phoneNumber)}
      >
        <View style={styles(this.props).Btn}>
          <View style={styles(isPinReady).content}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles(this.props).IText}>Vérifier</Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Pressable>
  );
}

export default VerifyPhoneNumberOTP;
