import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import { AppStyles } from '../AppStyles';

export default function SettingsButton(props) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)"
    >
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>{props.title}</Text>
        <Image source={props.source} style={styles.btnIcon} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  btnIcon: {
    height: 25,
    width: 25
  },
  btnText: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 20,
    marginBottom: 15
  }
});
