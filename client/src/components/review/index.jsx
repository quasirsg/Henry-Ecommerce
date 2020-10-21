import React from 'react'
import { Col, Row } from 'reactstrap'
import { StarRatings } from 'react-star-ratings'
const Review = ({ userImage, userName, points, description }) => {
    return (
        <Col
            lg="12"
            className="reviews"
        >
            <Row>
                <Col lg="4">
                    <div className="reviews__container">
                        <div className="reviews___userImage">
                            <img src={userImage} alt="imagen alternativa" />
                        </div>
                        <div className="reviews__userInfo">
                            <div className="reviews__title">
                                {userName}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg="8">
                    <div className="reviews__stars">
                        <StarRatings
                            rating={points}
                            isSelectable={false}
                            starRatedColor="blue"
                            changeRating={() => changeRating}
                            starHoverColor="yellow"
                            starDimension="16px"
                            numberOfStars={5}
                            name="rating"
                        />
                    </div>
                    <div className="reviews__description">
                        {description}
                    </div>
                </Col>
            </Row>
        </Col>
    );
}