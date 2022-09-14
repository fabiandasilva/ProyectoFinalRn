import { useCallback, useState, useReducer } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View, Text, TouchableOpacity, TextInput, Button, Alert } from "react-native";
import { COLORS } from '../constants/colors';
import { signup, login } from '../store/actions/auth.actions';
import { useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

export const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE) {
        const inputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const inputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true;

        for ( const key in inputValidities) {
            formIsValid = formIsValid && inputValidities[key];
        }

        return {
            formIsValid,
            inputValues,
            inputValidities
        }
    }
    return state
}

const AuthScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    const title = 'REGISTRO',
        message = 'Ya tienes cuenta?',
        messageAction = 'Ingresar',
        messageTarget = 'Login';

    const handleSignUp = () => {
        if(formState.formIsValid) {
            dispatch(signup(formState.inputValues.email, formState.inputValues.password));
        } else {
            Alert.alert(
                'Formulario invalido',
                'Ingrese email y usuario valido',
                [{ text: 'OK' }]
            )
        }
    }

    const onInputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.screen}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize='none'
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text style={styles.label}>Clave</Text>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize='none'
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Button title='Registrame' onPress={handleSignUp} />
                </View>
                <View style={styles.prompt}>
                    <Text style={styles.promptMessage}>{message}</Text> 
                    <TouchableOpacity onPress={() => dispatch(login(email, password))}>
                        <Text style={styles.promptButton}>{messageAction}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'OpenSansBold',
        marginBottom: 18,
        textAlign: 'center'
    },
    container: {
        width: '80%',
        height: '40%',
        maxWidth: 400,
        padding: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgrounColor: 'white',
    },
    prompt: {
        alingItems: 'center',
    },
    promptMessage: {
        fontSize: 16,
        fontFamily: 'OpenSans',
        color: '#333',
    },
    promptButton: {
        fontSize: 16,
        fontFamily: 'OpenSansBold',
        color: COLORS.primary
    },
    button: {
        backgrounColor: COLORS.primary,
    },
    inputContainer: {
        justifyContent: 'space-around',
        height: '40%'
    },
    input: {
        width: '100%',
        borderBottomWidth: 1.5,
        borderColor: 'grey',
    }
})

export default AuthScreen