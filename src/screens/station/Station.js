import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';
import api from '../../db/Api';

function Station({ ownerId }) {
  const [stations, setStations] = useState([]);
  const navigation = useNavigation();

  console.log('OWNER:', ownerId);
  useEffect(() => {
    try {
      api.send('GET', `/api/v1/stations/private/user/${ownerId}`).then((data) => {
        setStations(data.data.stations);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const StationCard = (props) => {
    console.log(JSON.stringify(props, null, '\t'));
    return (
      <View style={styles.container}>
        <Text style={styles.stationTitle}>{props.item.coordinates.address}</Text>
        <View style={styles.description}>
          <Text style={styles.textDescription}>Type: {props.item.properties.plugTypes}</Text>
          <Text style={styles.textDescription}>Power: {props.item.properties.maxPower} kW</Text>
          <Text style={styles.textDescription}>
            Price: {props.item.properties.price / 100} €/ minute
          </Text>
          <Text style={styles.textDescription}>
            Charger(s): {props.item.properties.nbChargingPoints}
          </Text>
        </View>
        <Button
          onPress={() => navigation.navigate('BookingPlanning', { stationId: props.item.id })}
          containerStyle={styles.bookButton}
          style={styles.bookText}
        >
          Book
        </Button>
      </View>
    );
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        data={stations}
        renderItem={StationCard}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true
        })}
        scrollEventThrottle={16}
        snapToInterval={Dimensions.get('window').width * 0.83333}
        decelerationRate={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.83333,
    paddingLeft: Dimensions.get('window').width * 0.055
  },
  stationTitle: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.grey,
    marginTop: 20,
    alignSelf: 'center'
  },
  description: {
    alignItems: 'center'
  },
  textDescription: {
    fontSize: 18,
    paddingTop: 20,
    fontWeight: '200',
    color: 'white'
  },
  bookButton: {
    width: Dimensions.get('window').width * 0.5,
    backgroundColor: AppStyles.color.pulsive,
    borderRadius: 25,
    padding: 10,
    marginTop: 30
  },
  bookText: {
    color: AppStyles.color.white
  }
});

export default Station;
