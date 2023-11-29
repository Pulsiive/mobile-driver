import React from 'react';
import Messages from '../../screens/communication/Messages';
import Message from '../../screens/communication/Message';

import { useTheme } from '../../AppStyles';
import styles from './styles';

const getRoutes = () => {
  const { AppColor } = useTheme();

  return [
    // {
    //   name: 'Messages',
    //   component: Messages,
    //   options: {
    //     headerTintColor: AppColor.pulsive,
    //     headerTitleStyle: styles.headerTitleStyle,
    //     headerMode: 'float',
    //     headerLeft: () => <></>,
    //     headerLeftContainerStyle: { paddingLeft: 10 }
    //   }
    // },
    {
      name: 'Message',
      component: Message,
      options: {
        headerTintColor: AppColor.pulsive,
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float',
        headerShown: true
      }
    }
  ];
};

export default getRoutes;
