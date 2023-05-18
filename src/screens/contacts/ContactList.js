import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import api from '../../db/Api';

import FetchContact from './FetchContact';

function Contact({ navigation }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const response = await api.send('GET', '/api/v1/profile/contacts', null, true);
      if (response.status === 200) {
        setContact(response.data);
      }
    };

    fetchContact();
  }, []);

  return !contact ? (
    <View
      style={{
        backgroundColor: 'black',
        width: 100 + '%',
        height: 100 + '%',
        top: 0 + '%'
      }}
    >
      <ActivityIndicator size="small" color="white" />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        top: 0 + '%',
        backgroundColor: 'black'
      }}
    >
      <FetchContact data={contact} navigation={navigation}></FetchContact>
    </View>
  );
}

export default Contact;
