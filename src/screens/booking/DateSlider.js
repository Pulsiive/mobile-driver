import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {
  addDays,
  getDate,
  startOfWeek,
  format,
  isSameDay,
} from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fr } from 'date-fns/locale';
import MyCalendar from './MyCalendar';
import FetchInfo from './FetchInfo';
import { useTheme } from '../../AppStyles';
import { AppIcon } from '../../AppStyles';
import Backend from "../../db/Backend";

const DateSlider = ({ date, stationId, setSlot, setModalVisible, onChange }) => {
  const { AppColor } = useTheme();

  const [week, setWeek] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState([]);
  const changeParentProps = (newPropValue) => {
    onChange(newPropValue);
  };

  useEffect(() => {
    let weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);
  //
  // useEffect(() => {
  //   const iso = new Date(date1);
  //   var weekDays = getWeekDays(iso);
  //   setWeek(weekDays);
  // }, [date1]);
  //   let datesArray;

    useEffect(() => {
        async function fetchSlot() {
            try {
                const res = await Backend.getSlots(stationId);
                const datesArray = res.data.map(item => item.opensAt.split('T')[0]);
                setOpenDate(datesArray);
                // console.log(openDate)
            } catch (error) {
                console.error('Error fetching slot information:', error);
            }
        }

        fetchSlot();
    }, [stationId]);


    return (
      <>
        <View style={styles.container}>
          {week.map((weekDay) => {
            const touchable = [styles.touchable];
              const weekDayText = [styles.weekDayText]
              const indication = [{backgroundColor: AppColor.background}]
            const label = [styles.label]
            const sameDay = isSameDay(weekDay.date, date);
            const eventDay = openDate.includes(weekDay.date.toISOString().split('T')[0]);
            if (sameDay) {
              touchable.push({backgroundColor:'#7FCB2B'});
              weekDayText.push({color: 'white'});
              label.push({color: 'white'});
            }
            if (eventDay) {
                  indication.push({backgroundColor: AppColor.title})
            }
            return (
                <View style={styles.weekDayItem} key={weekDay.formatted}>
                  <TouchableOpacity activeOpacity={sameDay ? 1 : 0.7} onPress={() => {!sameDay && onChange(weekDay.date)}} style={touchable}>
                    <Text style={[{color: AppColor.title}, ...label ]}>
                      {weekDay.day}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[{color: AppColor.title}, ...weekDayText]}>
                    {weekDay.formatted.slice(0, -1)}
                  </Text>
                    <View style={[{position:'absolute', bottom: 5, height:5, width: 5, borderRadius: 100}, ...indication]}></View>
                </View>
            );
          })}
        </View>
        <View style={{
          position: 'absolute',
          top: 30 + '%',
          left: 2 + '%',
        }}>
        <TouchableOpacity
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
            }}
            onPress={() => setOpen(!open)}
        >
          <ImageBackground
              source={AppIcon.images.arrowRight}
              style={{
                transform: open ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }],
                width: 12,
                height: 21,
              }}
          ></ImageBackground>
        </TouchableOpacity>
        </View>

        {open && (
            <View style={{ marginTop: 20 + '%' }}>
              <MyCalendar onUpdate={changeParentProps} event={openDate} date={{ date }} open={() => setOpen(open)} />
            </View>
        )}
        <View style={{ top: 7 + '%' }}>
          <View>
            <Text
                style={{ color: AppColor.title, fontWeight: '700', left: 4 + '%', marginTop: 0 + '%' }}
            >
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

const styles = {
  safe: {
    left: 3 + '%',
    marginTop: 10 + '%',
  },
  container: {
    transform: [{ scale: 0.95 }],
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  weekDayText: {
    position: 'absolute',
    marginTop: 40,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  touchable: {
    borderRadius: 10,
    paddingTop: 9,
    height: 70,
    width: 50,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedLabel: {
    fontWeight: '600',
  },
  weekDayItem: {
    alignItems: 'center',
  },
};

const getWeekDays = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, 'EEE', { locale: fr }),
      date,
      day: getDate(date),
    });
  }
  return final;
};

export default DateSlider;
