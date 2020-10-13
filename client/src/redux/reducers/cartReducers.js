initialState = {

}

function cartReducers(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: state.category.concat(action.category)
            }
        default:
            return state;
    }
}

export default cartReducers;