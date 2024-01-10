import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { addDays, getDate, startOfWeek, format, isSameDay } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fr } from 'date-fns/locale';
import MyCalendar from './MyCalendar';
import FetchInfo from './FetchInfo';
import { useTheme } from '../../AppStyles';
import { AppIcon } from '../../AppStyles';

const DateSlider = ({ date, stationId, setSlot, setModalVisible, onChange, openDate, data }) => {
  const { AppColor } = useTheme();

  const [week, setWeek] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const changeParentProps = (newPropValue) => {
    onChange(newPropValue);
  };

  useEffect(() => {
    let weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);
  return (
    <>
      <View style={styles.container}>
        {week.map((weekDay) => {
          // console.log(weekDay)
          const touchable = [styles.touchable];
          const weekDayText = [styles.weekDayText];
          const indication = [{ backgroundColor: AppColor.background }];
          const label = [styles.label];
          const sameDay = isSameDay(weekDay.date, date);
          const selectedDay = new Date(weekDay.date).toLocaleDateString().split(' ')[0];
          const eventDay = openDate.includes(selectedDay);
          if (sameDay) {
            touchable.push({ backgroundColor: '#7FCB2B' });
            weekDayText.push({ color: 'white' });
            label.push({ color: 'white' });
            indication.push({ backgroundColor: '#7FCB2B' });
          }
          if (eventDay) {
            indication.push({ backgroundColor: AppColor.title });
          }
          return (
            <View style={styles.weekDayItem} key={weekDay.formatted}>
              <TouchableOpacity
                activeOpacity={sameDay ? 1 : 0.7}
                onPress={() => {
                  !sameDay && onChange(weekDay.date);
                }}
                style={touchable}
              >
                <Text style={[{ color: AppColor.title }, ...label]}>{weekDay.day}</Text>
              </TouchableOpacity>
              <Text style={[{ color: AppColor.title }, ...weekDayText]}>
                {weekDay.formatted.slice(0, -1)}
              </Text>
              <View
                style={[
                  {
                    position: 'absolute',
                    bottom: 5,
                    height: 5,
                    width: 5,
                    borderRadius: 100
                  },
                  ...indication
                ]}
              ></View>
            </View>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'android' ? 40 + '%' : 30 + '%',
          left: 2 + '%'
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50
          }}
          onPress={() => setOpen(!open)}
        >
          <ImageBackground
            source={AppIcon.images.arrowRight}
            style={{
              transform: open ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }],
              width: 12,
              height: 21
            }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>

      {open && (
        <View style={{ marginTop: 20, top: 50, height: 350 }}>
          <View
            style={{
              backgroundColor: AppColor.border,
              height: 1,
              width: '90%',
              left: '5%',
              marginBottom: 15
            }}
          ></View>
          <MyCalendar
            onUpdate={changeParentProps}
            event={openDate}
            date={{ date }}
            open={() => setOpen(open)}
          />
          <View
            style={{
              backgroundColor: AppColor.border,
              height: 1,
              width: '90%',
              left: '5%',
              marginBottom: 15
            }}
          ></View>
        </View>
      )}

      <View style={{ top: 10 + '%' }}>
        <View>
          <Text style={{ color: AppColor.title, fontWeight: '700', left: 4 + '%' }}>
            Créneaux disponible:
          </Text>
        </View>
      </View>
      {openDate.includes(date.toLocaleDateString().split(' ')[0]) ? (
        <View style={styles.safe}>
          <FetchInfo
            date={date.toLocaleDateString().split(' ')[0]}
            data={data}
            stationId={stationId}
            setSlot={setSlot}
            setModalVisible={setModalVisible}
            openDate={openDate}
          />
        </View>
      ) : (
        <View
          style={{
            top: 100,
            height: '40%',
            width: '93%',
            left: '5%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: AppColor.title, fontWeight: '600' }}>
            Pas de créneaux disponibles aujourd'hui !
          </Text>
        </View>
      )}
    </>
  );
};

const styles = {
  safe: {
    left: 3 + '%',
    marginTop: 30 + '%'
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
  label: {
    fontSize: 14,
    textAlign: 'center'
  },
  selectedLabel: {
    fontWeight: '600'
  },
  weekDayItem: {
    alignItems: 'center'
  }
};

const getWeekDays = (date) => {
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
