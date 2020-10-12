import {GET_CATEGORY} from '../actions/actionTypes';

const initialState={
    category:[]
}

function categoryReducers(state=initialState, action) {
    switch(action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: state.category.concat(action.category)
            }
            default:
                return state;
    }
}

export default categoryReducers;