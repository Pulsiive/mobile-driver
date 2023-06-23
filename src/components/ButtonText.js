import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';

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
  const handlePress = () => {
    if (onPress) onPress();
  };

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

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start'
  },
  text: {
    textDecorationLine: 'underline',
    color: AppStyles.color.text
  }
});

export default ButtonText;
