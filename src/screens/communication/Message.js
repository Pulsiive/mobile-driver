// import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
  Alert
} from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AppStyles } from '../../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../db/Api';

function Message(props) {
  const width = Dimensions.get('window').width;
  const { imageUri, name, receiverId } = useRoute().params;
  const [text, setText] = React.useState('');
  const [messages, setMessages] = useState();

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Owner', {
      imageUri: imageUri,
      name: name,
      userId: receiverId
    });
  };

  useEffect(() => {
    //TODO: add receiver / author ID as param in API route
    const interval = setInterval(() => {
      api.send('GET', '/api/v1/profile/messages').then((messages) => {
        const sortedMessages = messages.data.receivedMessages
          .filter((message) => message.authorId === receiverId)
          .map((message) => ({ ...message, sent: false }));
        sortedMessages.push(
          ...messages.data.sentMessages
            .filter((message) => message.receiverId === receiverId)
            .map((message) => ({ ...message, sent: true }))
        );
        sortedMessages.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMessages(sortedMessages);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    try {
      const newMessage = await api.send('POST', '/api/v1/profile/message', {
        message: {
          receiverId,
          body: text,
          createdAt: new Date()
        }
      });
      setMessages([...messages, { ...newMessage.data, sent: true }]);
      setText('');
    } catch (e) {
      console.log('ERROR');
      console.log(e);
    }
  };

  const RenderHeaderSection = () => {
    return (
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={{
            backgroundColor: AppStyles.color.text,
            borderRadius: 20,
            marginHorizontal: 10,
            padding: 10
          }}
        >
          <Text> VIEW PROFILE </Text>
        </TouchableOpacity>
        <View style={{ maxWidth: 130 }}>
          <Text
            style={{
              fontSize: 22,
              marginTop: 5,
              marginHorizontal: 10,
              fontWeight: 'bold',
              color: AppStyles.color.pulsive
            }}
          >
            {name}
          </Text>
        </View>
        <Pressable
          style={{
            marginHorizontal: 5,
            padding: 10
          }}
          onPress={() => Alert.alert('You have reported this user')}
        >
          <Icon name="warning" size={20} color="grey" />
        </Pressable>
        <Pressable
          style={{
            marginHorizontal: 5,
            padding: 10
          }}
          onPress={() => Alert.alert('You have deleted this conversation')}
        >
          <Icon name="trash" size={20} color="grey" />
        </Pressable>
      </View>
    );
  };

  const renderMessage = (id, message, isMe, img) => {
    const bgColor = isMe ? AppStyles.color.pulsive : '#4f4f4f';
    const alignment = isMe ? 'flex-end' : 'flex-start';
    const flexAlignment = isMe ? 'column' : 'row';
    const radius = isMe ? { borderTopLeftRadius: 20 } : { borderBottomRightRadius: 20 };
    return (
      <View
        key={id}
        style={{
          width: width,
          paddingHorizontal: 20,
          marginVertical: 5,
          alignItems: alignment,
          flexDirection: flexAlignment
        }}
      >
        {isMe ? null : (
          <TouchableOpacity onPress={() => onPress()}>
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10
              }}
              onPress={() => onPress()}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            maxWidth: width * 0.7,
            backgroundColor: bgColor,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            ...radius,
            padding: 10
          }}
        >
          {img ? (
            <Image source={{ uri: img }} style={{ width: width * 0.65, height: 150 }} />
          ) : null}
          <Text style={{ fontSize: 16, padding: 10 }}>{message}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    let image = '';
    if (item.imageUri) {
      image = item.imageUri;
    }
    return renderMessage(item.id, item.body, item.sent, image);
  };

  return (
    <View View style={{ flex: 1 }}>
      <RenderHeaderSection />
      <FlatList
        inverted
        style={styles.messagesList}
        data={messages}
        // ListHeaderComponent={renderHeaderSection()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: AppStyles.color.background,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setText(text)}
            placeholder="Your message..."
            value={text}
          />
          <Icon name="arrow-up" size={25} style={styles.sendIcon} onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendIcon: {
    padding: 10,
    color: AppStyles.color.text
  },
  input: {
    height: 40,
    borderColor: AppStyles.color.pulsive,
    borderWidth: 1,
    color: AppStyles.color.text,
    flex: 1,
    borderRadius: 15,
    paddingLeft: 15
  },
  messagesList: {
    marginBottom: 100
  }
});

export default Message;
