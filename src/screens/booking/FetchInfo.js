import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  Pressable,
  Image
} from 'react-native';
import { AppIcon } from '../../AppStyles';
import Backend from '../../db/Backend';

const FetchInfo = ({ date, stationId, slot, setSlot, setModalVisible, route, navigation }) => {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const TranslationUp = useRef(new Animated.Value(-20)).current;
  const [data, setData] = useState({});

  useEffect(() => {
    function fillAgendaWithReservations(slot) {
      console.log('filling agenda');
      console.log(slot);
      let isAlreadyInAgenda = false;

      for (let index = 0; index < slot.length; index++) {
        ///////////////////////////////////////////////////////////////////////
        //    Error checking to see if slot is already contained in Agenda    /
        for (const idToCheck in data[slot[index].date]) {
          if (parseInt(data[slot[index].date][idToCheck].id) === index)
            isAlreadyInAgenda = true;
        }
        if (isAlreadyInAgenda) {
          isAlreadyInAgenda = false;
          break;
        }
        ///////////////////////////////////////////////////////////////////////
        if (data[slot[index].date] === undefined) data[slot[index].date] = [];
        data[slot[index].date].push({
          date: slot[index].date,
          id: index,
          Hour: slot[index].opensAt + ' -> ' + slot[index].closeAt,
          Name: slot[index].stationId,
          picture:
            'https://thumbs.dreamstime.com/b/jeune-femme-heureuse-de-brunette-avec-le-sourire-%C3%A9tonnant-26038696.jpg',
          content: '',
          isBooked: slot[index].isBooked,
          slotId: slot[index].id
        });
        console.log('pushed one new object');
      }
      console.log('HERE   ', data[date]);
    }

    async function fetchSlot() {
      try {
        console.log('Fetching station slot reservation to display');
        const slotParsed = [];
        const res = await Backend.getSlots(stationId);

        if (res.status === 200) {
          for (var index = 0; index < res.data.length; index++) {
            slotParsed.push({
              id: res.data[index].id,
              stationId: res.data[index].stationPropertiesId,
              date: res.data[index].opensAt.split('T')[0],
              opensAt: res.data[index].opensAt.split('T')[1].split('.')[0],
              closeAt: res.data[index].closesAt.split('T')[1].split('.')[0],
              isBooked: res.data[index].isBooked
            });
          }
          console.log('slotParsed: ', slotParsed);
          fillAgendaWithReservations(slotParsed);
        } else {
          throw res;
        }
      } catch (e) {
        alert(e);
      }
    }
    fetchSlot();
  }, []);

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

  return (
    <ScrollView style={{ top: -30 }}>
      {data[date] && data[date]?.map((plan) => {
        if (plan.id === 'undefined') {
          return (
            <View>
              <Text style={{ color: 'white' }}>Nothing</Text>
            </View>
          );
        } else if (plan.id < 0) {
          return <View></View>;
        }
        return (
          <Pressable
            style={{ width: '100%' }}
            onPress={() => {
              if (plan.isBooked) {
                return;
              }
              setSlot(plan);
              setModalVisible(true);
            }}
          >
            <Animated.View
              style={[
                plan.isBooked ? styles.itemBookedContainer : styles.itemContainer,
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
                    {plan.date} - {plan.Hour}
                  </Text>
                </View>
                <View style={styles.secondRow}>
                  <Image style={styles.rendbill} source={AppIcon.images.bill}></Image>
                  <Text style={styles.Txtbill}>{plan.content}</Text>
                </View>
              </View>
            </Animated.View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safe: {},
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
    marginTop: 20,
    width: 92 + '%',
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

export default FetchInfo;
