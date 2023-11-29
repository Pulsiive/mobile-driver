import React from 'react';
import Map from '../../screens/map/Map';
import Locations from '../../screens/map/Locations';
import StationRating from '../../screens/rating/StationRating';
import OwnerV2 from '../../screens/profile/OwnerV2';
import BookingPlanning from '../../screens/booking/BookingPlanning';
import StationInformations from '../../screens/station/StationInformations';
import CustomHeader from '../../AppStyles';
import OwnerRating from '../../screens/rating/OwnerRating';

import { useTheme } from '../../AppStyles';
import styles from './styles';

const getRoutes = () => {
  const { AppColor } = useTheme();

  return [
    {
      name: 'Locations',
      component: Locations,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'StationRating',
      component: StationRating,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'BookingPlanning',
      component: BookingPlanning,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'StationInformations',
      component: StationInformations,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Owner',
      component: OwnerV2,
      options: {
        headerShown: true,
        headerTitle: 'Profil',
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold' },
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }
    },
    {
      name: 'OwnerRating',
      component: OwnerRating
    }
  ];
};

export default getRoutes;
