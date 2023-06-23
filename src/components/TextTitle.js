import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AppStyles } from '../AppStyles';

{
  /*
  <TextTitle
    title(required)="Title" // content of the text
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const TextTitle = ({ title, style }) => {
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

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: AppStyles.color.title,
    margin: 20
  }
});

export default TextTitle;
