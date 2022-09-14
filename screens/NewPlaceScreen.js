import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import { COLORS } from '../constants/colors'
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/actions/place.actions';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';

const NewPlaceScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState(null);
    const handleTitleChange = text => setTitle(text)

    const handleSave = () => {
        dispatch(addPlace(title, image, location));
        navigation.navigate('Direcciones');
    }

    return (
        <ScrollView style={{ flex: 1}} scrollEnabled>
                <Text style={styles.label}>Titulo</Text>
                <TextInput 
                    style={styles.input}
                    value={title}
                    onChangeText={handleTitleChange}    
                />
                <ImageSelector onImage={image => setImage(image)} />
                <LocationSelector onLocation={setLocation} mapLocation={route?.params?.mapLocation} />
                <Button title='Grabar Direccion' color={COLORS.MAROON} onPress={handleSave}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
})

export default NewPlaceScreen
