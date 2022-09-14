import { URL_API } from "../../constants/DataBase";

export const GET_ORDERS = 'GET_ORDERS';
export const DELETE_ORDER = 'DELETE_ORDER';

export const getOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${URL_API}ordenes.json`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            const orders = Object.keys(result).map(key => ({
                ...result[key],
                id: key
            }));

            dispatch({
                type: GET_ORDERS,
                payload: orders,
            })
        } catch(error) {
            console.log(error.message)
        }
    }
}

export const deleteOrder = (id) => {
    return async dispatch => {
        try {
            await fetch(`${URL_API}ordenes/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({ type: DELETE_ORDER, orderID: id})
        } catch(error) {
            console.log(error.message)
        }
    }
}