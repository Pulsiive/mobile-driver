import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';

{
  /*
  <ButtonCommon
    title(required)="ButtonCommon" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const ButtonCommon = ({ title, style, onPress }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={handlePress}
      style={{
        ...styles.ButtonCommon,
        ...(style || {})
      }}
    >
      <Text style={styles.ButtonCommonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonCommon: {
    backgroundColor: AppStyles.color.lightmode,
    borderColor: AppStyles.color.darkmode,
    borderWidth: 1,
    borderRadius: 8,
    padding: '4%',
    margin: '2%',
    width: AppStyles.buttonWidth,
    alignSelf: 'center'
  },
  ButtonCommonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: 16
  }
});

export default ButtonCommon;
