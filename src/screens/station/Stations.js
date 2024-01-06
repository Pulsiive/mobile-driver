import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Button from 'react-native-button';
import { AppIcon, AppStyles } from '../../AppStyles';

function Stations({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Stations documentation</Text>
      <Text style={styles.infoTitle}>Stations types</Text>
      <Text style={styles.infoText}>- Type 1: 8 kW</Text>
      <Text style={styles.infoText}>- Type 2: 43 kW</Text>
      <Text style={styles.infoText}>- Combo CCS: both type 1 & 2</Text>
      <Text style={styles.infoText}>- CHAdeMO: 100 kW</Text>
      <Text style={styles.infoText}>- P17 bleue: 7.3 kW</Text>
      <Text style={styles.infoTitle}>Stations cables</Text>
      <Text style={styles.infoText}>- Mod 2: standart</Text>
      <Text style={styles.infoText}>- Mod 3: type 2</Text>
      <View style={styles.container_view}>
        <Text style={styles.askUs}>More questions ?</Text>
        <Button containerStyle={styles.infoButton} style={styles.shareText}>
          Ask us
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    top: 150,
    left: 20
    // width: 50
    // height: 30
  },
  container_view: {
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1
    // alignItems: 'center'
  },
  askUs: {
    position: 'absolute',
    bottom: 70,
    fontSize: 15,
    paddingTop: 10,
    color: AppStyles.color.pulsive
  },
  infoTitle: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    fontWeight: 'bold',
    color: AppStyles.color.text
  },
  infoText: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    color: AppStyles.color.text
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.pulsive,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.subTitle,
    color: AppStyles.color.text
  },
  infoButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  shareText: {
    color: AppStyles.color.white
  },
  loginContainer: {
    width: AppStyles.buttonWidth,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
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
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: 25
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
    borderRadius: 25,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default Stations;
