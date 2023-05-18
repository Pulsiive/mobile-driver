import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { LocaleConfig } from 'react-native-calendars';
import { useRoute } from '@react-navigation/native';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: [
    'Janv',
    'Févr',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sept',
    'Oct',
    'Nov',
    'Déc'
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'fr';

function Booking(props) {
  let date = '2022-07-24';
  const { charger } = useRoute().params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{charger.name}</Text>
      {/* <Text style={[styles.title, styles.leftTitle]}>Choose your date</Text> */}
      <View>
        <Calendar
          style={{ width: 300 }}
          initialDate={'2022-07-21'}
          minDate={'2022-07-21'}
          maxDate={'2022-08-21'}
          onDayPress={(day) => {
            date = day.dateString;
            console.log('selected day', day, date);
          }}
          monthFormat={'yyyy MM'}
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          firstDay={1}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableAllTouchEventsForDisabledDays={true}
          // renderHeader={(date) => {
          //   /*Return JSX*/
          // }}
          markingType={'period'}
          markedDates={{
            '2022-07-21': { startingDay: true, color: AppStyles.color.tint, textColor: 'white' },
            '2022-07-22': { color: AppStyles.color.tint, textColor: 'white' },
            '2022-07-23': { color: AppStyles.color.tint, textColor: 'white' },
            '2022-07-24': {
              color: AppStyles.color.tint,
              textColor: 'white',
              marked: true,
              dotColor: 'white'
            },
            '2022-07-25': { endingDay: true, color: AppStyles.color.tint, textColor: 'white' }
            // date: { marked: true, dotColor: 'black' }
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          paddingTop: 30,
          fontWeight: 'bold',
          color: AppStyles.color.text
        }}
      >
        You selected: {date}
      </Text>
      <Text
        style={{
          fontSize: 20,
          paddingTop: 10,
          fontWeight: 'bold',
          color: AppStyles.color.text
        }}
      >
        price: {charger.pricing}€/h
      </Text>
      <Button
        containerStyle={styles.shareButton}
        style={styles.shareText}
        onPress={() => Alert.alert('You booked this station !')}
      >
        Book this station
      </Button>
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
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 50
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 20,
    marginBottom: 15
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
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
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  shareText: {
    color: AppStyles.color.white
  }
});

export default Booking;
