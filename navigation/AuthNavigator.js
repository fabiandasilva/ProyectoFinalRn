import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator
        initialRouteNam='Auth'
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;
