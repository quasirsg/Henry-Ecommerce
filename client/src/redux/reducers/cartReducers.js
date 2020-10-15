const initialState = {
    products: []
}

function cartReducers(state = initialState, action) {
    switch (action.type) {
        case 'ALL':
            return {
                ...state,
                products: []
            }
        default:
            return state;
    }
}

export default cartReducers;