import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  Linking,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';

const PHONE_REGEX = new RegExp(/\+[0-9]{11}/s);

const styles = StyleSheet.create({
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
  // container: {
  //     flex: 1,
  //     paddingTop: 40,
  //     alignItems: "center",
  //     backgroundColor: 'white',
  //     color: 'white',
  //   },
  input: {
    position: 'relative',
    top: -150,
    height: 40,
    fontSize: 20,
    width: 240,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
    color: 'white'
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
    left: -45 + '%',
    width: 93 + '%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'flex-start'
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

function ReqPhoneNumberOTP({ navigation }) {
  const [number, onChangeNumber] = useState('+33');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (phoneNumber) => {
    setIsLoading(true);
    if (!PHONE_REGEX.test(phoneNumber)) {
      showMessage({
        message: "Le Numéro de téléphone n'est pas au bon format.",
        description: 'Veuillez entrer un numéro de téléphone à 13 chiffres.',
        type: 'error',
        backgroundColor: 'red'
      });
    } else {
      const res = await Backend.reqPhoneNumberOTP(phoneNumber);

      if (res.status === 200) {
        showMessage({
          message: 'Code OTP envoyé !',
          description: `Un code a été envoyé au numéro ${phoneNumber} !`,
          type: 'success',
          backgroundColor: 'green'
        });
        navigation.navigate('VerifyPhoneNumberOTP', { phoneNumber });
      } else {
        showMessage({
          message: 'Ce numéro de téléphone ne correspond à aucun utilisateur.',
          type: 'error',
          backgroundColor: 'red'
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}
    >
      <Text style={styles.Tel}>Entrez votre numéro de téléphone</Text>
      <View style={styles.Line2}></View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
          maxLength={12}
        />
      </SafeAreaView>
      <Pressable
        disabled={Boolean(number.length !== 12)}
        onPress={() => handleSubmit(number)}
        style={{
          backgroundColor: Boolean(number.length !== 12) ? 'grey' : '#81cd2c',
          borderRadius: 9,
          textAlign: 'center',
          height: 40,
          top: 10,
          padding: 12
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.IText}>Suivant</Text>
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate('TabNavigator')}>
        <View
          style={{
            backgroundColor: '#81cd2c',
            borderRadius: 9,
            textAlign: 'center',
            height: 40,
            top: 30,
            padding: 12
          }}
        >
          <Text style={styles.IText}>Plus tard</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ReqPhoneNumberOTP;
