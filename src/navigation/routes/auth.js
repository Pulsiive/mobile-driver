import React from 'react';
import Login from '../../screens/login/Login';
import SignUp from '../../screens/register/SignUp';
import InitLinkComponent from '../../components/InitLinkComponent';
import CustomHeader from '../../AppStyles';

const getRoutes = () => {
  return [
    {
      name: 'Login',
      component: Login,
      options: {
        headerShown: false
      }
    },
    {
      name: 'SignUp',
      component: SignUp,
      hasCustomHeader: true,
      options: {
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true
      }
    },
    {
      name: 'InitLink',
      component: InitLinkComponent
    }
  ];
};

export default getRoutes;
