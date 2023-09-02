import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppIcon, AppStyles, useTheme } from '../AppStyles';
import ButtonText from './ButtonText';

{
  /*
  <TextList
    titles(optional)="Nom: " // text of the list
    infos(required)="John" // infos of the list
    subtext(optional)="subtext" // to add a subtext
  />
  */
}

const TextList = ({ titles, infos, subtexts }) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '90%',
      paddingVertical: 15,
      borderBottomColor: AppColor.separator,
      borderBottomWidth: 1,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    titles: {
      marginStart: 5,
      color: AppColor.text,
      fontSize: 16
    },
    infos: {
      marginEnd: 5,
      color: AppColor.text,
      fontWeight: '300',
      fontSize: 16
    }
  });

  return (
    <View>
      {infos.map((info, index) => (
        <View key={index} style={styles.container}>
          {titles && <Text style={styles.titles}>{titles[index]}: </Text>}
          <Text style={styles.infos}>{info}</Text>
        </View>
      ))}
    </View>
  );
};

export default TextList;
