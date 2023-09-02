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
      backgroundColor: AppColor.background,
      borderColor: AppColor.bottomColor,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppColor.background,
      borderRadius: 100,
      elevation: 3,
      shadowColor: AppColor.title,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4
    }
  });

  return (
    <TouchableOpacity style={{ ...styles.FloatingButton, ...(style || {}) }} onPress={onPress}>
      <Icon name={icon} size={25} color={iconColor ? iconColor : AppColor.icon} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
