import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderItemScreen from '../screens/OrderItemScreen';
import { COLORS } from '../constants/colors'

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Orders"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="Orders"
                component={OrderItemScreen}
                options={{ title: 'Orders' }}
            />
        </Stack.Navigator>
    )   
}

export default OrdersNavigator;