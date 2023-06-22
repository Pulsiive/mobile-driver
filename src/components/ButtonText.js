import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';

const ButtonText = ({ title, onPress }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
    color: AppStyles.color.text
  }
});

export default ButtonText;
