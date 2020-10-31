import React, { useEffect } from 'react'
import Order from '../order';
import { getOrders } from '../../redux/actions/ordenActions';
import { useDispatch, useSelector } from 'react-redux';

const UserOrders = ({ id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    })
    return (
        <div className="userOrders">
            <h1>En Desarrollo!</h1>
        </div>
    );
}

export default UserOrders;