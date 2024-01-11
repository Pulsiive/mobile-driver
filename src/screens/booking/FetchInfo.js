import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  Pressable,
  Image,
  ActivityIndicator
} from 'react-native';
import { AppIcon } from '../../AppStyles';
import Backend from '../../db/Backend';

const FetchInfo = ({ date, stationId, setSlot, setModalVisible, data }) => {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const TranslationUp = useRef(new Animated.Value(-20)).current;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setLoading(false);
    } catch (e) {
      alert(e);
    }
  }, [data[date]]);

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
    <View>
      {!loading ? (
        <ScrollView style={{ top: -30 }}>
          {data[date] &&
            data[date]?.map((plan) => {
              console.log(plan);
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
                    style={[plan.isBooked ? styles.itemBookedContainer : styles.itemContainer]}
                    key={plan.slotId}
                  >
                    <View>
                      <Text style={styles.name}>
                        {plan.price} € ({plan.pricePerMin} € / Min)
                      </Text>
                      <View style={styles.firstRow}>
                        <Image style={styles.rendCalendar} source={AppIcon.images.calendar}></Image>
                        <Text style={styles.Txtduration}>
                          {plan.date} - {plan.Hour}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                </Pressable>
              );
            })}
        </ScrollView>
      ) : (
        <ActivityIndicator
          style={{ width: 90 + '%', height: 100 }}
          animating={loading}
        ></ActivityIndicator>
      )}
    </View>
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
