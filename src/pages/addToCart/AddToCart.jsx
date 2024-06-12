import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useAuth } from '../../context/authContext';
import axios from "axios";
import DropIn from 'braintree-web-drop-in-react';
import { toast } from 'react-toastify';

const AddToCart = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(auth)

    const removeItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    };

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => { total = total + item.price; })
            return total.toLocaleString("en-US", {
                style: "currency", currency: "USD"
            });
        } catch (error) {
            console.log(error)
        }
    };

    const totalQuantity = () => {
        try {
            let fullQuantity = 0;
            cart?.map((item) => { fullQuantity = fullQuantity + item.quantity; })
            return fullQuantity
        } catch (error) {
            console.log(error)
        }
    };

    // Get the Payment Gateway Token

    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/tokens`);
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token])

    const handlePayments = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment Completed Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false);
        };
    };

    return (
        <Layout title={"FoodHouse-Customer Cart"}>
            <div>
                {/* Banner Section for Cart Items */}
                <div className='max-w-screen-2xl container mx-auto xl:px-28 px-6 text-center'>
                    <div className="py-40 flex flex-col justify-center items-center gap-8">
                        <div className="space-y-7 px-4">
                            <h2 className='md:text-5xl text-4xl text-black font-bold md:leading-snug leading-snug'>
                                {cart.length > 0 ? `${cart?.length} Items Added to Your` : "You Have An Empty"} <span className='text-sgreen'>Cart</span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Table */}
                <div className="overflow-x-auto max-w-screen-2xl container mx-auto xl:px-28 px-6 text-center">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-sgreen text-white'>
                            <tr>
                                <th>#</th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.length > 0 ? (
                                cart?.map((p, index) => (
                                    <tr key={p._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <figure>
                                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`} alt='Food Image' className='rounded-badge hover:scale-105 hover: transition-all duration-200' />
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{p?.name}</div>
                                                    <div className="text-sm opacity-50">{p?.category?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{p?.description}</td>
                                        <td>
                                            <button className='btn btn-xs' >-</button>
                                            <input type="number" value={p?.quantity} className='w-10 text-center overflow-hidden appearance-none mx-2' />
                                            <button className='btn btn-xs' >+</button>
                                        </td>
                                        <td>{p?.price}</td>
                                        <th>
                                            <button className="btn btn-error btn-sm text-white text-lg" onClick={() => removeItem(p._id)} ><MdDelete /></button>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className='flex items-center justify-center' >
                                        <Link to="/menu" className='py-5 px-5 bg-sgreen rounded-lg text-gray-900'>
                                            Continue Shopping
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* The Customer Details Section */}
                <div className='flex max-w-screen-2xl container mx-auto xl:px-28 px-6 justify-around mt-10' >
                    <div className='w-[40%] border-x border-b border-sgreen' >
                        <h1 className='text-white py-2 px-3 bg-sgreen w-full text-center mb-3' > Cutomer Details </h1>
                        <div className='px-3 flex flex-col items-center justify-center' >
                            <h3> Name : {''} <span className='font-bold italic text-lg mb-3' > {auth?.user?.name} </span> </h3>
                            <h3> Email : {''} <span className='font-bold italic text-lg mb-3' > {auth?.user?.email} </span> </h3>
                            <h3> Phone Number : {''} <span className='font-bold italic text-lg' > {auth?.user?.phone} </span> </h3>
                        </div>
                    </div>
                    <div className='w-[10%]' ></div>
                    <div className='w-[40%] border-x border-b border-sgreen' >
                        <h1 className='text-white py-2 px-3 bg-sgreen w-full text-center mb-3' > Shopping Details </h1>
                        <div className='px-3 flex flex-col items-center justify-center' >
                            <h3> Total Items : {''} <span className='font-bold italic text-lg mb-3' > {cart?.length} </span> </h3>
                            <h3> Total Price : {''} <span className='font-bold italic text-lg mb-3' > {totalPrice()} </span> </h3>
                            <h3> Total Quantity : {''} <span className='font-bold italic text-lg' > {totalQuantity()} </span> </h3>
                            <div className='w-[400px] flex flex-col items-center justify-center mt-10' >
                                {
                                    !clientToken || !cart?.length ? ("") : (
                                        <>
                                            <DropIn options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                },
                                            }} onInstance={instance => setInstance(instance)} />

                                            <button className='py-3 px-3 bg-sgreen rounded-full mt-5 mb-5 cursor-pointer' onClick={handlePayments} > {loading ? "Processing" : "Make Payment"} </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddToCart;
