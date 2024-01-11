import React from 'react';
import Settings from '../../screens/settings/Settings';
import NotificationScreen from '../../screens/settings/NotificationScreen';
import Profile from '../../screens/profile/Profile';
import Contact from '../../screens/contacts/ContactList';
import Fonctionnement from '../../screens/settings/Fonctionnement';
import PaymentHistory from '../../screens/payment/History';
import PromoCodesPage from '../../screens/promo/Codepromo';
import Components from '../../screens/components/Components';
import Calendar from '../../screens/profile/Calendar';
import Station from '../../screens/station/Station';
import Stations from '../../screens/station/Stations';
import CustomHeader, { useTheme } from '../../AppStyles';

import styles from './styles';
import PaymentUICustomScreen from '../../screens/payment/PaymentUICustomScreen';

const getRoutes = () => {
  const { AppColor } = useTheme();

  return [
    {
      name: 'Settings',
      component: Settings,
      hasCustomHeader: true,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'TopUp',
      component: PaymentUICustomScreen,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Notification',
      component: NotificationScreen,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'PromoCodesPage',
      component: PromoCodesPage,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Profile',
      component: Profile,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Components',
      component: Components,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Contacts',
      component: Contact,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Fonctionnement',
      component: Fonctionnement,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'PaymentHistory',
      component: PaymentHistory,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'Calendar',
      component: Calendar,
      options: {
        headerShown: true,
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }
    },
    {
      name: 'Station',
      component: Station,
      options: {
        headerShown: true,
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }
    },
    {
      name: 'Stations',
      component: Stations,
      options: {
        headerShown: true,
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float'
      }
    }
  ];
};

export default getRoutes;
