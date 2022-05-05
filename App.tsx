import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StateProvider} from './src/State/StateContext';
import {ApplicationState} from './src/State/DefaultState';
import {ApplicationReducer} from './src/State/Reducer';
import CameraScreenComponent from './src/Component/CameraScreenComponent';
import AddItemComponent from './src/Component/AddItemComponent';
import PantryInventoryComponent from './src/Component/PantryInventoryComponent';

// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tabBarStyle from './src/TabBarStyle';

const makeTabBarIcon =
  (name: string) =>
  ({color}: {color: string}) =>
    <MaterialCommunityIcons name={name} color={color} size={26} />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <StateProvider initialState={ApplicationState} reducer={ApplicationReducer}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={tabBarStyle}>
          <Tab.Screen
            name="Inventory"
            options={{
              tabBarIcon: makeTabBarIcon('menu'),
            }}
            component={PantryInventoryComponent}
          />
          <Tab.Screen
            name="Camera"
            options={{
              tabBarIcon: makeTabBarIcon('camera-outline'),
            }}
            component={CameraScreenComponent}
          />
          <Tab.Screen
            name="Add"
            options={{
              tabBarIcon: makeTabBarIcon('square-edit-outline'),
            }}
            component={AddItemComponent}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
