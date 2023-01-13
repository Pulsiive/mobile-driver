import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Button from 'react-native-button';
import { AppIcon, AppStyles } from '../../AppStyles';
import SwipeableTabs from 'react-native-swipe-tabs';

function Station(props) {
  const { imageUri, name } = useRoute().params;
  const [index, setIndex] = useState(0);
  const [tabs, setTabs] = useState(['Station1', 'Station2', 'Station3']);
  const navigation = useNavigation();
  const onPress = (nav) => {
    if (nav === 'Owner') {
      navigation.navigate('Owner', {
        imageUri: imageUri,
        name: name
      });
    } else navigation.navigate(nav, {});
  };

  const Station1 = (props) => {
    return (
      <View>
        <Text style={styles.stationTitle}>Station 1</Text>
        <Image style={styles.img} source={AppIcon.images.station_img} />
        <View style={styles.description}>
          <Text style={styles.textDescription}>Type: 1</Text>
          <Text style={styles.textDescription}>Power: 8 kW</Text>
          <Text style={styles.textDescription}>Plug: Mod 2</Text>
          <Text style={styles.textDescription}>Recharge Time: 3.20h</Text>
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

  const Station2 = (props) => {
    return (
      <View>
        <Text style={styles.stationTitle}>Station 2</Text>
        <Image style={styles.img} source={AppIcon.images.station_img} />
        <View style={styles.description}>
          <Text style={styles.textDescription}>Type: CHAdeMO</Text>
          <Text style={styles.textDescription}>Power: 100 kW</Text>
          <Text style={styles.textDescription}>Plug: Mod 3</Text>
          <Text style={styles.textDescription}>Recharge Time: 35m</Text>
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

  const Station3 = (props) => {
    return (
      <View>
        <Text style={styles.stationTitle}>Station 3</Text>
        <Image style={styles.img} source={AppIcon.images.station_img} />
        <View style={styles.description}>
          <Text style={styles.textDescription}>Type: P17 bleue</Text>
          <Text style={styles.textDescription}>Power: 7.3 kW</Text>
          <Text style={styles.textDescription}>Plug: Mod 2</Text>
          <Text style={styles.textDescription}>Recharge Time: 3.45h</Text>
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
      <SwipeableTabs onSwipe={(x) => setIndex(x)} selectedIndex={index} labels={tabs}>
        {/* {tabs.map((tab, index) => { */}
        <Station1 />
        <Station2 />
        <Station3 />
      </SwipeableTabs>

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
    fontWeight: 'solid',
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
