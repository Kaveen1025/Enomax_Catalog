import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash/Splash';
import HomeScreen from '../screens/home/HomeScreen';
import CatelogDetailsScreen from '../screens/catalogDetails/CatalogDetails';
import Login from '../screens/login/Login';
import DrawerNavigation from './SideNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CatalogDetailsScreen"
          component={CatelogDetailsScreen}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="DrowerNavigation"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
