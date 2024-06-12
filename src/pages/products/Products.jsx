import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin4Line } from "react-icons/ri";


const Products = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-product`);

            if (data?.success) {
                setProducts(data?.products);
            };
        } catch (error) {
            console.log("Error:", error.message);
            toast.error("Error fetching products. Please try again later.");
        }
    };

    useEffect(() => {
        getAllProducts();

    }, []);

    // To handle the delete button 

    const handleDelete = async (e) => {
        try {
            let answer = window.prompt("Are you sure you want to delete this product")
            if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${e}`);
            toast.success("Product Deleted Successfully");
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.log("Error:", error.message);
            toast.error("Failed to Delete Product");
        }
    }

    return (
        <Layout title="All Products - FoodHouse" >
            <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24' >
                <div className='flex flex-row' >
                    <div className="basis-3/12">
                        <AdminMenu />
                    </div>
                    <div className="basis-9/12 p-7">
                        <div className='flex flex-row flex-wrap gap-3' >
                            {
                                products.map((p) => (
                                    <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`} >
                                        <div className="card card-side bg-base-100 shadow-xl w-[480px] h-[250px]">
                                            <figure><img className='w-[200px] h-[200px] rounded-full ml-2' src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`} alt="Movie" /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{p.name}</h2>
                                                <p>{p.description}</p>
                                                <p className='text-lg font-semibold' > $ {p.price} </p>
                                                <div className="card-actions justify-end">
                                                    <Link to={`/dashboard/admin/update-product/${p.slug}`} > <button className="btn btn-primary"  >Edit</button> </Link>
                                                    <button className="btn btn-error" onClick={() => handleDelete(p._id)} ><RiDeleteBin4Line /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products