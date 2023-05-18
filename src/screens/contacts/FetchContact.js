import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import { AppIcon } from '../../AppStyles';

import { Linking } from 'react-native';

const FetchContact = ({ data, navigation, removeContact }) => {
  return (
    <View style={{ width: 100 + '%', height: 100 + '%', top: 0 + '%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'black', flex: 1 }}
      >
        {data.map((plan) => {
          return (
            <View style={{ alignItems: 'center' }} key={plan.user.id}>
              <View style={styles.container}>
                <Image
                  style={styles.img}
                  source={{
                    uri: 'https://robohash.org/maioresaliquidvitae.png?size=40x40&set=set1'
                  }}
                ></Image>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: 84 + '%',
                    left: 13 + '%',
                    position: 'absolute'
                  }}
                >
                  <Text style={{ color: 'grey', margin: 15 }}>
                    {plan.user.firstName + ' ' + plan.user.lastName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(
                        'Message',
                        {
                          imageUri:
                            'https://robohash.org/maioresaliquidvitae.png?size=40x40&set=set1',
                          name: plan.user.firstName + ' ' + plan.user.lastName,
                          receiverId: plan.user.id
                        },
                        { screen: 'DrawerStack' }
                      );
                      // Linking.openURL('tel:' + '+33 6 24 56 18 03');
                    }}
                  >
                    <Image
                      source={AppIcon.images.phone}
                      style={{ height: 30, width: 30, left: 290, top: -40 }}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(
                        'Owner',
                        {
                          imageUri:
                            'https://robohash.org/maioresaliquidvitae.png?size=40x40&set=set1',
                          name: plan.user.firstName + ' ' + plan.user.lastName,
                          userId: plan.user.id
                        },
                        { screen: 'DrawerStack' }
                      );
                      // Linking.openURL('tel:' + '+33 6 24 56 18 03');
                    }}
                  >
                    <Image
                      source={AppIcon.images.profile}
                      style={{ height: 30, width: 30, left: 220, top: -40 }}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeContact(plan.user.id)}>
                    <Image
                      source={AppIcon.images.remove}
                      style={{ height: 30, width: 30, left: 270, top: -40 }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    marginTop: 20,
    width: 92 + '%',
    height: 70,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignItems: 'flex-start'
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
});

export default FetchContact;
