import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <TextTitle
    title(required)="Title" // content of the text
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const TextTitle = ({ title, style, inLine }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: AppStyles.fontSize.title,
      fontWeight: '500',
      color: AppColor.title,
      margin: 20
    }
  });

  return (
    <View>
      {inLine ? (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            flexShrink: 1,
            ...styles.title,
            ...(style || {})
          }}
        >
          {title}
        </Text>
      ) : (
        <Text
          style={{
            ...styles.title,
            ...(style || {})
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default TextTitle;
