import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const LocationSelector = ({onLocation, mapLocation}) => {
    const [pickedLocation, setPickedLocation] = useState();
    const navigation = useNavigation();

    const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissions();
        if (!isLocationOk) {

            return
        }

        const location = await Location.getCurrentPositionAsync({
            timeout: 2000,
        });

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
        onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesitas permisos para usar la localización',
                [{ text: 'OK' }]
            )
            return false;

        }
        return true
    }

    const handlePickOnMap = async() => {
        const isLocationOk = await verifyPermissions();
        if (!isLocationOk) {
            return
        }
        navigation.navigate('Map')
    }

    useEffect(() => {
        if(mapLocation) {
            setPickedLocation(mapLocation)
            onLocation(mapLocation)
        }
    }, [mapLocation])

    return (
        <View style={styles.container}>
            <MapPreview location={pickedLocation} style={styles.preview}>
                <Text>Location en proceso...</Text>
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title='Obtener location'
                    color={COLORS.PEACH_PUFF}
                    onPress={handleGetLocation}
                />
                <Button
                    title='Elegir del mapa'
                    color={COLORS.LIGTH_PINK}
                    onPress={handlePickOnMap}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default LocationSelector;