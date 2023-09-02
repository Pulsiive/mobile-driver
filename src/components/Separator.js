import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../AppStyles';

{
  /*
  <Separator
    children(required) // content of the card
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const Separator = ({ children, style }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    Separator: {
      width: '100%',
      alignSelf: 'center',
      marginTop: 30,
      borderBottomWidth: 1,
      borderColor: AppColor.separator
    }
  });

  return (
    <View
      style={{
        ...styles.Separator,
        ...(style || {})
      }}
    />
  );
};

export default Separator;
