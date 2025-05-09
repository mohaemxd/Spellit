import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpellGame from '../components/SpellGame';
import Account from '../screens/Account';
import GeneralSettings from '../screens/GeneralSettings';

export type RootStackParamList = {
  Home: undefined;
  Account: undefined;
  GeneralSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={SpellGame} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 