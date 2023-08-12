import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import { AnimatedLoading } from './';

{
  /*
  <ButtonConditional
    title(required)="ButtonConditional" // text of the button
    titleStyle(optional)={{ insert title style here }} // to change the title style
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
    isEnable(optional)={true} // condition for the button to be enable or not
    loading(optional)={true} // add or not a loading animation
  />
  */
}

const ButtonConditional = ({ title, titleStyle, style, isEnabled, onPress, loading }) => {
  const { AppColor } = useTheme();

  const isButtonEnabled = isEnabled && typeof isEnabled === 'boolean';

  const buttonStyle = {
    opacity: !isButtonEnabled || loading ? 0.5 : 1
  };

  const handlePress = () => {
    if (onPress) onPress();
  };

  const styles = StyleSheet.create({
    ButtonCommon: {
      borderRadius: 8,
      padding: 13,
      minHeight: 50,
      margin: 7,
      width: AppStyles.buttonWidth,
      alignSelf: 'center',
      backgroundColor: AppColor.pulsive
    },
    buttonText: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: AppColor.background,
      fontSize: 16
    },
    loadingText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      color: AppColor.background
    },
    dot: {
      marginHorizontal: 2
    }
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handlePress}
      style={{ ...styles.ButtonCommon, ...buttonStyle, ...(style || {}) }}
      disabled={!isButtonEnabled || loading}
    >
      {loading ? (
        <AnimatedLoading />
      ) : (
        <Text style={{ ...styles.buttonText, ...(titleStyle || {}) }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonConditional;
