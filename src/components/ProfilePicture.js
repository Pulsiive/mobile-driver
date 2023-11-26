import React from 'react';
import { Image } from 'react-native';

const ProfilePicture = ({ profilePictureId, width = 50, height = 50, borderRadius = 30 }) => {
  return (
    <Image
      style={{ width, height, borderRadius }}
      source={{ uri: `https://ucarecdn.com/${profilePictureId}/` }}
    />
  );
};

export default ProfilePicture;
