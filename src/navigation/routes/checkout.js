import React from 'react';
import PaymentUICustomScreen from '../../screens/payment/PaymentUICustomScreen';
import Checkout from '../../screens/payment/Checkout';
import Panier from '../../screens/payment/Panier';
import CustomHeader from '../../AppStyles';

const getRoutes = () => {
  return [
    {
      name: 'PaymentUICustomScreen',
      component: PaymentUICustomScreen,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Panier',
      component: Panier,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Checkout',
      component: Checkout,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    }
  ];
};

export default getRoutes;
