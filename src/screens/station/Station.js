import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Button from 'react-native-button';
import { AppIcon, AppStyles } from '../../AppStyles';

function Station() {
  const navigation = useNavigation();
  const onPress = (nav) => {
    navigation.navigate(nav, {});
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Station information</Text>
      <Image style={styles.img} source={AppIcon.images.station_img} />
      <View style={styles.description}>
        <Text style={styles.textDescription}>Type: 1</Text>
        <Text style={styles.textDescription}>Power: 8 kW</Text>
        <Text style={styles.textDescription}>Plug: Mod 2</Text>
        <Text style={styles.textDescription}>Recharge Time: 3.25h</Text>
      </View>
      <Button
        onPress={() => onPress('Stations')}
        containerStyle={styles.infoButton}
        style={styles.shareText}
      >
        Need documentation ?
      </Button>
      <Button
        onPress={() => onPress('Booking')}
        containerStyle={styles.bookButton}
        style={styles.shareText}
      >
        Book
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    top: 120,
    left: 20
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
    paddingTop: 60,
    fontWeight: 'bold',
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
  bookButton: {
    width: 200,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 80
  },
  infoButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
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
