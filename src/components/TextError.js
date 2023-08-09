import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles, useTheme } from '../AppStyles';

{
  /*
  <TextError
    title(required)="Error" // content of the text
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const TextError = ({ title, style }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    infoIcon: {
      marginRight: 5,
      color: AppColor.error
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20
    },
    error: {
      fontSize: 16,
      fontWeight: '400',
      color: AppColor.error,
      marginLeft: 5
    }
  });

  return (
    <View>
      {title !== '' && (
        <View
          style={{
            ...styles.container,
            ...(style || {})
          }}
        >
          <Icon name="info-with-circle" size={16} style={styles.infoIcon} />
          <Text style={styles.error}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default TextError;
