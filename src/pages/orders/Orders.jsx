import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/UserMenu';
import axios from "axios";
import { useAuth } from '../../context/authContext';
import moment from 'moment';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/orders`);

            setOrders(data)

        } catch (error) {
            console.log(error)
        }
    };

    console.log(orders)

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={"My Orders - FoodHouse"} >
            <div className='container-fluid' >
                <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24' >
                    <div className="basis-3/12">
                        <UserMenu />
                    </div>
                    <div className="basis-9/12 p-5">
                        All Orders
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div key={i} className='p-3 rounded-md shadow-lg mt-10'  >
                                        <div className="overflow-x-auto">
                                            <table className="table">

                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Sl
                                                        </th>
                                                        <th>Status</th>
                                                        <th>Buyer</th>
                                                        <th>Date</th>
                                                        <th>Payment</th>
                                                        <th>Quantity</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {/* row 1 */}
                                                    <tr>
                                                        <th>
                                                            {i + 1}
                                                        </th>
                                                        <td>
                                                            {o?.status}
                                                        </td>
                                                        <td>{o?.buyer?.name}</td>
                                                        <td>{moment(o?.createAt).fromNow()}</td>
                                                        <td>{o?.payment?.success ? "Success" : "Failure"}</td>
                                                        <td>{o?.products?.length}</td>
                                                    </tr>

                                                </tbody>

                                            </table>

                                            <div>
                                                <div className='bg-sgreen text-white'>
                                                    <div className='flex flex-row justify-around items-center mb-5 mt-3' >
                                                        <div className='w-[5%]' >#</div>
                                                        <div className='w-[15%]'>Food</div>
                                                        <div className='w-[20%]'>Item Name</div>
                                                        <div className='w-[20%] text-center'>Description</div>
                                                        <div className='w-[15%] text-center'>Quantity</div>
                                                        <div className='w-[15%]'>Price</div>
                                                    </div>
                                                </div>
                                                {
                                                    o?.products?.map((p, index) => (
                                                        <div className='flex flex-row items-center justify-around border-b border-black border-opacity-10 mb-2' key={index}>
                                                            <div className='w-[5%]'>{index + 1}</div>
                                                            <div className="avatar w-[15%]">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <figure>
                                                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p?._id}`} alt='Food Image' className='rounded-badge hover:scale-105 hover: transition-all duration-200' />
                                                                    </figure>
                                                                </div>
                                                            </div>
                                                            <div className="font-bold w-[20%]">{p?.name}</div>
                                                            <div className='w-[20%]' >{p?.description}</div>
                                                            <div className='w-[15%] text-center'>{p?.quantity}</div>
                                                            <div className='w-[15%]'>{p?.price}</div>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders