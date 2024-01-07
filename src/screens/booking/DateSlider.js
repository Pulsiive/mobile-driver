import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableHighlight, ImageBackground} from 'react-native';
import { addDays, getDate, startOfWeek, format, isSameDay } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fr } from 'date-fns/locale';
import MyCalendar from './MyCalendar';
import FetchInfo from './FetchInfo';
import { useTheme} from '../../AppStyles';
import { AppIcon } from '../../AppStyles';



const DateSlider = ({ date, stationId, setSlot, setModalVisible, onChange }) => {
  const { AppColor } = useTheme();

  const [date1, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    var weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);
  useEffect(() => {
    const iso = new Date(date1);
    var weekDays = getWeekDays(iso);
    setWeek(weekDays);
  }, [date1]);

  return (
    <>
      <View style={styles.container}>
        {week.map((weekDay) => {
          const textStyles = [{color: AppColor.title, ...styles.label}];
          const touchable = [styles.touchable];
          const sameDay = isSameDay(weekDay.date, date);
          if (sameDay) {
            touchable.push(styles.selectedTouchable);
            textStyles.push(styles.selectedLabel);
          }
          return (
            <View style={styles.weekDayItem} key={weekDay.formatted}>
              <TouchableOpacity onPress={() => onChange(weekDay.date)} style={touchable}>
                <Text style={{color: AppColor.color, ...styles.label}}>{weekDay.day}</Text>
              </TouchableOpacity>
              <Text style={{color: AppColor.title, ...styles.weekDayText}}>{weekDay.formatted.slice(0, -1)}</Text>
            </View>
          );
        })}
      </View>
      <TouchableHighlight style={{position:'absolute', top:30+'%', left:2+'%', justifyContent:'center', alignItems:'center', width:50, height:50,}} onPress={() => setOpen(!open)}>
        <ImageBackground source={AppIcon.images.arrowRight} style={{transform: open ? [{rotate:'-90deg'}] :  [{rotate:'90deg'}], width:12,height:21,}}></ImageBackground>
      </TouchableHighlight>
      {open && (
        <View style={{ marginTop: 20 + '%' }}>
          <MyCalendar
            date={{ date }}
            onChange={(date) => setDate(date)}
            open={(open) => setOpen(open)}
          />
        </View>
      )}
      <View style={{ top: 7 + '%' }}>
        <View>
          <Text style={{ color: AppColor.title, fontWeight: '700', left: 4 + '%', marginTop: 0 + '%' }}>
            Créneaux disponible:
          </Text>
        </View>
        <View style={styles.safe}>
          <FetchInfo
            date={date.toISOString().split('T')[0]}
            stationId={stationId}
            setSlot={setSlot}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    left: 3 + '%',
    marginTop: 10 + '%'
  },
  container: {
    transform: [{ scale: 0.95 }],
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200
  },
  weekDayText: {
    position: 'absolute',
    marginTop: 40,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  touchable: {
    borderRadius: 10,
    paddingTop: 9,
    height: 70,
    width: 50
  },
  selectedTouchable: {
    backgroundColor: '#7FCB2B'
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedLabel: {
    fontWeight: '600'
  },
  weekDayItem: {
    alignItems: 'center'
  }
});

export const getWeekDays = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, 'EEE', { locale: fr }),
      date,
      day: getDate(date)
    });
  }
  return final;
};

export default DateSlider;
