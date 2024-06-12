import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useAuth } from '../../context/authContext';
import moment from 'moment';

const AdminOrder = () => {
    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipping", "Delivered", "Cancelled"]);
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/users/order-status/${orderId}`, { status: value });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title="All Client Orders - FoodHouse">
            <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24'>
                <div className='flex flex-row'>
                    <div className="basis-3/12">
                        <AdminMenu />
                    </div>
                    <div className="basis-9/12 p-7">
                        <div className='flex flex-col flex-wrap gap-3 justify-center items-center'>
                            <h1 className='text-3xl font-bold text-center'> All The Orders Placed By Customers </h1>
                            <div>
                                {
                                    orders?.map((o, i) => (
                                        <div key={i} className='p-3 rounded-md shadow-lg mt-10'>
                                            <div className="overflow-x-auto">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Sl</th>
                                                            <th>Status</th>
                                                            <th>Buyer</th>
                                                            <th>Date</th>
                                                            <th>Payment</th>
                                                            <th>Quantity</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>{i + 1}</th>
                                                            <td>
                                                                <select
                                                                    className="select w-full max-w-xs"
                                                                    defaultValue={o?.status}
                                                                    onChange={(e) => handleChange(o?._id, e.target.value)}
                                                                >
                                                                    {
                                                                        status.map((s, i) => (
                                                                            <option key={i} value={s}>{s}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td>{o?.buyer?.name}</td>
                                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                                            <td>{o?.payment?.success ? "Success" : "Failure"}</td>
                                                            <td>{o?.products?.length}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div>
                                                    <div className='bg-sgreen text-white'>
                                                        <div className='flex flex-row justify-around items-center mb-5 mt-3'>
                                                            <div className='w-[5%]'>#</div>
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
                                                                <div className='w-[20%]'>{p?.description}</div>
                                                                <div className='w-[15%] text-center'>{p?.quantity}</div>
                                                                <div className='w-[15%]'>{p?.price}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrder;
