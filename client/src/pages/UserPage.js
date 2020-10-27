import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Person, Lock, BoxSeam, ChatSquareText } from 'react-bootstrap-icons'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonSquare from '../components/custom/ButtonSquare';
import UserDetail from '../components/userDetail';
import UserReviews from '../components/userReviews';


const UserPage = () => {

    // const userId = useSelector(state => state.jwt.userDetail[0].id);

    return (
        <Container
            fluid={true}
            style={{ border: '1px solid #ccc9c9', padding: '2rem 3rem', marginTop: '3rem' }}
        >
            <Router>
                <Row>
                    <Col lg="3">

                        <ul style={{ margin: '0', padding: '3rem 0' }}>
                            <li>
                                <Link to="/user/account">
                                    <ButtonSquare
                                        icon={<Person size={20} />}
                                        onClick={() => console.log('click ja')}
                                        Children={'Mi cuenta!'}
                                    />
                                </Link>
                            </li>
                            <li>
                                <ButtonSquare
                                    icon={<BoxSeam size={20} />}
                                    onClick={() => console.log('click xD')}
                                    Children={'Mis Pedidos!'}
                                />
                            </li>
                            <li>
                                <Link to="/user/reviews">
                                    <ButtonSquare
                                        icon={<ChatSquareText size={20} />}
                                        onClick={() => console.log('click xD')}
                                        Children={'Mis Reviews!'}
                                    />
                                </Link>
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
                        <Route exact path='/user/account' component={() => <UserDetail id={1} />} />
                        <Route exact path="/user/reviews" component={() => <UserReviews id={1} />} />
                    </Col>
                </Row>
            </Router>
        </Container>
    );
}

export default UserPage;