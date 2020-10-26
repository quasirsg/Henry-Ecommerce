import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Person, Lock, BoxSeam, ChatSquareText } from 'react-bootstrap-icons'
import ButtonSquare from '../components/custom/ButtonSquare';
import UserDetail from '../components/userDetail';

const UserPage = () => {

    return (
        <Container
            fluid={true}
            style={{ border: '1px solid #ccc9c9', padding: '2rem 3rem', marginTop: '3rem' }}
        >
            <Row>
                <Col lg="3">

                    <ul style={{ margin: '0', padding: '3rem 0' }}>
                        <li>
                            <ButtonSquare
                                icon={<Person size={20} />}
                                onClick={() => console.log('click xD')}
                                Children={'Mi cuenta!'}
                            />
                        </li>
                        <li>
                            <ButtonSquare
                                icon={<BoxSeam size={20} />}
                                onClick={() => console.log('click xD')}
                                Children={'Mis Pedidos!'}
                            />
                        </li>
                        <li>
                            <ButtonSquare
                                icon={<ChatSquareText size={20} />}
                                onClick={() => console.log('click xD')}
                                Children={'Mis Reviews!'}
                            />
                        </li>
                        <li>
                            <ButtonSquare
                                icon={<Lock size={20} />}
                                onClick={() => console.log('click xD')}
                                Children={'Cambiar Mi Contraseña'}
                            />
                        </li>
                    </ul>
                </Col>
                <Col
                    lg="9"
                    style={{ border: '1px solid #ccc9c9', padding: '3rem 1rem', margin: '3rem 0' }}
                >
                    <UserDetail />
                </Col>
            </Row>
        </Container>
    );
}

export default UserPage;