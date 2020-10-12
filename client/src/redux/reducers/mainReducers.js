import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import {combineReducers} from 'redux';

const mainReducers= combineReducers ({
    products: productReducers,
    category: categoryReducers
})

export default mainReducers;
