import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Pressable } from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles } from '../../AppStyles';
import { FlatList } from 'react-native-gesture-handler';

function CalendarCard(props) {
  const { location, date, reward } = props.data;
  return (
    <View
      style={{
        margin: 5,
        padding: 20,
        paddingBottom: 0,
        backgroundColor: AppStyles.color.background,
        borderRadius: 15,
        width: 330
        // height: 120
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name="location-pin"
          style={{
            marginRight: 8,
            position: 'relative',
            top: 5,
            backgroundColor: AppStyles.color.pulsive,
            borderRadius: 25,
            height: 20
          }}
          size={20}
          color="grey"
        />
        <Text style={styles.addressText}>{location}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="calendar"
            style={{
              marginRight: 8,
              position: 'relative',
              top: 5
            }}
            size={20}
            color="grey"
          />
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>{reward}</Text>
          <Icon
            name="credit"
            style={{
              top: 5
            }}
            size={20}
            color="grey"
          />
        </View>
      </View>
    </View>
  );
}

function Calendar({ navigation }) {
  // const navigation = useNavigation();
  // const onPress = () => {
  //   navigation.navigate('Station', {
  //     imageUri: imageUri,
  //     name: name
  //   });
  // };

  const data = [
    {
      id: '1',
      location: '8th Street Chippewa Falls',
      date: 'October 18, 2022',
      reward: '8.7'
    },
    {
      id: '2',
      location: '4 Blue Spring Avenue Seattle',
      date: 'September 12, 2022',
      reward: '14.6'
    },
    {
      id: '3',
      location: '13 Peachtree Street Methuen',
      date: 'June 25, 2022',
      reward: '10.2'
    },
    {
      id: '4',
      location: '13 North Oklahoma Wilson',
      date: 'February 24, 2022',
      reward: '9.0'
    },
    {
      id: '5',
      location: '59 NE. Wall Dr.York',
      date: 'February 22, 2022',
      reward: '17.3'
    },
    {
      id: '6',
      location: '58 Mill Pond Street Chaska',
      date: 'January 27, 2022',
      reward: '5.4'
    }
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CalendarCard data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.pulsive,
    marginTop: 20,
    marginBottom: 50
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  addressText: {
    fontWeight: 'bold',
    color: AppStyles.color.pulsive,
    fontSize: 20,
    marginBottom: 15
  },
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.grey,
    fontSize: 20,
    marginBottom: 15
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.subTitle,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: 'red'
  },
  InputContainer: {
    width: '80%',
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: 25
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  stationButton: {
    width: 200,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 80
  },
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.text,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  shareText: {
    color: AppStyles.color.white
  }
});

export default Calendar;
