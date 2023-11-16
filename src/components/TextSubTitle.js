import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <TextSubTitle
    title(required)="Title" // content of the text
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const TextSubTitle = ({ title, style, inLine }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: AppStyles.fontSize.subTitle,
      fontWeight: '500',
      color: AppColor.title
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

export default TextSubTitle;
