import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import PopularCard from "../../components/PopularCard";
import { useParams } from 'react-router-dom';
import axios from "axios";

const SpecificProducts = () => {

    const params = useParams();
    const [products, setProducts] = useState();
    const [similarProduct, setSimilarProduct] = useState([]);

    useEffect(() => {
        if (params?.slug) getProducts();
    }, [params?.slug])

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params?.slug}`);
            setProducts(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    };

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`);
            setSimilarProduct(data?.products)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Layout title={"Product Details - FoodHouse"} >
            <div className='max-w-screen-2xl mx-auto py-48' >
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col md:space-x-10 lg:flex-row">
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${products?._id}`} className='max-w-screen-sm' />
                        <div>
                            <h1 className="text-5xl font-bold">{products?.name}</h1>
                            <p className="pt-6"><span className='font-bold' >Description:</span> {products?.description}</p>
                            <p className="pt-6"><span className='font-bold' >Category</span> $ {products?.category.name}</p>
                            <p className='pt-6' ><span className='font-bold' >Price:</span> $ {products?.price}</p>
                            <button className="btn btn-primary mt-6">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className='mt-20' >
                    <h1 className='text-5xl text-black text-center' > More Products Like This </h1>
                    <h2> {similarProduct?.length < 1 && (<p> No Similar Products Found </p>)} </h2>
                    <div className='mt-10' >
                        <div className="flex flex-row space-x-10" >
                            {
                                similarProduct?.map((item) => (
                                    <div className="card w-96 bg-base-100 shadow-xl" key={item._id} >
                                        <figure className="px-10 pt-10">
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${item._id}`} alt="Shoes" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h1 className="card-title">{item.name}</h1>
                                            <p>{item.description}</p>
                                            <div className="card-actions mt-3">
                                                <button className="btn btn-primary">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default SpecificProducts