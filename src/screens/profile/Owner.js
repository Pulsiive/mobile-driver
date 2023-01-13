import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Pressable } from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';
import serviceAccessToken from '../../db/AccessToken';

function Owner(props) {
  const [stations, setStations] = useState([]);
  const { imageUri, name } = useRoute().params;
  const navigation = useNavigation();
  const onPress = (nav) => {
    navigation.navigate(nav, {
      imageUri: imageUri,
      name: name
    });
  };

  // useEffect(() => {
  //   async function fetchStations() {
  //     const res = await api.send('get', '/api/v1/profile/getStations', null, true);
  //     console.log('res: ', res);
  //     setStations(res);
  //   }
  //   try {
  //     fetchStations();
  //   } catch (e) {
  //     console.log('e: ', e);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Owner</Text>
      <View style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75
          }}
        />
      </View>
      <View style={styles.leftTitle}>
        <Text style={styles.text}>Username: {name}</Text>
        <Text style={styles.text}>Address: 54 Charing Cross Rd</Text>
        <Text style={styles.text}>Country: UK 🇬🇧</Text>
        <Text style={styles.text}>Rating: 4.2/5</Text>
      </View>
      <Button
        onPress={() => onPress('Calendar')}
        containerStyle={styles.calendarButton}
        style={styles.buttonText}
      >
        Your reservations
      </Button>
      <Button
        onPress={() => onPress('Station')}
        containerStyle={styles.stationButton}
        style={styles.buttonText}
      >
        Station
      </Button>
      <Button containerStyle={styles.shareButton} style={styles.buttonText}>
        Share this profil
      </Button>
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
    marginBottom: 50
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
  stationButton: {
    width: 200,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    position: 'absolute',
    bottom: 70
  },
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    position: 'absolute',
    bottom: 20
  },
  calendarButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    position: 'absolute',
    bottom: 120
  },
  buttonText: {
    color: AppStyles.color.white
  }
});

export default Owner;
