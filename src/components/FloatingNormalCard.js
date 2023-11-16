import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../AppStyles';

{
  /*
  <FloatingNormalCard
    children(required) // content of the card
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const FloatingNormalCard = ({ children, style }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    FloatingNormalCard: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: AppColor.background,
      borderWidth: 0.25,
      borderColor: AppColor.border,
      borderRadius: 20,
      elevation: 5,
      shadowColor: AppColor.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginVertical: 10
    }
  });

  return (
    <View
      style={{
        ...styles.FloatingNormalCard,
        ...(style || {})
      }}
    >
      <View>{children}</View>
    </View>
  );
};

export default FloatingNormalCard;
