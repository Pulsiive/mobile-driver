import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Carousel from 'react-native-snap-carousel';

import api from '../../../db/Api';

import { AppStyles } from '../../../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';
import CommentPicture from './CommentPicture';

import style from '../style';
import UserListModal from './UserListModal';

import { getUser, useUserUpdate } from '../../../contexts/UserContext';

const CommentBody = ({ comment, children, displayPictures, customStyle, isResponse }) => {
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
          <View style={{ width: '20%' }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 30 }}
              source={{ uri: `https://ucarecdn.com/${comment.author.profilePictureId}/` }}
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
              {!isResponse ? (
                <View style={style.iconLabel}>
                  <Icon name="star" size={15} color="black" />
                  <Text style={style.smallText}>{comment.rate}</Text>
                </View>
              ) : (
                <Text style={style.smallText}>Owner</Text>
              )}
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
      {children}
    </View>
  );
};

const Comment = ({ item, navigation, displayPictures, displayResponses, customStyle = {} }) => {
  const user = getUser();
  const updateUser = useUserUpdate();

  const [comment, setComment] = useState(item);

  const [userLikedComment, setUserLikedComment] = useState(
    user.likedRatings.find((rating) => rating.id === item.id) !== undefined
  );
  const [userDislikedComment, setUserDislikedComment] = useState(
    user.dislikedRatings.find((rating) => rating.id === item.id) !== undefined
  );

  const [likedByModalIsOpen, setLikedByModalIsOpen] = useState(false);
  const [dislikedByModalIsOpen, setDislikedByModalIsOpen] = useState(false);

  const likeComment = async () => {
    if (!userLikedComment) {
      const res = await api.send('POST', `/api/v1/station/rate/like/${comment.id}`);
      if (res.status !== -1) {
        updateUser({
          likedRatings: [...user.likedRatings, comment],
          dislikedRatings: user.dislikedRatings.filter(({ id }) => id !== comment.id)
        });
        setComment({
          ...comment,
          likedBy: [...comment.likedBy, user.id],
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
        updateUser({
          dislikedRatings: [...user.dislikedRatings, comment],
          likedRatings: user.likedRatings.filter(({ id }) => id !== comment.id)
        });
        setComment({
          ...comment,
          dislikedBy: [...comment.dislikedBy, user.id],
          dislikes: comment.dislikes + 1,
          likes: userLikedComment ? comment.likes - 1 : comment.likes
        });
        setUserDislikedComment(true);
        setUserLikedComment(false);
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
    <View>
      <CommentBody comment={item} displayPictures={displayPictures} customStyle={customStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
          <View style={style.iconLabel}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={likeComment}>
              <Icon
                name="thumbs-up"
                size={20}
                color={userLikedComment ? AppStyles.color.main : 'gray'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLikedByModalIsOpen(true)}>
              <Text
                style={{ ...style.smallText, borderBottomColor: 'black', borderBottomWidth: 0.7 }}
              >
                {comment.likes} likes
              </Text>
            </TouchableOpacity>
          </View>
          <View style={style.iconLabel}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={dislikeComment}>
              <Icon
                name="thumbs-down"
                size={20}
                color={userDislikedComment ? AppStyles.color.main : 'gray'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDislikedByModalIsOpen(true)}>
              <Text
                style={{ ...style.smallText, borderBottomColor: 'black', borderBottomWidth: 0.7 }}
              >
                {comment.dislikes} dislikes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CommentBody>

      {displayResponses &&
        comment.responses &&
        comment.responses.map((response) => {
          return (
            <View style={style.divider}>
              <CommentBody
                comment={response}
                displayPictures={false}
                isResponse
                customStyle={{ marginLeft: 50 }}
              />
            </View>
          );
        })}
      {likedByModalIsOpen && (
        <UserListModal
          users={item.likedBy}
          onClose={() => setLikedByModalIsOpen(false)}
          modalTitle={`${item.likedBy.length} likes`}
          modalSubTitle="Liked by"
          navigation={navigation}
        />
      )}
      {dislikedByModalIsOpen && (
        <UserListModal
          users={item.dislikedBy}
          onClose={() => setDislikedByModalIsOpen(false)}
          modalTitle={`${item.dislikedBy.length} dislikes`}
          modalSubTitle="Disliked by"
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Comment;
