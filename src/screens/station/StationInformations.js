import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PermissionsAndroid,
  Modal,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Touchable
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Carousel from 'react-native-snap-carousel';

import api from '../../db/Api';

import { AppIcon, AppStyles } from '../../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';

const CommentPicture = ({ pictureId }) => {
  const [imageIsOpen, setImageIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setImageIsOpen(true)} style={{ justifyContent: 'center' }}>
        <Image
          source={{ uri: `https://ucarecdn.com/${pictureId}/` }}
          style={{ aspectRatio: 3 / 2, height: undefined, width: '90%' }}
        />
      </TouchableOpacity>
      <Modal
        animationType={'fade'}
        visible={imageIsOpen}
        onRequestClose={() => setImageIsOpen(false)}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%'
          }}
        >
          <Image
            source={{ uri: `https://ucarecdn.com/${pictureId}/` }}
            style={{ width: '100%', height: undefined, aspectRatio: 1 }}
          />
        </View>
      </Modal>
    </View>
  );
};

const UserComment = ({ item, userId, displayPictures, customStyle = {} }) => {
  const [comment, setComment] = useState(item);

  const [userLikedComment, setUserLikedComment] = useState(
    comment.likedBy.find((user) => user.id === userId) === undefined ? false : true
  );
  const [userDislikedComment, setUserDislikedComment] = useState(
    comment.dislikedBy.find((user) => user.id === userId) === undefined ? false : true
  );

  const likeComment = async () => {
    if (!userLikedComment) {
      const res = await api.send('POST', `/api/v1/station/rate/like/${comment.id}`);
      if (res.status !== -1) {
        setComment({
          ...comment,
          likedBy: [...comment.likedBy, userId],
          likes: comment.likes + 1,
          dislikes: userDislikedComment ? comment.dislikes - 1 : comment.dislikes
        });
        setUserLikedComment(true);
        setUserDislikedComment(false);
      } else {
        showMessage({
          message: `Failed to like the comment.`,
          type: 'danger',
          duration: 2200
        });
      }
    }
  };

  const dislikeComment = async () => {
    if (!userDislikedComment) {
      const res = await api.send('POST', `/api/v1/station/rate/dislike/${comment.id}`);
      if (res.status !== -1) {
        setComment({
          ...comment,
          dislikedBy: [...comment.dislikedBy, userId],
          dislikes: comment.dislikes + 1,
          likes: userLikedComment ? comment.likes - 1 : comment.likes
        });
        setUserLikedComment(false);
        setUserDislikedComment(true);
      } else {
        showMessage({
          message: `Failed to dislike the comment.`,
          type: 'danger',
          duration: 2200
        });
      }
    }
  };

  return (
    <View
      style={{
        ...customStyle,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <View style={{ flexDirection: 'row', alignContent: 'center', marginBottom: 10 }}>
          <View style={{ width: '25%' }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 30 }}
              source={AppIcon.images.userProfilePicture}
            />
          </View>
          <View style={{ width: '70%', flexDirection: 'column' }}>
            <Text style={{ ...style.text, fontWeight: 'bold' }}>
              {comment.author.firstName} {comment.author.lastName}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ ...style.text, color: 'gray' }}>
                {comment.date.slice(0, comment.date.indexOf('T'))}
              </Text>
              <View style={style.iconLabel}>
                <Icon name="star" size={15} color="black" />
                <Text style={style.smallText}>{comment.rate}</Text>
              </View>
            </View>
          </View>
        </View>
        {comment.comment && <Text style={style.text}>{comment.comment}</Text>}
      </View>
      {comment.pictures && displayPictures && (
        <View style={{ marginTop: 5, marginBottom: 5 }}>
          <Carousel
            layout="default"
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 60}
            data={comment.pictures}
            renderItem={({ item }) => <CommentPicture pictureId={item} />}
          />
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View style={style.iconLabel}>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={likeComment}>
            <Icon
              name="thumbs-up"
              size={20}
              color={userLikedComment ? AppStyles.color.main : 'gray'}
            />
          </TouchableOpacity>
          <Text style={style.smallText}>{comment.likes}</Text>
        </View>
        <View style={style.iconLabel}>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={dislikeComment}>
            <Icon
              name="thumbs-down"
              size={20}
              color={userDislikedComment ? AppStyles.color.main : 'gray'}
            />
          </TouchableOpacity>
          <Text style={style.smallText}>{comment.dislikes}</Text>
        </View>
      </View>
    </View>
  );
};

