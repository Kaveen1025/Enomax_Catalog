import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDraverContent from '../components/sideNavBar/SideNav';
import HomeScreen from '../screens/home/HomeScreen';
import CatelogDetailsScreen from '../screens/catalogDetails/CatalogDetails';
import Login from '../screens/login/Login';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={props => <CustomDraverContent {...props} />}>
      

      <Drawer.Screen
        key="homeScreen"
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="catalogDetailsScreen"
        name="CatalogDetailsScreen"
        component={CatelogDetailsScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
