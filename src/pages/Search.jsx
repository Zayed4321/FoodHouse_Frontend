import React from 'react'
import Layout from "../components/Layout/Layout";
import { useSearch } from '../context/SearchContext';
import PopularCard from "../components/PopularCard";


const Search = () => {

    const [values, setValues] = useSearch();

    console.log(values?.results.length)

    return (
        <Layout title={"Search Results - FoodHouse"} >
            <div className='max-w-2xl mx-auto py-48' >
                <h1> Showing Your Search Results </h1>
                <h6>
                    {
                        values?.results.length < 1 ? "No Results Found" : `${values?.results.length} results found`
                    }
                </h6>
                {/* Products card Map */}
                <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 mt-5" >
                    {
                        values?.results.map((item) => (
                            <PopularCard key={item._id} item={item} />
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Search