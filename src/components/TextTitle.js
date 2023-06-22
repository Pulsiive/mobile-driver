import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AppStyles } from '../AppStyles';

const TextTitle = ({ title }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
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
