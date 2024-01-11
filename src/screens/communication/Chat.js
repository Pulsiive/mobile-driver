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
              ...{lastMessage}
            </Text>
          </View>
          <View style={{ width: '5%' }}>{renderCharReadStatus()}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1, // Reduced height for a thinner separator
    backgroundColor: '#ccc', // Color for the separator
    marginVertical: 10, // Adjusted vertical margin
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15, // Reduced padding for a more compact look
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15, // Slightly reduced margin
    height: 90, // Reduced height for a more compact design
  },
  imageContainer: {
    width: 50, // Slightly reduced size for the profile picture
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Reduced spacing between profile picture and text
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    width: '70%', // Slightly reduced width for the message container
  },
  profileName: {
    fontSize: 16, // Slightly reduced font size for the name
    fontWeight: 'bold',
    color: 'black',
  },
  message: {
    fontSize: 14, // Slightly reduced font size for the message
    color: '#555',
    marginTop: 5,
  },
  messageReadImage: {
    width: 16, // Slightly reduced icon size
    height: 16,
    marginRight: 5,
  },
  chatBubble: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});
export default Chat;