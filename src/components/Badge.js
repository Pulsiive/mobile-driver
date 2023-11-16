import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';

{
  /*
  <Badge
    title(required)="Badge" // text of the button
    icon(required)="icon" // text of the button
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const Badge = ({ icon, title, style, contentColor }) => {
  const { AppColor } = useTheme();

  contentColor ? contentColor : (contentColor = AppColor.text);
  const styles = StyleSheet.create({
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      alignSelf: 'flex-start',
      backgroundColor: AppColor.bottomColor,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 100,
      paddingHorizontal: 7,
      paddingVertical: 2,
      elevation: 5,
      shadowColor: AppColor.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4
    },
    text: {
      marginLeft: 3,
      color: AppColor.text
    }
  });

  return (
    <View
      style={{
        ...styles.badge,
        ...(style || {})
      }}
    >
      <Icon name={icon} size={14} color={contentColor ? contentColor : AppColor.text} />
      <Text
        style={{
          ...styles.text,
          color: contentColor
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Badge;
