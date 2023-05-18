import * as React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    Text,
    Linking, Animated, ActivityIndicator,
} from 'react-native';

import {useEffect, useState} from "react";
import {showMessage} from "react-native-flash-message";
import Backend from '../../db/Backend';
import { AppIcon } from '../../AppStyles';

const styles = StyleSheet.create({
    Logo2: {
        width: 153,
        height: 153,
        position:'absolute',
        top: 21.6+'%',
        resizeMode:'cover',
    },
    line: {
        width: 307,
        height: 1,
        position:'absolute',
        top: 44.39+'%',
        backgroundColor:'#707070',
    },
    Welcome: {
        color:'white',
        fontWeight: '700',
        width: 326,
        height: 42,
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: 0,
        position: 'absolute',
        top: 47.89+'%',
    },
    border: {
        minWidth: 354,
        height: 44,
        borderRadius: 9,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        position: 'absolute',
        top: 55.34+'%',
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff1a',
        paddingBottom: 36.7,
        ...padding(9.9,36.7),
    },
    logoFB: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
    },
    TextFB: {
        position: 'absolute',
        top: 10+'%',
        left:18+'%',
        color: 'white',
        fontWeight: 'bold',
    },
    Btn: {
        boxSizing: 'borderBox',
        width: 50+'%',
        top: '10%',
        right: '190%',
        marginBottom: 0,
        ...padding(0 ,4.5),
    },
    IText: {
        minHeight: 19,
        minWidth: 90,
        textAlign: 'center',
        letterSpacing: 0,
        lineHeight: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    groupBtn: {
        position: 'absolute',
        top: 63+'%',
        width: 85 + '%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start',
    },
    content: {
        backgroundColor: '#81cd2c',
        borderRadius: 9,
        textAlign: 'center',
        height: 100+'%',
        padding: 12,
    },
    group2: {
        position: 'absolute',
        top: 72+'%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoG: {
        width:20,
        height: 13,
        marginLeft: 23,
        resizeMode: 'cover',
    },
    logoT: {
        width:20,
        height: 16,
        marginLeft: 23,
        resizeMode: 'cover',
    },
    logoL: {
        width:20,
        height: 20,
        marginLeft: 23,
        resizeMode: 'cover',
    },
    pattern1: {
        width:100,
        height:100,
        resizeMode:'cover',
        position:'absolute',
        left: 8.2+'%',
        top: 8.3+'%',
    },
    pattern2: {
        width:100,
        height:100,
        resizeMode:'cover',
        position:'absolute',
        left: 87+'%',
        top: 31+'%',
    },
    pattern3: {
        width:100,
        height:100,
        resizeMode:'cover',
        position:'absolute',
        left: 37+'%',
        top: 94+'%',
    },
    center: {
        width: 318,
        minHeight: 267,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
    },
    Logo: {
        width: 52,
        height: 52,
        resizeMode:'cover',
    },
    Pulsiive : {
        width: 117,
        height: 38,
        resizeMode:'cover',
        marginTop: 24,
    },
    Wording: {
        width: 318,
        height: 83,
        marginTop: 25,
        resizeMode:'cover',
    },
    Start: {
        width: 125,
        height: 20,
        marginTop: 25,
        resizeMode:'cover',
    }
});

function padding(a, b, c, d) {
    return {
        paddingTop: a,
        paddingRight: b ? b : a,
        paddingBottom: c ? c : a,
        paddingLeft: d ? d : (b ? b : a)
    }
}

function VerifyEmailToken({route, navigation}) {
    const {token, email} = route.params;
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
         const response = await Backend.verifyEmailToken(email, token);

         if (response.status === 200) {
             setError(false);
             showMessage({
                 message: 'Votre e-mail a été verifié avec succès !',
                 type: "success",
                 backgroundColor: "green"
             });
         } else {
             setError(true);
             showMessage({
                 message: `L'e-mail a expiré.`,
                 description: 'Veuillez faire une nouvelle demande de vérification d\'email',
                 type: "error",
                 backgroundColor: "red"
             });
         }
        }

        verifyToken();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <Image source={AppIcon.images.logo2} style={styles.Logo2} />
            <View style={styles.line}></View>
            {error === null ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.Welcome}>{!error ? 'Email vérifié avec succès !\nCommençons sans plus attendre !' : "L'email de confirmation à expiré.\nVeuillez faire une nouvelle demande."}</Text>}
            <TouchableHighlight onPress={() => {
                if (error) {
                    navigation.navigate('ReqEmailVerification');
                } else {
                    navigation.navigate('ReqPhoneNumberOTP');
                }
            }}>
                <View style={styles.groupBtn}>
                    <View style={styles.Btn}>
                        <View style={styles.content}>
                            <Text style={styles.IText}>{error ? 'Nouvelle demande' : 'Continuer'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default VerifyEmailToken;
