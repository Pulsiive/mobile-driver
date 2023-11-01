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
  Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/Entypo';

import Comment from './comment/Comment';

import style from './style';
import ProfilePicture from '../../components/ProfilePicture';

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
            <Text style={style.h1}>
              {station.properties.isPublic
                ? station.coordinates.address
                : `${station.owner.firstName}'s station `}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                marginBottom: 5
              }}
            >
              <View style={style.iconLabel}>
                <Icon name="star" size={15} color="black" />
                <Text style={style.smallText}>{station.rate}</Text>
              </View>
              <Text style={{ ...style.smallText, marginLeft: 5, marginRight: 5 }}>·</Text>
              <Text style={style.smallText}>
                {station.rates.length} {station.rates.length > 1 ? 'reviews' : 'review'}
              </Text>
            </View>
            {station.properties.isPublic && (
              <Text style={style.smallText}>
                {station.coordinates.address}, {station.coordinates.city}{' '}
                {station.coordinates.postalCode}, France
              </Text>
            )}
          </View>
          <View style={style.divider}>
            <Text style={style.h2}>Station Properties</Text>
            <View style={style.iconLabel}>
              <Icon name="flow-branch" size={28} color="grey" />
              <Text style={style.text}>
                {station.properties.plugTypes.toString().length == 0
                  ? 'no data'
                  : station.properties.plugTypes.toString()}
              </Text>
            </View>
            <View style={style.iconLabel}>
              <Icon name="flash" size={28} color="grey" />
              <Text style={style.text}>{station.properties.maxPower} kWh</Text>
            </View>
            <View style={style.iconLabel}>
              <Icon name="credit" size={28} color="grey" />
              <Text style={style.text}>{station.properties.price} / hour</Text>
            </View>
          </View>
          {!station.properties.isPublic && (
            <View style={style.divider}>
              <Text style={style.h2}>Owner profile</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15
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
                      imageUri: station.owner.profilePictureId,
                      name: `${station.owner.firstName} ${station.owner.lastName}`,
                      userId: station.owner.id
                    })
                  }
                >
                  <ProfilePicture
                    profilePictureId={station.owner.profilePictureId}
                    borderRadius={40}
                  />
                </TouchableOpacity>
              </View>
              <View style={style.iconLabel}>
                <Icon name="star" color="gray" size={28} />
                <Text style={style.text}>{station.owner.receivedRatings.length} reviews</Text>
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
        <View
          style={{ padding: 20, justifyContent: 'center', flexDirection: 'row', elevation: 10 }}
        >
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
        </View>
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

export default StationInformations;
