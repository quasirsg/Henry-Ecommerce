import { ADD_AMOUNT, SUBTRACT_AMOUNT } from './actionTypes';

export const addAmount = ({ id }) => {
    return {
        type: ADD_AMOUNT,
        productId: id
    }
}

export const subtractAmount = ({ id }) => {
    return {
        type: SUBTRACT_AMOUNT,
        productId: id
    }
}