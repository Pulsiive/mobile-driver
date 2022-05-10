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
import ChangePassword from '../screens/settings/ChangePassword';

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
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
  </Stack.Navigator>
);

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarInactiveTintColor: 'grey',
      tabBarActiveTintColor: AppStyles.color.tint,
      tabBarIcon: ({ focused }) => {
        return (
          <Image
            style={{
              tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey
            }}
            source={AppIcon.images.home}
          />
        );
      },
      headerShown: false
    }}
  >
    <BottomTab.Screen options={{ tabBarLabel: 'Home' }} name="HomeStack" component={HomeStack} />
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
