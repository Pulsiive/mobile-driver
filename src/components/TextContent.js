import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <TextContent
    title(required)="Title" // content of the text
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const TextContent = ({ title, style, inLine }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: AppStyles.fontSize.content,
      fontWeight: '300',
      color: AppColor.text
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

export default TextContent;
