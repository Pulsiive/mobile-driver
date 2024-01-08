import React from 'react';
import PaymentsUICustomScreen from '../../screens/payment/PaymentUICustomScreen';
import Checkout from '../../screens/payment/Checkout';
import Panier from '../../screens/payment/Panier';
import CustomHeader from '../../AppStyles';

const getRoutes = () => {
  return [
    {
      name: 'PaymentUICustomScreen',
      component: PaymentsUICustomScreen
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
