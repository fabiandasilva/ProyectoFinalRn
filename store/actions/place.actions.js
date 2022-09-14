import * as FileSystem from 'expo-file-system';
import { API_MAPS_KEY } from '../../constants/DataBase';
import { fetchAddress, insertAddress } from '../../db';

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'

export const addPlace = (title, image, location) => {
    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_MAPS_KEY}`);

        if(!response.ok) throw new Error('No se ha podido comunicar con Google Maps API')

        const resData = await response.json();
        if(!resData.results) throw new Error('No se ha podido obtener la dirección')

        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName

        try {
            await FileSystem.moveAsync({
                from: image,
                to: Path
            })

            const result = await insertAddress(
                title,
                Path,
                address,
                location.lat,
                location.lng
            )
            
            dispatch({ type: ADD_PLACE, payload: { 
                id: result.insertId,
                title, 
                image: Path, 
                address,
                lat: location.lat,
                lng: location.lng
            }})
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
}

export const loadAddress = () => {
    return async dispatch => {
        try {
            const result = await fetchAddress()
            console.log(result)
            dispatch({ type: LOAD_PLACES, places: result.rows._array})
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
}