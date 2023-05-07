import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Profile from '../screens/Profile/Profile';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import UploadProfile from '../screens/uploadProfile/UploadProfile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {isLogin} from '../context/stateProvider';
import DrawerContent from '../components/DrawerContent/DrawerContent';
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Navigation = () => {
  const {isLoggedIn} = isLogin();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isLoggedIn ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UploadProfile" component={UploadProfile} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Drawer" component={DrawerNavigation} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
