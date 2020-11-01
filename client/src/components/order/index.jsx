import React, { useState } from 'react';
import { Col, Row, Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap';

import './order.css';

const Order = ({ products, status }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <Col lg="12">
            <div className="order__card">
                <div className="order__status">
                    {status}
                </div>
                <div className="order__content">
                    {products.length > 0
                        ?
                        <div className="order__images">
                            {products.map(product =>
                                <div className="order__img">
                                    <img className="order__image" src={product.image} alt={product.title} />
                                </div>
                            )}
                        </div>
                        :
                        <div className="order__product">
                            <div className="order__image">
                                {products[0].image}
                            </div>
                            <Row>
                                <div className="order__title">
                                    {products[0].name}
                                </div>
                                <div className="order__cuantity">
                                    4000
                            </div>
                            </Row>
                        </div>
                    }
                    <Button color="danger" onClick={toggle}>Ver detalle</Button>
                    <Modal isOpen={modal} toggle={toggle} className="order__modal">
                        <ModalHeader toggle={toggle} close={closeBtn}>Modal title</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                    </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </Col>
    );
}

export default Order;