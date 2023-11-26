import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Carousel from 'react-native-snap-carousel';

import api from '../../../db/Api';
import { AppIcon, AppStyles, useTheme } from '../../../AppStyles';

import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import CommentPicture from './CommentPicture';

import style from '../style';
import UserListModal from './UserListModal';

import { getUser, useUserUpdate } from '../../../contexts/UserContext';
import { ButtonText, TextContent, TextSubTitle, ProfilePicture } from '../../../components';

const CommentBody = ({ comment, displayPictures, customStyle, isResponse }) => {
  const { AppColor } = useTheme();

  const message = comment.comment ? comment.comment : '(Aucun commentaire)';
  function getTimeSincePost(postDate) {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    const timeDifference = currentDate - postDateObj;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `Il y a ${years} ${years > 1 ? 'ans' : 'an'}`;
    } else if (months > 0) {
      return `Il y a ${months} mois`;
    } else if (days > 0) {
      return `Il y a ${days} ${days > 1 ? 'jours' : 'jour'}`;
    } else if (hours > 0) {
      return `Il y a ${hours} ${hours > 1 ? 'heures' : 'heure'}`;
    } else if (minutes > 0) {
      return `Il y a ${minutes} ${minutes > 1 ? 'minutes' : 'minute'} `;
    } else {
      return "À l'instant";
    }
  }

  return (
    <View
      style={{
        ...customStyle,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ width: '20%' }}>
          <ProfilePicture
            width={50}
            height={50}
            borderRadius={100}
            profilePictureId={comment.author.profilePictureId}
          />
        </View>
        <View style={{ width: '70%', flexDirection: 'column', marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextSubTitle
              title={comment.author.firstName + ' ' + comment.author.lastName}
              style={{
                fontSize: AppStyles.fontSize.contentTitle
              }}
            />
            {!isResponse && (
              <View style={{ flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-end' }}>
                <IconAwesome name="star" size={14} color={AppColor.text} />
                <Text style={{ color: AppColor.text, marginLeft: 2 }}>{comment.rate}</Text>
              </View>
            )}
          </View>
          <TextContent title={getTimeSincePost(comment.date) + ' '} />
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: AppColor.text, fontSize: AppStyles.fontSize.content }}>
          {message}
        </Text>
      </View>

      {comment.pictures && displayPictures && (
        <View style={{ marginTop: 5, marginBottom: 5 }}>
          <Carousel
            layout="default"
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            data={comment.pictures}
            renderItem={({ item }) => <CommentPicture pictureId={item} />}
          />
        </View>
      )}
    </View>
  );
};

const Comment = ({ item, navigation, displayPictures, displayResponses, customStyle = {} }) => {
  const { AppColor } = useTheme();

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
    <View style={{ height: '100%' }}>
      <CommentBody comment={item} displayPictures={displayPictures} customStyle={customStyle} />
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => likeComment()}>
              <Icon
                name="thumbs-up"
                size={20}
                color={userLikedComment ? AppColor.pulsive : AppColor.icon}
              />
            </TouchableOpacity>
            <ButtonText
              title={`${comment.likes} ${comment.likes > 1 ? 'likes' : 'like'}`}
              onPress={() => setLikedByModalIsOpen(true)}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => dislikeComment()}>
              <Icon
                name="thumbs-down"
                size={20}
                color={userDislikedComment ? AppColor.pulsive : AppColor.icon}
              />
            </TouchableOpacity>
            <ButtonText
              title={`${comment.dislikes} ${comment.dislikes > 1 ? 'dislikes' : 'dislike'}`}
              onPress={() => setLikedByModalIsOpen(true)}
            />
          </View>
        </View>
      </View>

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
