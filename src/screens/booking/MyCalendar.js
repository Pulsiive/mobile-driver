import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import data from './agenda.json';
import { isSameDay, isSameMonth, isSameYear } from 'date-fns';
import { AppIcon, AppStyles } from '../../AppStyles';
import { useTheme } from '../../AppStyles';

import {
  ButtonCommon,
  ButtonConditional,
  ButtonText,
  FloatingButton,
  ModalSwipeUp,
  Separator,
  TextSubTitle,
  TextTitle
} from '../../components';

const MyCalendar = (props) => {
  const { AppColor } = useTheme();
  const months = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const today = new Date();

  const [navigateDate, setNavigateDate] = useState(props.date.date);
  const [selectedDate, setSelectedDate] = useState(props.date.date);

  useEffect(() => {
    setNavigateDate(props.date.date);
    setSelectedDate(props.date.date);
  }, [props.date]);

  const generateMatrix = () => {
    const matrix = [];
    const year = navigateDate.getFullYear();
    const month = navigateDate.getMonth();
    const firstDay = new Date(year, month, 0).getDay();
    let maxDays = nDays[month];

    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) maxDays += 1;
    }

    let counter = 1;

    for (let row = 1; row < 7; row++) {
      const rowArray = [];

      for (let col = 0; col < 7; col++) {
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          rowArray.push(new Date(year, month, counter++));
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          rowArray.push(new Date(year, month, counter++));
        } else {
          rowArray.push(-1);
        }
      }
      matrix.push(rowArray);
    }
    return matrix;
  };

  const onPressHandler = (item) => {
    setSelectedDate((prevDate) => {
      if (!isExactlySameDay(prevDate, item)) {
        props.onUpdate(new Date(item));
        return new Date(item);
      }
      return prevDate;
    });
  };

  const changeMonth = (n) => {
    if (n === 0) {
      setNavigateDate(new Date(today));
      setSelectedDate(new Date(today));
      props.onUpdate(new Date(today));
    } else {
      setNavigateDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setMonth(prevDate.getMonth() + n);
        return newDate;
      });
    }
  };

  const isExactlySameDay = (date1, date2) => {
    return (
      date2 !== -1 &&
      isSameYear(date1, date2) &&
      isSameMonth(date1, date2) &&
      isSameDay(date1, date2)
    );
  };
  const matrix = generateMatrix();

  const rows = matrix.map((row, rowIndex) => {
    const rowItems = row.map((item, colIndex) => {
      function isNegative(num) {
        return num < 0;
      }

      return (
        <TouchableOpacity
          key={colIndex}
          delayPressIn={0}
          activeOpacity={1}
          onPress={() => onPressHandler(item)}
          style={{
            flex: 1,
            height: 50,
            textAlign: 'center',
            paddingTop: 15,
            backgroundColor: isExactlySameDay(selectedDate, item) ? '#7FCB2B' : AppColor.background,
            borderRadius: isExactlySameDay(selectedDate, item) ? 10 : 0
          }}
        >
          <View key={colIndex}>
            <Text
              style={{
                textAlign: 'center',
                color: isExactlySameDay(selectedDate, item) ? 'white' : AppColor.title,
                fontWeight: isExactlySameDay(selectedDate, item) ? 'bold' : '500'
              }}
            >
              {item === -1 ? '' : item.getDate()}
            </Text>
            {/* show event */}
            <View
              style={{
                display: 'flex',
                marginTop: 5,
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 10,
                  backgroundColor:
                    !isNegative(item) &&
                    props.event.includes(item.toLocaleDateString().split(' ')[0])
                      ? AppColor.title
                      : AppColor.background,
                  display:
                    !isNegative(item) &&
                    props.event.includes(item.toLocaleDateString().split(' ')[0])
                      ? 'flex'
                      : 'none'
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View
        key={rowIndex}
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 25,
          paddingTop: 0,
          paddingBottom: 0,
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {rowItems}
      </View>
    );
  });

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100 + '%'
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
            width: '90%',
            borderBottomWidth: 1,
            borderColor: AppColor.border
          }}
        >
          <FloatingButton
            icon="chevron-left"
            iconColor={AppColor.title}
            style={{
              position: 'relative',
              left: 20,
              width: 35,
              height: 35
            }}
            onPress={() => changeMonth(-1)}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              color: AppColor.title
            }}
          >
            {months[navigateDate.getMonth()]} &nbsp;
            {navigateDate.getFullYear()}
          </Text>
          <FloatingButton
            icon="chevron-right"
            iconColor={AppColor.title}
            style={{
              position: 'relative',
              right: 20,
              width: 35,
              height: 35
            }}
            onPress={() => changeMonth(+1)}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 0 }}>
          {rows}
          <View
            style={{
              backgroundColor: AppColor.border,
              height: 1,
              width: 90 + '%',
              left: 5 + '%',
              marginBottom: 20
            }}
          ></View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: 100 + '%',
              alignItems: 'center',
              bottom: 10
            }}
          >
            <ButtonText style={AppColor.title} title="Aujourd'hui" onPress={() => changeMonth(0)} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MyCalendar;
