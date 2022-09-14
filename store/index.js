import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// Reducers
import CategoryReducer from './reducers/category.reducer';
import BreadReducer from './reducers/breads.reducer';
import CartReducer from './reducers/cart.reducer';
import OrderReducer from './reducers/order.reducer';
import AuthReducer from './reducers/auth.reducer';
import PlaceReducer from './reducers/place.reducer';

const RootReducer = combineReducers({
    categories: CategoryReducer,
    breads: BreadReducer,
    cart: CartReducer,
    order: OrderReducer,
    auth: AuthReducer,
    places: PlaceReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))