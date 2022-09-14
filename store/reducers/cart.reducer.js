import { ADD_ITEM, REMOVE_ITEM, CONFIRM_CART } from '../actions/cart.actions';

const INITIAL_STATE = {
    items: [],
    total: 0
}

const sumTotal = (list) => list
    .map(item => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);

const CartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_ITEM:
            let updatedCart = [];

            if (state.items.find(item => item.id === action.item.id)) {
                updatedCart = state.items.map(item => {
                    if (item.id === action.item.id) item.quantity++;
                    return item;
                })
            } else {
                const item = {...action.item, quantity: 1}
                updatedCart = [...state.items, item]
            }

            return {
                ...state,
                items: updatedCart,
                total: sumTotal(updatedCart)
            }
        case REMOVE_ITEM:
            const filteredCart = state.items.filter(item => item.id !== action.itemID);
            return {
                ...state,
                items: filteredCart,
                total: sumTotal(filteredCart)
            }
        case CONFIRM_CART:
            if(action.confirm) {
                return {
                    ...state,
                    items: [],
                    total: 0
                }
            }
        default:
            return state
    }

}

export default CartReducer;