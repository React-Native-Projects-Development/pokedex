import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParams} from './Navigator';
import {SearchScreen} from '../screens/SearchScreen';
import {PokemonScreen} from '../screens/PokemonScreen';

const Tab2 = createNativeStackNavigator<RootStackParams>();

export const Tab2Screen = () => {
  return (
    <Tab2.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Tab2.Screen name="HomeScreen" component={SearchScreen} />
      <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
    </Tab2.Navigator>
  );
};
