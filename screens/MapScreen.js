import { StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import MapPreview, { Marker } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const MapScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState(null)
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const handleSaveLocation = () => {
        if(selectedLocation) {
            navigation.navigate('Nuevo', { mapLocation: selectedLocation })
        }
    }
    
    const handleSelectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => handleSaveLocation()} hitSlop={{ top: 20, left: 20, right: 20, bottom: 20}} >
                    <Ionicons name='md-save-outline' color='black' size={22} />
                </TouchableOpacity>
        )})
    }, [navigation, handleSaveLocation])

    return (
        <MapPreview initialRegion={initialRegion} style={styles.container} onPress={handleSelectLocation}>
            {selectedLocation && (
                <Marker
                    title='Ubicacion seleccionada'
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng
                    }}
                />
            )}
        </MapPreview>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapScreen