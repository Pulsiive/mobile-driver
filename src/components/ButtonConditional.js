import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';

const ButtonConditional = ({ title, style, isEnabled, onPress }) => {
  const isButtonEnabled = isEnabled && typeof isEnabled === 'boolean';

  const buttonStyle = {
    opacity: isButtonEnabled ? 1 : 0.5
  };

  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={{ ...styles.ButtonConditional, ...buttonStyle, ...(style || {}) }}
      disabled={!isButtonEnabled}
    >
      <Text style={styles.ButtonConditionalText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonConditional: {
    borderRadius: 8,
    padding: '4%',
    margin: '2%',
    width: AppStyles.buttonWidth,
    alignSelf: 'center',
    backgroundColor: AppStyles.color.pulsive
  },
  ButtonConditionalText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: AppStyles.color.lightmode,
    fontSize: 16
  }
});

export default ButtonConditional;
