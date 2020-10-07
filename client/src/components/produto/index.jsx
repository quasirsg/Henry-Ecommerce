import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import './Producto.css'

/* ======= Props provisorio ====== */

const props = {
    title: "SHORT FIT COMBINADO",
    description: "Short set de poliester. Negro con recorte de color en la base de la pierna. Talles: S, M, L, XL.",
    price: "$1200",
    enter_date: "06/10/2020",
    img: [{
        src: "https://mirfitness.com.ar/wp-content/uploads/DSC_9928.jpg",
        caption: 0,
        altext: 'Image'
    }, {
        src: "https://mirfitness.com.ar/wp-content/uploads/DSC_9928.jpg",
        caption: 1,
        altext: 'Image'
    }],
    rating: 0,
    reviews: 0
}

const Product = ({ title, description, price, stock, enter_date, img }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [rating, setRating] = useState(0)

    /* ======== Star Rating Handle ======== */
    const changeRating = (newRating, name) => {
        setRating({
            rating: newRating
        });
    }

    /* ======== Slide image ======== */
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.img.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.img.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = props.img.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });


    return (
        <div className='productContainer' >
            <Carousel
                className='productImg'
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={props.img} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
            <div className='productInfo'>
                <div className='title-price'>
                    <h2 className='productTitle'>{props.title}</h2>
                    <p className='inforPrice'>{props.price}</p>
                </div>

                <div className='desc-rating'>
                    <p className='infoCardDescription'>{props.description}</p>
                    <div className='rating-reviews'>
                        <StarRatings
                            rating={rating}
                            starRatedColor="blue"
                            changeRating={() => changeRating}
                            starHoverColor='yellow'
                            starDimension='30px'
                            numberOfStars={5}
                            name='rating'
                        />
                        <p>{props.reviews} reviews</p>
                    </div>

                </div>
                <div className='button-container'>
                    <button className='button'>Add To Cart</button>
                </div>

            </div>


        </div>
    )
}

export default Product;

