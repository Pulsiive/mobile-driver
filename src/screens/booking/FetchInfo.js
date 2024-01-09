import React, {useEffect, useState, useRef, memo} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Image
} from 'react-native';
import { AppIcon } from '../../AppStyles';

const FetchInfo = ({ date, stationId, setSlot, setModalVisible, data, openDate}) => {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const TranslationUp = useRef(new Animated.Value(-20)).current;
  useEffect(()=> {
    console.log(date)
  }, [])

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
      <ScrollView style={{top: -30}}>
        {data[date]?.map((plan) => {
              return (
          <Pressable
              style={{width: '100%'}}
              key={plan.slotId}
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
                ]}
            >
              <View>
                <Text style={styles.name}>{plan.date}</Text>
                <View style={styles.firstRow}>
                  <Image style={styles.rendCalendar} source={AppIcon.images.calendar}></Image>
                  <Text style={styles.Txtduration}>{plan.Hour}</Text>
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
    fontSize: 20,
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
    width: 18,
    height: 16,
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
    fontSize: 18,
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
