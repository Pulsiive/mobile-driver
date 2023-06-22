import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles } from '../AppStyles';

const TextError = ({ title }) => {
  return (
    <View>
      {title !== '' && (
        <View style={styles.iconContainer}>
          <Icon name="info-with-circle" size={16} style={styles.infoIcon} />
          <Text style={styles.error}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoIcon: {
    marginRight: 5,
    color: AppStyles.color.error
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },
  error: {
    fontSize: 16,
    fontWeight: '400',
    color: AppStyles.color.error,
    marginLeft: 5
  }
});

export default TextError;
