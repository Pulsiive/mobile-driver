import React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppIcon, AppStyles } from '../AppStyles';

import DrawerContainer from '../components/DrawerContainer';

import Welcome from '../screens/welcome/Welcome';
import Login from '../screens/login/Login';
import SignUp from '../screens/register/SignUp';
import Home from '../screens/home/Home';
import Settings from '../screens/settings/Settings';
import Logout from '../screens/settings/Logout';
import ChangePassword from '../screens/settings/ChangePassword';
import Profile from '../screens/profile/Profile';
import Owner from '../screens/profile/Owner';
import Station from '../screens/station/Station';
import Stations from '../screens/station/Stations';
import Messages from '../screens/communication/Messages';
import Message from '../screens/communication/Message';
import Booking from '../screens/booking/Booking';
import Map from '../screens/map/Map';
import Planning from '../screens/planning/Planning';

const Stack = createStackNavigator();

const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const MessagesStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={({ navigation }) => ({
        headerLeft: () => <></>,
        headerLeftContainerStyle: { paddingLeft: 10 }
      })}
    />
    <Stack.Screen name="Message" component={Message} />
    <Stack.Screen name="Owner" component={Owner} />
    <Stack.Screen name="Station" component={Station} />
    <Stack.Screen name="Stations" component={Stations} />
    <Stack.Screen name="Booking" component={Booking} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: { paddingLeft: 10 }
      })}
    />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="Logout" component={Logout} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen
      name="Map"
      component={Map}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: { paddingLeft: 10 }
      })}
    />
  </Stack.Navigator>
);

const PlanningStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: AppStyles.color.tint,
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float'
    }}
  >
    <Stack.Screen
      name="Planning"
      component={Planning}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: { paddingLeft: 10 }
      })}
    />
  </Stack.Navigator>
);

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarInactiveTintColor: 'grey',
      tabBarActiveTintColor: AppStyles.color.tint,
      headerShown: false
    }}
  >
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
              }}
              source={AppIcon.images.home}
            />
          );
        }
      }}
      name="HomeStack"
      component={HomeStack}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Map',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
              }}
              source={AppIcon.images.map}
            />
          );
        }
      }}
      name="MapStack"
      component={MapStack}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Planning',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
              }}
              source={AppIcon.images.planning}
            />
          );
        }
      }}
      name="PlanningStack"
      component={PlanningStack}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Messages',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
                width: 30,
                height: 30
              }}
              source={AppIcon.images.messages}
            />
          );
        }
      }}
      name="MessagesStack"
      component={MessagesStack}
    />
  </BottomTab.Navigator>
);

const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: { outerWidth: 200 },
      drawerPosition: 'left',
      headerShown: false
    }}
    drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
  >
    <Drawer.Screen name="Tab" component={TabNavigator} />
  </Drawer.Navigator>
);

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="LoginStack" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginStack" component={LoginStack} />
    <Stack.Screen name="DrawerStack" component={DrawerStack} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
  },
  iconStyle: { tintColor: AppStyles.color.tint, width: 30, height: 30 }
});

export default AppNavigator;
