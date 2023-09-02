import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <ButtonText
    title(required)="ButtonText" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const ButtonText = ({ title, style, onPress }) => {
  const { AppColor } = useTheme();

  const handlePress = () => {
    if (onPress) onPress();
  };

  const styles = StyleSheet.create({
    button: {
      alignSelf: 'flex-start'
    },
    text: {
      textDecorationLine: 'underline',
      color: AppColor.text
    }
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text
        style={{
          ...styles.text,
          ...(style || {})
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
