import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';

export default function MenuButton(props) {
  const { AppColor } = useTheme();

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
      alignItems: 'flex-start'
    },
    btnIcon: {
      height: 25,
      width: 25
    },
    btnText: {
      color: AppColor.title,
      fontSize: 16,
      marginLeft: 10,
      marginTop: 2
    }
  });

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)"
    >
      <View style={styles.btnContainer}>
        <Image source={props.source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
}
