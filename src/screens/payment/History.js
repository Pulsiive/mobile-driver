import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    Button,
    Text,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Backend from '../../db/Backend';
import { AppIcon } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';


function History({ navigation }) {

    const [payments, setPayments] = useState([]);
    const [profile, setProfile] = useState([]);

        useEffect(() => {
            const fetchPayments = async () => {
                const {data, status} = await Backend.getPayments();
                if (status === 200)
                    setPayments(data);
            }

            const getProfile = async () => {
                const response = await Backend.me();

                if (response.status === 200) {
                    setProfile(response.data);
                    showMessage({
                        message: `Balance récupéré avec succès`,
                        type: "success",
                        backgroundColor: "green"
                    });
                } else {
                    showMessage({
                        message: 'Impossible de récupérer la balance',
                        type: "error",
                        backgroundColor: "red"
                    });
                }
            }

            getProfile();

            fetchPayments();
    }, []);

    function convertCentimesToEuros(centimes) {
        const euros = centimes / 100;
        return euros.toFixed(2); // toFixed(2) is used to round the result to two decimal places
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1}}>

                <View style={styles.content}>


                    <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => navigation.navigate('Aide')}>
                        <Image style={{width: 20, height:20}} source={AppIcon.images.back}></Image>
                    </TouchableOpacity>

                    <Text style={{color: '#2F313E', fontSize:25, fontWeight: 'bold', marginTop: 3+'%'}}> Mon Historique de paiements </Text>

                    <View style={{marginLeft:-10+'%',marginTop: 7+'%', marginBottom: 2+'%', height: 5, width: 200+'%', backgroundColor:'black'}}></View>

                    <TouchableOpacity style={styles.test}>
                        <View style={{height:40, width: 40, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1, width: 90+'%', height:90+'%', resizeMode: 'contain'}} source={AppIcon.images.user}></Image>
                        </View>
                        {profile && <View style={{borderRadius: 30, padding:10 , backgroundColor:'#f2f2f2' ,marginLeft:5+'%', left:50+'%', width: 200, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'black', fontSize:16}}>{profile?.firstName}</Text>
                            <Text style={{color:'black', marginTop: 2, fontSize:12}}>User Id: {profile?.id}</Text>
                        </View>}
                    </TouchableOpacity>

                    <View style={{marginLeft:-10+'%',marginTop: 7+'%', marginBottom: 2+'%', height: 5, width: 200+'%', backgroundColor:'black'}}></View>

{payments && payments.map(payment => {
return (
    <>
        <TouchableOpacity style={styles.test}>
                        <View style={{height:60, width: 60, borderRadius: 50, justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1, width: 90+'%', height:90+'%', resizeMode: 'contain'}} source={AppIcon.images.station1}></Image>
                        </View>
                        <View style={{marginLeft:5+'%', left:30+'%', width: 80+'%'}}>
                            <Text style={{color:'black', fontSize:16}}>Commande n°{payment.id} -</Text>
                            <Text style={{color:'black', fontSize:16}}>Location Chargeur Type 1</Text>
                            <Text style={{color:'grey', fontWeight:'bold', fontSize:12}}>{convertCentimesToEuros(payment.amount)} € - paiement VISA ({payment.provider})</Text>
                            <Text style={{color:'grey', fontWeight:'bold', fontSize:12}}>{payment.date}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{marginTop: 7+'%', height: 1, width: 100+'%', backgroundColor:'#d9d9d9'}}></View>
    </>
    )

})}




                    <TouchableOpacity style={styles.test}>
                        <View style={{height:60, width: 60, borderRadius: 50, justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1, width: 90+'%', height:90+'%', resizeMode: 'contain'}} source={AppIcon.images.station2}></Image>
                        </View>
                        <View style={{marginLeft:5+'%', left:30+'%', width: 80+'%'}}>
                            <Text style={{color:'black', fontSize:16}}>Commande n°237777 -</Text>
                            <Text style={{color:'black', fontSize:16}}>Location Chargeur Type 2</Text>
                            <Text style={{color:'grey', fontWeight:'bold', fontSize:12}}>10,27€ - paiement Paypal</Text>
                            <Text style={{color:'grey', fontWeight:'bold', fontSize:12}}>28 mai 2022</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{marginTop: 7+'%', height: 1, width: 100+'%', backgroundColor:'#d9d9d9'}}></View>

                    <TouchableOpacity style={styles.test}>
                        <View style={{height:60, width: 60, borderRadius: 50, justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1, width: 90+'%', height:90+'%', resizeMode: 'contain'}} source={AppIcon.images.station3}></Image>
                        </View>
                        <View style={{marginLeft:5+'%', left:30+'%', width: 80+'%'}}>
                            <Text style={{color:'black', fontSize:16}}>Commande n°237324 -</Text>
                            <Text style={{color:'black', fontSize:16}}>Location Chargeur Type 3</Text>
                            <Text style={{color:'grey', fontWeight:'bold', fontSize:12}}>21,01€ - paiement VISA</Text>
                            <Text style={{color:'grey', fontWeight:'bold', fontSize:12}}>11 avril 2022</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{marginLeft:-10+'%',marginTop: 7+'%', marginBottom: 2+'%', height: 2, width: 200+'%', backgroundColor:'#d9d9d9'}}></View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        fontWeight:'bold',
        fontSize:30,
        top:5+'%',
        color: '#2F313E',
    },
    reception:{
        height: 5.8+'%',
        top: 50+'%',
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        // backgroundColor:'red',
    },
    history2:{
        height: 9+'%',
        top: 40+'%',
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        // backgroundColor:'red',
    },
    test:{
        marginTop: 5+'%',
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    word: {
        position: 'absolute',
        top:20.4+'%',
        fontWeight:'bold',
        color: '#2F313E',
    },
    recent: {
        position: 'absolute',
        top:35.3+'%',
        fontWeight:'bold',
        color: '#2F313E',
    },
    container:
    {
        flex:1,
        top: 47+'%',
        // height: 50+'%',
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        display:'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        //justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      contentTitle: {
        fontSize: 23,
        fontWeight:'bold',
        marginBottom: 12,
        color: "#2F313E",
        marginLeft: 'auto',
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    appButtonContainer: {
        color: "#ffffff",
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        // paddingVertical: 10,
        // paddingHorizontal: 12
        height: 6+'%',
        top: 76+'%',
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginLeft: 10+ '%',
        marginRight: 15.5+'%'
    },
    ModalButton: {
        color: "#ffffff",
        elevation: 8,
        backgroundColor: "black",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 100+'%',
        // top: 76+'%',
        display:'flex',
        // flexDirection: 'row',
        alignItems:'center',
        // justifyContent: 'center',
        marginTop: 3+ '%',
        // marginRight: 15.5+'%'
    },
});

export default History;
