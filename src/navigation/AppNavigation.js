import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../screens/profile/Profile';
import Messages from '../screens/communication/Messages';
import Map from '../screens/map/Map';
import Planning from '../screens/planning/Planning';
import Favorites from '../screens/favorites/Favorites';
import FlashMessage from 'react-native-flash-message';

import { AppIcon, useTheme } from '../AppStyles';
import { UserProvider } from '../contexts/UserContext';

import routes from './routes';
import Settings from '../screens/settings/Settings';

import { StyleSheet } from 'react-native';
import { AppStyles } from '../AppStyles';
import CustomHeader from '../AppStyles';
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { AppColor } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColor.pulsive,
        tabBarInactiveTintColor: AppColor.icon,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: AppColor.bottomColor,
          borderTopWidth: 0,
          height: '7%'
        }
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Planning',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.planning_logo}
              />
            );
          }
        }}
        name="Planning"
        component={Planning}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.favorite_logo}
              />
            );
          }
        }}
        name="Favorites"
        component={Favorites}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 35,
                  height: 35
                }}
                source={AppIcon.images.logo}
              />
            );
          }
        }}
        name="Map"
        component={Map}
      />
      <Tab.Screen
        options={{
          headerTintColor: AppColor.pulsive,
          headerTitleStyle: styles.headerTitleStyle,
          headerMode: 'float',
          headerLeft: () => <></>,
          headerLeftContainerStyle: { paddingLeft: 10 },
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.messages_logo}
              />
            );
          }
        }}
        name="Messages"
        component={Messages}
      />
      <Tab.Screen
        options={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? AppColor.pulsive : AppColor.icon,
                  width: 20,
                  height: 20
                }}
                source={AppIcon.images.profile_logo}
              />
            );
          }
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const screens = routes
    .map((getRoutes) => {
      const routesArray = getRoutes();
      return routesArray.map((r) => (
        <Stack.Screen key={r.name} name={r.name} component={r.component} options={r.options} />
      ));
    })
    .flat();

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {screens}
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { AppColor } = useTheme();

  return (
    <NavigationContainer
      style={{
        backgroundColor: AppColor.background
      }}
    >
      <UserProvider>
        <RootNavigator />
      </UserProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenOptions: {
    headerStyle: { borderBottomWidth: 1 },
    headerMode: 'screen',
    headerShadowVisible: true,
    headerTransparent: false,
    headerTitle: ''
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  iconStyle: { tintColor: AppStyles.color.pulsive, width: 30, height: 30 }
});

export default AppNavigator;
