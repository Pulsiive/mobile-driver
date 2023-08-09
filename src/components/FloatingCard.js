import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ScrollView, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import { AnimatedLoading } from '.';

{
  /*
  <FloatingCard
    children(required) // content of the card
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const FloatingCard = ({ children, style }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    FloatingCard: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: AppColor.background,
      borderRadius: 25,
      elevation: 15,
      shadowColor: AppColor.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      paddingVertical: 35,
      paddingHorizontal: 15,
      marginVertical: 30
    },
    profileContainer: {
      alignItems: 'center'
    }
  });

  return (
    <View
      style={{
        ...styles.FloatingCard,
        ...(style || {})
      }}
    >
      <View style={styles.profileContainer}>{children}</View>
    </View>
  );
};

export default FloatingCard;
