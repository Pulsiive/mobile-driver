import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Button from 'react-native-button';
import { AppIcon, AppStyles } from '../../AppStyles';
import SwipeableTabs from 'react-native-swipe-tabs';
import api from '../../db/Api';

function Station(props) {
  const { imageUri, name, ownerId } = useRoute().params;
  const [index, setIndex] = useState(0);
  const [tabs, setTabs] = useState(['Station1', 'Station2', 'Station3']);
  const [stations, setStations] = useState([
    { type: null, power: null, price: null, charger: null },
    { type: null, power: null, price: null, charger: null },
    { type: null, power: null, price: null, charger: null }
  ]);
  const navigation = useNavigation();
  const onPress = (nav) => {
    if (nav === 'Owner') {
      navigation.navigate('Owner', {
        imageUri: imageUri,
        name: name
      });
    } else navigation.navigate(nav, {});
  };

  useEffect(() => {
    try {
      api.send('GET', `/api/v1/stations/private/user/${ownerId}`).then((data) => {
        setStations([
          {
            type: data.data.stations[0].properties.plugTypes[0],
            power: data.data.stations[0].properties.maxPower,
            price: data.data.stations[0].properties.price,
            charger: data.data.stations[0].properties.nbChargingPoints
          },
          {
            type: data.data.stations[1].properties.plugTypes[0],
            power: data.data.stations[1].properties.maxPower,
            price: data.data.stations[1].properties.price,
            charger: data.data.stations[1].properties.nbChargingPoints
          },
          {
            type: data.data.stations[2].properties.plugTypes[0],
            power: data.data.stations[2].properties.maxPower,
            price: data.data.stations[2].properties.price,
            charger: data.data.stations[2].properties.nbChargingPoints
          }
        ]);
        console.log(stations);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const Station = (props) => {
    return (
      <View>
        <Text style={styles.stationTitle}>Station {props.index}</Text>
        <Image style={styles.img} source={AppIcon.images.station_img} />
        <View style={styles.description}>
          <Text style={styles.textDescription}>Type: {props.type}</Text>
          <Text style={styles.textDescription}>Power: {props.power} kW</Text>
          <Text style={styles.textDescription}>Price: {props.price} €/h</Text>
          <Text style={styles.textDescription}>Chargers: {props.charger}</Text>
        </View>
        <Button
          onPress={() => onPress('Booking')}
          containerStyle={styles.bookButton}
          style={styles.shareText}
        >
          Book
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Station information</Text>
      {stations.length == 1 ? (
        <SwipeableTabs onSwipe={(x) => setIndex(x)} selectedIndex={index} labels={tabs}>
          <Station
            index={'1'}
            type={stations[0].type}
            power={stations[0].power}
            price={stations[0].price}
            charger={stations[0].charger}
          />
        </SwipeableTabs>
      ) : stations.length == 2 ? (
        <SwipeableTabs onSwipe={(x) => setIndex(x)} selectedIndex={index} labels={tabs}>
          <Station
            index={'1'}
            type={stations[0].type}
            power={stations[0].power}
            price={stations[0].price}
            charger={stations[0].charger}
          />
          <Station
            index={'2'}
            type={stations[1].type}
            power={stations[1].power}
            price={stations[1].price}
            charger={stations[1].charger}
          />
        </SwipeableTabs>
      ) : (
        <SwipeableTabs onSwipe={(x) => setIndex(x)} selectedIndex={index} labels={tabs}>
          <Station
            index={'1'}
            type={stations[0].type}
            power={stations[0].power}
            price={stations[0].price}
            charger={stations[0].charger}
          />
          <Station
            index={'2'}
            type={stations[1].type}
            power={stations[1].power}
            price={stations[1].price}
            charger={stations[1].charger}
          />
          <Station
            index={'3'}
            type={stations[2].type}
            power={stations[2].power}
            price={stations[2].price}
            charger={stations[2].charger}
          />
        </SwipeableTabs>
      )}

      <Button
        onPress={() => onPress('Owner')}
        containerStyle={styles.ownerButton}
        style={styles.shareText}
      >
        Owner profile
      </Button>
      <Button
        onPress={() => onPress('Stations')}
        containerStyle={styles.infoButton}
        style={styles.shareText}
      >
        Need documentation ?
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    top: 100,
    left: 20,
    flex: 1,
    height: 250,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  stationTitle: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.grey,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  description: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  textDescription: {
    fontSize: 20,
    paddingLeft: 170,
    paddingTop: 32,
    fontWeight: 'normal',
    color: AppStyles.color.text
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
  ownerButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 60
  },
  bookButton: {
    width: 200,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    top: 360,
    left: 80
  },
  infoButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 10
  },
  shareText: {
    color: AppStyles.color.white
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default Station;
