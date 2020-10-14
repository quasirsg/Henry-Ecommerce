import axios from 'axios';
import { GET_CATEGORY } from './actionTypes';

const url = 'http://localhost:3001/category';

export const getCategory = () => (dispatch) => {
    axios.get(url)
        .then((res) => {
            console.log(res);
            dispatch({
                type: GET_CATEGORY,
                category: res.data.category
            })
        }).catch((err) => console.log(err))
};