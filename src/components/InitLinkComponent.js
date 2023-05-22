import React from 'react';
import { Platform, Text, Linking } from 'react-native';

class InitLinkComponent extends React.Component {
    componentDidMount() {
        console.log('test');
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
            Linking.getInitialURL().then(url => {
                if (url) {
                    this.handleOpenURL({ url });
                }
            });
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }

    navigate = (url) => {
        const { navigate } = this.props.navigation;

        const route = url.replace(/.*?:\/\//g, '');
        const args = route.split('/');
        const routeName = args[0];
        const token = args[1];
        const email = args[2];

        if (routeName === 'verify-email-token')
            navigate('VerifyEmailToken', {token, email});
    }

    render() {
        return <Text>Hello from Home!</Text>;
    }
}

export default InitLinkComponent;
