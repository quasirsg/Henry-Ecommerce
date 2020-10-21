import React from 'react'
import { Col, Row } from 'reactstrap'
import StarRatings from 'react-star-ratings'
import './review.css';

const Review = ({ userImage, userName, points, description }) => {

    return (
        <Col
            lg="12"
            className="reviews"
        >
            <Row>
                <Col lg="3" className="my-auto">
                    <div className="reviews__container">
                        <div className="reviews___userImage">
                            <img src="/images/userDefaultIcon.png" alt={userName} />
                        </div>
                        <div className="reviews__userInfo">
                            <div className="reviews__title">
                                {userName}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg="9">
                    <div className="reviews__stars">
                        <StarRatings
                            rating={points}
                            starRatedColor="yellow"
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

export default Review;