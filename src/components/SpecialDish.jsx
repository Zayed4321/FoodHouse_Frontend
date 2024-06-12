import React, { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PopularCard from './PopularCard';
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SpecialDish = () => {
    const [recipe, setRecipe] = useState([]);
    let sliderRef = useRef(null);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-product`);

            if (data?.success) {
                const dish = data?.products;
                // Filter returns a new array, so use filter instead of map
                const biryaniRecipes = dish.filter(item => item.category.name === "drinks");
                setRecipe(biryaniRecipes);
                console.log(biryaniRecipes)
            };
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const next = () => {
        sliderRef.slickNext();
    };

    const previous = () => {
        sliderRef.slickPrev();
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };


    return (
        <div className='max-w-screen-2xl mx-auto container xl:px-28 px-6 my-20 relative' >
            <div>
                <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug text-sgreen md:w-[400px]' > FoodHouse Unique Menu </h2>
                <p className='tracking-wide font-medium text-lg' > Presenting all the Special Dishes </p>
            </div>

            <div className='md:absolute right-3 top-8 mb-10 md:mr-24' >
                <button className="btn p-2 rounded-full ml-5" onClick={previous}>
                    <FaAngleLeft className='w-8 h-8 p-1' />
                </button>
                <button className="btn p-2 rounded-full ml-5 bg-sgreen" onClick={next}>
                    <FaAngleRight className='w-8 h-8 p-1' />
                </button>
            </div>

            <Slider ref={slider => { sliderRef = slider; }} {...settings} className='overflow-hidden mt-10 space-x-9' >
                {
                    recipe.map((item) => (
                        <PopularCard key={item._id} item={item} />
                    ))
                }
            </Slider>
        </div>
    )
}

export default SpecialDish;
