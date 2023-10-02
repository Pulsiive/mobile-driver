import React, { useState } from 'react';
import {
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/Entypo';

import Comment from './comment/Comment';

import style from './style';
import * as Animatable from 'react-native-animatable';

function ReviewsModal({ visible, station, onClose, navigation }) {
  return (
    <SafeAreaView style={{ width: '100%', backgroundColor: 'white' }}>
      <Modal animationType="slide" visible={visible} onRequestClose={() => onClose()}>
        <View
          style={{
            paddingTop: 15,
            paddingLeft: 20,
            paddingRight: 20,
            elevation: 5,
            backgroundColor: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray'
          }}
        >
          <TouchableOpacity onPress={() => onClose()} style={{ marginBottom: 10 }}>
            <Icon name="chevron-left" color="gray" size={25} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline'
            }}
          >
            <View style={style.iconLabel}>
              <Icon name="star" size={20} color="black" />
              <Text style={style.h2}>{station.rate}</Text>
            </View>
            <Text style={{ ...style.h2, marginLeft: 5, marginRight: 5 }}>·</Text>
            <Text style={style.h2}>
              {station.rates.length} {station.rates.length > 1 ? 'reviews' : 'review'}
            </Text>
          </View>
        </View>
        <View style={{ padding: 15, flex: 1 }}>
          <FlatList
            data={station.rates}
            renderItem={({ item }) => (
              <Comment
                item={item}
                displayPictures
                displayResponses
                customStyle={item.responses.length > 0 ? undefined : style.divider}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const CarouselReview = ({ item, navigation }) => {
  return (
    <View
      style={{
        borderColor: 'gray',
        borderWidth: 0.8,
        borderRadius: 15
      }}
    >
      <Comment
        item={item}
        displayPictures={false}
        displayResponses={false}
        navigation={navigation}
      />
    </View>
  );
};

function StationInformations({ route, navigation }) {
  const { station } = route.params;
  const [reviewsModalIsOpen, setReviewsModalIsOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={style.container}>
          <View style={style.divider}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
              <Icon name="chevron-left" color="gray" size={25} />
            </TouchableOpacity>

              <View style={styles.stationCardContainer}>
                <View style={styles.stationCard}>
                  {/* Station Name and Details */}
                  <Text style={styles.stationName}>
                    {station.properties.isPublic
                      ? station.coordinates.address
                      : `${station.owner.firstName}'s station `}
                  </Text>
                  <View style={styles.stationRating}>
                    <View style={styles.iconLabel}>
                      <Icon name="star" size={15} color="black" />
                      <Text style={styles.smallText}>{station.rate}</Text>
                    </View>
                    <Text style={{ ...styles.smallText, marginLeft: 5, marginRight: 5 }}>·</Text>
                    <Text style={styles.smallText}>
                      {station.rates.length} {station.rates.length > 1 ? 'reviews' : 'review'}
                    </Text>
                  </View>
                  {station.properties.isPublic && (
                    <Text style={styles.stationAddress}>
                      {station.coordinates.address}, {station.coordinates.city}{' '}
                      {station.coordinates.postalCode}, France
                    </Text>
                  )}
                </View>
              </View>


          </View>
          <View style={style.divider}>

            <View style={styles.stationPropertiesContainer}>
              <View style={styles.stationCard}>
                {/* Station Properties */}
                <Text style={styles.stationPropertiesTitle}>Station Properties</Text>
                <View style={styles.iconLabel}>
                  <Icon name="flow-branch" size={28} color="grey" />
                  <Text style={styles.propertyText}>
                    {station.properties.plugTypes.toString().length == 0
                      ? 'no data'
                      : station.properties.plugTypes.toString()}
                  </Text>
                </View>
                <View style={styles.iconLabel}>
                  <Icon name="flash" size={28} color="grey" />
                  <Text style={styles.propertyText}>{station.properties.maxPower} kWh</Text>
                </View>
                <View style={styles.iconLabel}>
                  <Icon name="credit" size={28} color="grey" />
                  <Text style={styles.propertyText}>{station.properties.price} / hour</Text>
                </View>
              </View>
            </View>

          </View>
          {!station.properties.isPublic && (
            <View style={style.divider}>
              
              <View style={styles.ownerCard}>
                <Text style={style.h2}>Owner profile</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15,
                  }}
                >
                  <View style={{ width: '70%', flexDirection: 'column' }}>
                    <Text style={style.h3}>
                      {station.owner.firstName} {station.owner.lastName}
                    </Text>
                    <Text style={style.smallText}>
                      {station.owner.emailVerifiedAt ? 'Verified' : 'Not verified'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ width: '30%', alignItems: 'center' }}
                    onPress={() =>
                      navigation.navigate('Owner', {
                        imageUri: `https://ucarecdn.com/${station.owner.profilePictureId}/`,
                        name: `${station.owner.firstName} ${station.owner.lastName}`,
                        userId: station.owner.id,
                      })
                    }
                  >
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 40 }}
                      source={{ uri: `https://ucarecdn.com/${station.owner.profilePictureId}/` }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={style.iconLabel}>
                  <Icon name="star" color="gray" size={28} />
                  <Text style={style.text}>{station.owner.receivedRatings.length} reviews</Text>
                </View>
              </View>

            </View>
          )}
          {station.rates.length > 0 ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline'
                }}
              >
                <View style={style.iconLabel}>
                  <Icon name="star" size={20} color="black" />
                  <Text style={style.h2}>{station.rate}</Text>
                </View>
                <Text style={{ ...style.h2, marginLeft: 5, marginRight: 5 }}>·</Text>
                <Text style={style.h2}>
                  {station.rates.length} {station.rates.length > 1 ? 'reviews' : 'review'}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Carousel
                  layout="default"
                  data={station.rates.slice(0, 3)}
                  renderItem={({ item }) => <CarouselReview item={item} navigation={navigation} />}
                  itemWidth={Dimensions.get('screen').width - 100}
                  sliderWidth={Dimensions.get('screen').width}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  marginTop: 15,
                  borderColor: 'black',
                  borderWidth: 1,
                  paddingVertical: 10,
                  borderRadius: 10
                }}
                onPress={() => setReviewsModalIsOpen(true)}
              >
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    alignSelf: 'center'
                  }}
                >
                  See {station.rates.length} {station.rates.length > 1 ? 'reviews' : 'review'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={style.h3}>No reviews for now</Text>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          borderTopColor: 'gray',
          borderTopWidth: 1,
          height: '10%',
          width: '100%'
        }}
      >
        <Animatable.View animation="pulse" iterationCount="infinite" style={{ padding: 20, justifyContent: 'center', flexDirection: 'row', elevation: 10 }}>
          <TouchableOpacity
            style={style.button}
            onPress={() =>
              navigation.navigate(
                station.properties.isPublic ? 'StationRating' : 'BookingPlanning',
                {
                  stationId: station.id
                }
              )
            }
          >
            <Text style={style.buttonText}>{station.properties.isPublic ? 'Rate' : 'Rent'}</Text>
          </TouchableOpacity>
        </Animatable.View>

        <ReviewsModal
          visible={reviewsModalIsOpen}
          onClose={() => setReviewsModalIsOpen(false)}
          station={station}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stationCardContainer: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, // Android shadow
  },
  stationCard: {
    padding: 15,
  },
  stationName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stationRating: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 5,
  },
  stationAddress: {
    marginTop: 10,
    color: 'gray',
  },
  stationPropertiesContainer: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, // Android shadow
  },
  stationPropertiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  propertyText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'grey',
  },
  ownerCard: {
    backgroundColor: 'lightgrey', // Clear grey background color
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, // Android shadow
  },
});


export default StationInformations;
