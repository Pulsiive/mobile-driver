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

const TextTitle = ({ title, style }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: 26,
      fontWeight: '500',
      color: AppColor.title,
      margin: 20
    }
  });

  return (
    <View>
      <Text
        style={{
          ...styles.title,
          ...(style || {})
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default TextTitle;
