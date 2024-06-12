import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from "axios"
import PopularCard from '../../components/PopularCard';

const CategoryProduct = () => {

    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) getProducts()
    }, [params?.slug]);

    return (
        <Layout>
            <div className='max-w-screen-2xl container mx-auto text-center py-48' >
                <h1> {category?.name} </h1>
                <h6> {product?.length} results found </h6>
                <div className='mt-10' >
                    {/* Products card Map */}
                    <div className="flex flex-row flex-wrap space-x-8 justify-center" >
                        {
                            product.map((item) => (
                                <PopularCard key={item._id} item={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct