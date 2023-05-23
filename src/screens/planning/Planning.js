import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableHighlight,
  Pressable
} from 'react-native';
import { AppIcon, AppStyles } from '../../AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Backend from '../../db/Backend';
import { Configuration } from '../../Configuration';
import MyCalendar from '../booking/MyCalendar';
import Icon from 'react-native-vector-icons/Entypo';

function Planning({ home }) {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const TranslationUp = useRef(new Animated.Value(-20)).current;
  const [data, setData] = useState({});
  const [date, setDate] = useState('');
  const [dateTemp, setDateTemp] = useState(new Date().toISOString().split('T')[0]);
  let dataArray;
  const [transformedArray, setTransformedArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [fetchStation, setFetchStation] = useState(false);

  useEffect(() => {
    function fillAgendaWithReservations(slot) {
      console.log('filling agenda');
      let isAlreadyInAgenda = false;

      for (let index = 0; index < slot.length; index++) {
        ///////////////////////////////////////////////////////////////////////
        //    Error checking to see if slot is already contained in Agenda    /
        for (const idToCheck in data[slot[index].dateTemp]) {
          if (parseInt(data[slot[index].dateTemp][idToCheck].id) === index)
            isAlreadyInAgenda = true;
        }
        if (isAlreadyInAgenda) {
          isAlreadyInAgenda = false;
          continue;
        }
        ///////////////////////////////////////////////////////////////////////
        if (data[slot[index].dateTemp] === undefined) data[slot[index].dateTemp] = [];
        data[slot[index].dateTemp].push({
          dateTemp: slot[index].dateTemp,
          id: index,
          Hour: slot[index].opensAt + ' -> ' + slot[index].closeAt,
          Name: slot[index].stationId,
          picture:
            'https://thumbs.dreamstime.com/b/jeune-femme-heureuse-de-brunette-avec-le-sourire-%C3%A9tonnant-26038696.jpg',
          content: '',
          isBooked: slot[index].isBooked,
          slotId: slot[index].id
        });
        // console.log('pushed one new object');
      }
      dataArray = Object.values(data);
      setTransformedArray(
        dataArray.map((objects) => {
          return objects.map((obj) => {
            return obj;
          });
        })
      );
    }

    async function fetchReservations() {
      try {
        console.log('Fetching reservation to display');
        const slotParsed = [];
        const res = await Backend.getReservations();
        if (res.status === 200) {
          for (var index = 0; index < res.data.length; index++) {
            slotParsed.push({
              id: res.data[index].id,
              stationId: res.data[index].stationPropertiesId,
              dateTemp: res.data[index].opensAt.split('T')[0],
              opensAt: res.data[index].opensAt.split('T')[1].split('.')[0],
              closeAt: res.data[index].closesAt.split('T')[1].split('.')[0],
              isBooked: res.data[index].isBooked
            });
          }
          fillAgendaWithReservations(slotParsed);
        } else {
          throw res;
        }
      } catch (e) {
        alert(e);
      }
    }
    fetchReservations();
  }, [fetchStation]);

  firstOpacity.setValue(0);
  TranslationUp.setValue(-20);
  Animated.parallel([
    Animated.timing(TranslationUp, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }),

    Animated.timing(firstOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })
  ]).start();

  useEffect(() => {
    setDate(date.toString().split('T')[0]);
    try {
      if (date == '') {
        dataArray = Object.values(data);
        setTransformedArray(
          dataArray.map((objects) => {
            return objects.map((obj) => {
              return obj;
            });
          })
        );
      } else if (data[date] == undefined) {
        setTransformedArray();
      } else {
        setTransformedArray([
          data[date].map((obj) => {
            return obj;
          })
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [date]);

  const onOpen = (open) => {
    setDate(new Date());
    setOpen(!open);
  };

  return (
    <ScrollView style={{ backgroundColor: AppStyles.color.background }}>
      {!home && (
        <View style={{ marginBottom: 17 + '%' }}>
          <Pressable
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              top: 10,
              left: 5 + '%'
            }}
            onPress={() => onOpen(open)}
          >
            <Icon name="calendar" size={50} color="grey" />
          </Pressable>
          <Pressable
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              top: 10,
              left: 25 + '%'
            }}
            onPress={() => setDate('')}
          >
            <Icon name="squared-cross" size={50} color="grey" />
          </Pressable>
          <Pressable
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              top: 10,
              left: 45 + '%'
            }}
            onPress={() => setFetchStation(!fetchStation)}
          >
            <Icon name="retweet" size={50} color="grey" />
          </Pressable>
        </View>
      )}
      {open && (
        <View style={{ marginTop: 10 + '%' }}>
          <MyCalendar
            date={{ date }}
            onChange={(date) => setDate(date)}
            open={(open) => setOpen(open)}
          />
        </View>
      )}
      {transformedArray?.length > 0 ? (
        transformedArray.map((obj) => {
          return obj.map((plan) => {
            if (plan.id === 'undefined') {
              return (
                <View>
                  <Text style={{ color: 'black' }}>Nothing</Text>
                </View>
              );
            } else if (plan.id < 0) {
              return (
                <View>
                  <Text style={{ color: 'black' }}>No reservations yet</Text>
                </View>
              );
            }
            return (
              <View>
                <Animated.View
                  style={[
                    styles.itemBookedContainer,
                    { opacity: firstOpacity, transform: [{ translateY: TranslationUp }] }
                  ]}
                  key={plan.slotId}
                >
                  <View>
                    <Image style={styles.picture} source={{ uri: plan.picture }}></Image>
                    <Text style={styles.name}>{plan.slotId}</Text>
                    <View style={styles.firstRow}>
                      <Image style={styles.rendCalendar} source={AppIcon.images.calendar}></Image>
                      <Text style={styles.Txtduration}>
                        {plan.dateTemp}: {plan.Hour}
                      </Text>
                    </View>
                    <View style={styles.secondRow}>
                      <Image style={styles.rendbill} source={AppIcon.images.bill}></Image>
                      <Text style={styles.Txtbill}>{plan.content}</Text>
                    </View>
                  </View>
                </Animated.View>
              </View>
            );
          });
        })
      ) : (
        <View style={styles.container}>
          <Text style={{ color: 'black' }}>No reservations</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {},
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.background,
    padding: Configuration.home.listing_item.offset
  },
  picture: {
    position: 'absolute',
    right: -130,
    top: -5,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50
  },
  name: {
    color: 'white',
    position: 'absolute',
    fontWeight: '700',
    fontSize: 15,
    top: -20,
    marginLeft: 20
  },
  itemContainer: {
    backgroundColor: '#7FCB2B',
    margin: 5,
    marginTop: 20,
    width: 92 + '%',
    height: 98,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  itemBookedContainer: {
    backgroundColor: 'grey',
    margin: 5,
    marginTop: 10,
    width: 97 + '%',
    height: 98,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  rendCalendar: {
    width: 14,
    height: 11,
    top: 4
  },
  firstRow: {
    top: 10,
    left: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  Txtduration: {
    marginLeft: 10,
    color: 'white'
  },
  secondRow: {
    top: 20,
    left: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  rendbill: {
    width: 14,
    height: 11,
    top: 4
  },
  Txtbill: {
    marginLeft: 10,
    color: 'white'
  },
  modal: {
    backgroundColor: 'white',
    height: '40%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '65%',
    marginLeft: '5%'
  }
});

export default Planning;
