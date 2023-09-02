import React, { useState } from 'react';
import { View, Modal, Image, TouchableOpacity } from 'react-native';

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

export default CommentPicture;
