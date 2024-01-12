import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  Linking,
  Animated,
  Platform
} from 'react-native';

import { useEffect } from 'react';
import { AppIcon } from '../../AppStyles';

const styles = StyleSheet.create({
  Logo2: {
    width: 153,
    height: 153,
    position: 'absolute',
    top: 21.6 + '%',
    resizeMode: 'cover'
  },
  line: {
    width: 307,
    height: 1,
    position: 'absolute',
    top: 44.39 + '%',
    backgroundColor: '#707070'
  },
  Welcome: {
    color: 'white',
    fontWeight: '700',
    width: 400,
    height: 400,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0,
    position: 'absolute',
    top: 47.89 + '%'
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
    top: 10 + '%',
    left: 18 + '%',
    color: 'white',
    fontWeight: 'bold'
  },
  Btn: {
    boxSizing: 'borderBox',
    width: 50 + '%',
    top: '20%',
    right: '190%',
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
    width: 85 + '%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'flex-start'
  },
  content: {
    backgroundColor: '#81cd2c',
    borderRadius: 9,
    textAlign: 'center',
    height: 100 + '%',
    padding: 12
  },
  group2: {
    position: 'absolute',
    top: 72 + '%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoG: {
    width: 20,
    height: 13,
    marginLeft: 23,
    resizeMode: 'cover'
  },
  logoT: {
    width: 20,
    height: 16,
    marginLeft: 23,
    resizeMode: 'cover'
  },
  logoL: {
    width: 20,
    height: 20,
    marginLeft: 23,
    resizeMode: 'cover'
  },
  pattern1: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    left: 8.2 + '%',
    top: 8.3 + '%'
  },
  pattern2: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    left: 87 + '%',
    top: 31 + '%'
  },
  pattern3: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    left: 37 + '%',
    top: 94 + '%'
  },
  center: {
    width: 318,
    minHeight: 267,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  Logo: {
    width: 52,
    height: 52,
    resizeMode: 'cover'
  },
  Pulsiive: {
    width: 117,
    height: 38,
    resizeMode: 'cover',
    marginTop: 24
  },
  Wording: {
    width: 318,
    height: 83,
    marginTop: 25,
    resizeMode: 'cover'
  },
  Start: {
    width: 125,
    height: 20,
    marginTop: 25,
    resizeMode: 'cover'
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

function SendEmailConfirmation({ route, navigation }) {
  const { email } = route.params;

  const handleOpenURL = (event) => {
    navigate(event.url);
  };

  useEffect(() => {
    let subscription;
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        navigate(url);
      });
      Linking.addEventListener('url', (e) => {
        navigate(e.url);
      });
    } else {
      subscription = Linking.addListener('url', handleOpenURL);
    }

    return () => {
      subscription.remove();
    };
  }, []);

  const navigate = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const args = route.split('/');
    const routeName = args[0];
    const token = args[1];
    const email = args[2];

    //if (routeName === 'email-verification')
    navigation.navigate('VerifyEmailToken', { token, email });
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}
    >
      <Image source={AppIcon.images.logo2} style={styles.Logo2} />
      <View style={styles.line}></View>
      <Text style={styles.Welcome}>
        Un e-mail de confirmation a été envoyé à {email} ! {'\n'} Veuillez vérifier votre e-mail.
      </Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('ReqPhoneNumberOTP');
        }}
      >
        <View style={styles.groupBtn}>
          <View style={styles.Btn}>
            <View style={styles.content}>
              <Text style={styles.IText}>Passer</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default SendEmailConfirmation;
