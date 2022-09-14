import React from 'react'
import { Image, Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {CategoriesScreen} from '../screens/CategoriesScreen'
import {CategoryBreadScreen} from '../screens/CategoryBreadScreen'
import {BreadDetailScreen} from '../screens/BreadDetailScreen'
import { COLORS } from '../constants/colors'

const Stack = createNativeStackNavigator()

const Logo = () => {
    return (
        <Image source={require('../assets/icon.png')} style={{width: 50, height: 50}}/>
    )
}


const ShopNavigator = () => {
    return (
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? COLORS.primary : COLORS.accent
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary,
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>
                <Stack.Screen name='Home' component={CategoriesScreen} options={{ /* headerTitle: (props) => <Logo {...props} /> */ title: 'Mi pan'}}/>
                <Stack.Screen name='Products' component={CategoryBreadScreen} options={({route}) => ({ title: route.params.name})}/>
                <Stack.Screen name='Detail' component={BreadDetailScreen} options={({route}) => ({title: route.params.bread.name})} />
            </Stack.Navigator>
    )
}
export default ShopNavigator;