function ReviewsModal({ visible, station, userId, onClose }) {
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
              <Text style={style.h2}>4.75</Text>
            </View>
            <Text style={{ ...style.h2, marginLeft: 5, marginRight: 5 }}>·</Text>
            <Text style={style.h2}>{station.rates.length} reviews</Text>
          </View>
        </View>
        <View style={{ padding: 15, flex: 1 }}>
          <FlatList
            data={station.rates}
            renderItem={({ item }) => (
              <UserComment
                item={item}
                userId={userId}
                displayPictures
                customStyle={style.divider}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const CarouselReview = ({ item, userId }) => {
  return (
    <View
      style={{
        borderColor: 'gray',
        borderWidth: 0.8,
        borderRadius: 15
      }}
    >
      <UserComment
        item={item}
        userId={userId}
        displayPictures={false}
        customStyle={{ height: 180 }}
      />
    </View>
  );
};

function StationInformations({ route, navigation }) {
  const { station, userProfile } = route.params;
  const [reviewsModalIsOpen, setReviewsModalIsOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={style.container}>
          <View style={style.divider}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
              <Icon name="chevron-left" color="gray" size={25} />
            </TouchableOpacity>
            <Text style={style.h1}>{station.public ? station.address : 'Station de Thomas'}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                marginBottom: 5
              }}
            >
              <View style={style.iconLabel}>
                <Icon name="star" size={15} color="black" />
                <Text style={style.smallText}>{station.rating}</Text>
              </View>
              <Text style={{ ...style.smallText, marginLeft: 5, marginRight: 5 }}>·</Text>
              <Text style={style.smallText}>{station.rates.length} reviews</Text>
            </View>
            {station.public && (
              <Text style={style.smallText}>
                {station.address}, {station.city} {station.postalCode}, France
              </Text>
            )}
          </View>
          <View style={style.divider}>
            <Text style={style.h2}>Station Properties</Text>
            <View style={style.iconLabel}>
              <Icon name="flow-branch" size={28} color="grey" />
              <Text style={style.text}>{station.type == undefined ? 'no data' : station.type}</Text>
            </View>
            <View style={style.iconLabel}>
              <Icon name="flash" size={28} color="grey" />
              <Text style={style.text}>{station.voltage} kWh</Text>
            </View>
            <View style={style.iconLabel}>
              <Icon name="credit" size={28} color="grey" />
              <Text style={style.text}>{station.pricing} / hour</Text>
            </View>
          </View>
          {station.rates.length > 0 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline'
                }}
              >
                <View style={style.iconLabel}>
                  <Icon name="star" size={20} color="black" />
                  <Text style={style.h2}>4.75</Text>
                </View>
                <Text style={{ ...style.h2, marginLeft: 5, marginRight: 5 }}>·</Text>
                <Text style={style.h2}>{station.rates.length} reviews</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Carousel
                  layout="default"
                  data={station.rates.slice(0, 3)}
                  renderItem={({ item }) => <CarouselReview item={item} userId={userProfile.id} />}
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
                  See {station.rates.length} reviews
                </Text>
              </TouchableOpacity>
            </View>
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
              navigation.navigate(station.public ? 'StationRating' : 'BookingPlanning', {
                stationId: station.id
              })
            }
          >
            <Text style={style.buttonText}>{station.public ? 'Rate' : 'Rent'}</Text>
          </TouchableOpacity>
        </View>
        <ReviewsModal
          visible={reviewsModalIsOpen}
          onClose={() => setReviewsModalIsOpen(false)}
          station={station}
          userId={userProfile.id}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 30
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingBottom: 15,
    marginBottom: 20
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 20
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 15
  },
  text: {
    color: 'black',
    fontSize: 16
  },
  smallText: {
    color: 'black',
    fontSize: 14
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  button: {
    backgroundColor: AppStyles.color.main,
    borderRadius: 5,
    height: 35,
    width: '50%',
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
});

export default StationInformations;
