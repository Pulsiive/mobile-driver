import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import { AppStyles } from '../../AppStyles';
import ProfilePicture from '../../components/ProfilePicture';

function Chat({ chat }) {
  const name = `${chat.user.firstName} ${chat.user.lastName}`;
  const lastMessage = chat.message.body;
  const isRead = chat.message.read;
  const isMe = chat.message.authorId !== chat.user.id;

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Message', {
      imageUri: chat.user.profilePictureId,
      name,
      receiverId: chat.user.id
    });
  };

  const renderCharReadStatus = () => {
    if (isRead && isMe) {
      return (
        <Image
          source={{ uri: chat.user.profilePictureUri }}
          resizeMode="cover"
          style={styles.messageReadImage}
        />
      );
    } else if (!isRead && isMe) {
      return <Image name="check" size={30} color="gray" />;
    } else {
      return (
        <View style={styles.chatBubble}>
          <Text>1</Text>
        </View>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View>
        <View style={styles.separator}></View>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ProfilePicture
              profilePictureId={chat.user.profilePictureId}
              width={45}
              height={45}
              borderRadius={22.5}
            />
          </View>
          <View></View>
          <View style={styles.chatContainer}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.message}>
              {isMe ? 'You:  ' : ''}
              {lastMessage}
            </Text>
          </View>
          <View style={{ width: '5%' }}>{renderCharReadStatus()}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  imageContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  chatContainer: {
    width: '75%'
  },
  profileName: {
    fontSize: 18,
    color: AppStyles.color.pulsive
  },
  message: {
    fontSize: 16,
    color: AppStyles.color.text,
    paddingRight: 10
  },
  messageReadImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5
  },
  chatBubble: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  separator: {
    width: Dimensions.get('window').width * 0.8,
    height: 1,
    marginVertical: 3,
    backgroundColor: '#000',
    marginLeft: Dimensions.get('window').width * 0.15
  }
});
export default Chat;
