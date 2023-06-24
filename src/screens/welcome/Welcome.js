import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonCommon, ButtonConditional, ButtonText, TextTitle } from '../../components';

function Welcome({ navigation }) {
  return (
    <ScrollView contentContainerStyle={[AppStyles.container, styles.container]}>
      <View style={styles.logoContainer}>
        <Image source={AppIcon.images.logo} style={styles.logo} />
        <TextTitle title="Pulsive" style={styles.title} />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonConditional
          title="Me connecter"
          isEnabled={true}
          onPress={() => navigation.navigate('Login')}
        />
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Pas encore de compte ?</Text>
          <ButtonText title="En créer un" onPress={() => navigation.navigate('SignUp')} />
        </View>
      </View>
      <ButtonCommon title="Composants" onPress={() => navigation.navigate('Components')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40
  },
  logoContainer: {
    alignItems: 'flex-start'
  },
  logo: {
    width: 50,
    height: 50
    // resizeMode: 'cover'
  },
  accountContainer: {
    flexDirection: 'row'
  },
  accountText: {
    color: AppStyles.color.text,
    marginRight: 5
  },
  // title: {
  //   fontSize: 24,
  //   marginTop: 20
  // },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Welcome;
