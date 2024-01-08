import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {AppStyles, AppIcon, useTheme} from '../../AppStyles';
import {Configuration} from '../../Configuration';
import Chats from './Chats';


function Messages() {
    const { AppColor } = useTheme();

    return (
        <View style={{backgroundColor: AppColor.background, ...styles.container}}>
            <Chats/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 0 : Dimensions.get("window").height * 0.05,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        color: AppStyles.color.title,
        fontSize: 25
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5
    },
    imageContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 22.5
    },
    chatContainer: {
        width: '75%'
    },
    profileName: {
        fontSize: 18,
        color: AppStyles.color.pulsive,
        paddingLeft: 5
    },
    message: {
        fontSize: 16,
        color: '#d9d9d9',
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
        // width: Dimensions.get('window').width * 0.8,
        height: 1,
        marginVertical: 3,
        backgroundColor: '#000'
        // marginLeft: Dimensions.get('window').width * 0.15
    }
});

export default Messages;
