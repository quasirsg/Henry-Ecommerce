import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import cartReducers from './cartReducers';

import { combineReducers } from 'redux';

const mainReducers = combineReducers({
    products: productReducers,
    category: categoryReducers,
    cart: cartReducers
})

export default mainReducers;
