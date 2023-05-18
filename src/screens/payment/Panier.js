import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import Modal from "react-native-modal";
import { AppIcon } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';
import Backend from '../../db/Backend';


function Panier({ navigation, route }) {
  const slot = route.params.slot;
  const stationId = route.params.stationId;
  console.log(stationId);
  const [isModalVisible, setModalVisible] = useState(false);
  const [station, setStation] = useState(null);

  useEffect(() => {
    const getStation = async () => {
      const response = await Backend.getStation(stationId);

      if (response.status === 200) {
        setStation(response.data.station);
        console.log(station);
        showMessage({
          message: `Station récupéré avec succès`,
          type: "success",
          backgroundColor: "green"
        });
      } else {
        showMessage({
          message: 'Impossible de récupérer la station',
          type: "error",
          backgroundColor: "red"
        });
      }
    }

    getStation();
  }, []);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, marginLeft: 5.5 + '%', top: -5+'%' }}>

                    <TouchableOpacity style={{marginRight: 'auto', top: 10+'%'}} onPress={() => navigation.navigate('BookingPlanning', {stationId})}>
                        <Image style={{width: 20, height:20}} source={AppIcon.images.back}></Image>
                    </TouchableOpacity>

                    <Text style={styles.header}> Paniers </Text>

                    <View style={{top: 20+'%', marginBottom: 3+'%' ,height: 1, width: 90+'%', backgroundColor:'black'}}></View>
                    <TouchableOpacity style={styles.history2}  onPress={toggleModal}>
                        <View style={{backgroundColor:'#f4f4f5', height:40, width: 40, borderRadius: 50, justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1, width: 50+'%', height:50+'%', resizeMode: 'contain'}} source={AppIcon.images.eclair}></Image>
                        </View>
                      {station && <View style={{left:50+'%', width: 200}}>
                          <Text style={{color:'black', fontSize:16}}>Chargeur {station?.properties?.plugTypes[0] ?? 'non défini'}</Text>
                          <Text style={{color:'grey', marginTop: 6, fontSize:8}}>{station?.properties?.id ?? 'non défini'}</Text>
                            <Text style={{color:'grey', marginTop: 6, fontSize:12}}>M.George</Text>
                            <Text style={{color:'grey', marginTop: 6, fontSize:12}}>{station?.properties?.price/100}€ / minute</Text>
                        </View>}
                        <View style={{position:'absolute', right: 30}}>
                            <Image source={AppIcon.images.arrowRight}></Image>
                        </View>
                    </TouchableOpacity>


                    <Modal
                      testID={'modal'}
                      isVisible={isModalVisible}
                      onSwipeComplete={toggleModal}
                      swipeDirection={['up', 'left', 'right', 'down']}
                      style={styles.view}>

                      <View style={styles.content}>

                        <View style={{display:'flex', flexDirection: 'row'}}>
                            <Text style={styles.contentTitle}>Votre Commande</Text>
                            <TouchableOpacity style={{width: 30, height:30, marginLeft: 'auto'}} onPress={toggleModal}>
                                <Image style={{width: 30, height:30, marginLeft: 'auto'}} source={AppIcon.images.xMark}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop:7+'%', marginBottom: 2+'%' , height: 1, width: 100+'%', backgroundColor:'black'}}></View>

                        <TouchableOpacity style={styles.test}>
                        <View style={{backgroundColor:'#f4f4f5', height:40, width: 40, borderRadius: 50, justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1, width: 70+'%', height:70+'%', resizeMode: 'contain'}} source={AppIcon.images.borne}></Image>
                        </View>
                          {station && <View style={{left:50+'%', width: 200}}>
                            <Text style={{color:'black', fontSize:16}}>Chargeur {station?.properties?.plugTypes[0] ?? 'non défini'}</Text>
                            <Text style={{color:'grey', marginTop: 2, fontSize:12, fontWeight:'bold'}}>M.George</Text>
                        </View>}
                        <View style={{position:'absolute', right: 30}}>
                            <Text style={{color:'black', marginTop: 2, fontSize:12, fontWeight:'bold'}}>{station?.properties?.price/100}€ / minute</Text>
                        </View>
                        </TouchableOpacity>

                        <View style={{ marginTop:7+'%', marginBottom: 2+'%' , height: 1, width: 100+'%', backgroundColor:'black'}}></View>

                        <View style={{display:'flex', flexDirection: 'row'}}>
                            <Text style={{color:'black', fontSize:20}}>Sous-total</Text>
                            <Text style={{color:'black', fontSize:20, marginLeft: 'auto'}}>3.00€</Text>
                        </View>
                        <View style={{display:'flex', flexDirection: 'row', marginTop:3+'%', padding: 5 ,backgroundColor:'#f2f2f2'}}>
                            <Text style={{color:'black', fontSize:20}}>Add note</Text>
                            <Text style={{color:'black', fontSize:20, marginLeft: 'auto'}}>+</Text>
                        </View>

                        <View style={{marginTop:7+'%', marginBottom: 2+'%' , height: 1, width: 100+'%', backgroundColor:'black'}}></View>


                        {/* <Button testID={'close-button'} onPress={toggleModal} title="Close" /> */}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                          setModalVisible(false);
                          navigation.navigate('Checkout', {slot});
                        }} style={{color: '#ffffff', elevation: 8, backgroundColor: "black", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, width: 100+'%', display:'flex', alignItems:'center', marginTop: 3+ '%',}} >
                            <Text style={{color: '#ffffff', fontSize:20}}> Commander </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#f2f2f2', elevation: 8, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, width: 100+'%', display:'flex', alignItems:'center', marginTop: 3+ '%',}} >
                            <Text style={{color: 'black', fontSize:20}}> Ajouter une commande </Text>
                        </TouchableOpacity>
                      </View>

                    </Modal>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        fontWeight:'bold',
        fontSize:30,
        top:15+'%',
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
        height: 9+'%',
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        // backgroundColor:'red',
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

export default Panier;
