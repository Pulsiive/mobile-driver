import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
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
  const { AppColor } = useTheme();

  const handlePress = () => {
    if (onPress) onPress();
  };

  const styles = StyleSheet.create({
    ButtonCommon: {
      backgroundColor: AppColor.background,
      borderColor: AppColor.title,
      borderWidth: 1,
      borderRadius: 8,
      minHeight: 50,
      padding: '4%',
      margin: '2%',
      width: AppStyles.buttonWidth,
      alignSelf: 'center'
    },
    ButtonCommonText: {
      fontWeight: '500',
      textAlign: 'center',
      color: AppColor.text,
      fontSize: 16
    }
  });

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
        <AnimatedLoading style={{ backgroundColor: AppColor.darkmode }} />
      ) : (
        <Text style={styles.ButtonCommonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCommon;
