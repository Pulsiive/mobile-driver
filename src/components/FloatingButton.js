import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';

{
  /*
  <FloatingButton
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const FloatingButton = ({ style, icon, iconColor, onPress }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    FloatingButton: {
      position: 'absolute',
      width: 50,
      height: 50,
      backgroundColor: AppColor.bottomColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      elevation: 2,
      shadowColor: AppColor.title,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 1.5
    }
  });

  return (
    <TouchableOpacity style={{ ...styles.FloatingButton, ...(style || {}) }} onPress={onPress}>
      <Icon name={icon} size={25} color={iconColor ? iconColor : AppColor.icon} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
