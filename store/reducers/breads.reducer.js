import { BREADS } from '../../data/breads';

// actions
import { SELECT_BREAD, FILTERED_BREAD } from '../actions/bread.actions';

const initialState = { 
    breads: BREADS,
    filteredBread: [],
    selected: null
}

const BreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_BREAD:
            return {
                ...state,
                selected: state.breads.find(bread => bread.id === action.breadID)
            }
        case FILTERED_BREAD:
            return {
                ...state,
                filteredBread: state.breads.filter(bread => bread.category === action.categoryID)
            }
        default: 
            return state
    }
}

export default BreadReducer