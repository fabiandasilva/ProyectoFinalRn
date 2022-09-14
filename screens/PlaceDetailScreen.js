import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useSelector  } from 'react-redux';
import MapPreview from '../components/MapPreview';
import { COLORS, Colors } from '../constants/colors';

const PlaceDetailScreen = ({ route }) => {
    const { placeID } = route.params;
    const place = useSelector(state => state.places.places.find(item => item.id === placeID));

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: place.image }} style={styles.image} />
            <View style={styles.location}>
                <View styles={styles.addressContainer}>
                    <Text>{place.address}</Text>
                </View>
                <MapPreview style={styles.map} location={{ lat: place.lat, lng: place.lng }}>
                    <Text>Ubicacion no disponible</Text>
                </MapPreview>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    location: {
        margin: 20,
        width: '90%',
        maxWidth: 350,
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: COLORS.MAROON,
        textAlign: 'center',
    },
    map: {
        height: 300,
    }
})

export default PlaceDetailScreen;