import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const PopularCard = ({ item }) => {

    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled)
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            <div className={`rating gap-1 absolute right-0 top-0 p-4 heartStar bg-sgreen ${isHeartFilled ? 'text-rose-500' : 'text-white'}`} onClick={handleHeartClick} >
                <FaHeart className='h-5 w-5 cursor-pointer' />
            </div>
            <Link to={`/menu/${item.slug}`} >
                <figure>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${item._id}`} alt='Food Image' className='rounded-badge hover:scale-105 hover: transition-all duration-200' />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`} > <h2 className="card-title">{item.name}</h2> </Link>
                <p>{item.description}</p>
                <h5 className='font-semibold' > <span className='text-sm' >$</span> {item.price} </h5>
                <div className="card-actions justify-end  items-center mt-2">
                    <button className="btn bg-sgreen text-white" onClick={() => {
                        setCart([...cart, item])
                        localStorage.setItem('cart', JSON.stringify([...cart, item]))
                        toast.success("Item is Added to Cart")
                    }} >Add to Cart</button>
                    <button className="btn btn-info text-white" onClick={() => navigate(`/single-product/${item.slug}`)} >Know More</button>
                </div>
            </div>
        </div>
    )
}

export default PopularCard