import axios from 'axios';
import * as actionTypes from './actionTypes';

const url='http://localhost:3001/category';

export const getCategory =()=>(dispatch)=>{
    axios.get(url)
        .then((res)=>{
            dispatch({
                type:actionTypes.GET_CATEGORY,
                category: res.data.category
            })
    
        }).catch((err)=> console.log(err))
};