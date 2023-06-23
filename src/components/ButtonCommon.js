import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';
import { AnimatedLoading } from './';

{
  /*
  <ButtonCommon
    title(required)="ButtonCommon" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
    loading(optional)={true} // add or not a loading animation
  />
  */
}

const ButtonCommon = ({ title, style, onPress, loading }) => {
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
      {loading ? (
        <AnimatedLoading style={{ backgroundColor: AppStyles.color.darkmode }} />
      ) : (
        <Text style={styles.ButtonCommonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonCommon: {
    backgroundColor: AppStyles.color.lightmode,
    borderColor: AppStyles.color.darkmode,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 54,
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
