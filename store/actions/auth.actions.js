import { URL_AUTH_SIGNUP, URL_AUTH_SIGIN } from "../../constants/DataBase";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(URL_AUTH_SIGNUP, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorResponse = await response.json();
            const errorID = errorResponse.error.message;

            let message = 'No se ha podido registrar';
            if ( errorID === 'EMAIL_EXISTS') message = 'Este email ya esta registrado';

            console.log(message)
        }

        const data = await response.json();

        dispatch({
            type: SIGNUP,
            token: data.idToken,
            userId: data.localId,
        })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(URL_AUTH_SIGIN, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorResponse = await response.json();

            const errorID = errorResponse.error.message;

            let message = 'No se ha podido iniciar sesión';
            if ( errorID === 'EMAIL_NOT_FOUND') message = 'El email no existe';
            if ( errorID === 'INVALID_PASSWORD') message = 'La contraseña no es correcta';

            console.log(message)
        }

        const data = await response.json();

        dispatch({
            type: LOGIN,
            token: data.idToken,
            userId: data.localId,
        })
    }
}