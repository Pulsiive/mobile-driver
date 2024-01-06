import React, { useState } from 'react';
import { View, Modal, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../AppStyles';

const CommentPicture = ({ pictureId }) => {
  const { AppColor } = useTheme();

  const [imageIsOpen, setImageIsOpen] = useState(false);

  return (
    <View style={{ width: '80%' }}>
      <TouchableOpacity
        onPress={() => setImageIsOpen(true)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Image
          source={{ uri: `https://ucarecdn.com/${pictureId}/` }}
          style={{ width: '100%', aspectRatio: 3 / 2 }}
          resizeMode="cover"
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
            height: '100%',
            backgroundColor: AppColor.background
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

export default CommentPicture;
