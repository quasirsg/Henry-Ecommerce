import React, { useEffect } from 'react'
import Order from '../order';
import { getUsersOrders } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'reactstrap';

const UserOrders = ({ id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersOrders(2));
    }, [id]);

    const orders = useSelector(state => state.users.orders);
    return (
        <div className="userOrders">
            {orders.length > 0
                ?
                orders.map(orden =>
                    <Order
                        key={orden.id}
                        products={orden.products}
                        status={orden.status}
                    />
                )
                :
                <Col>No encontramos ordenes!</Col>
            }
        </div>
    );
}

export default UserOrders;