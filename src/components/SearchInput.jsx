import React from 'react'
import { useSearch } from '../context/SearchContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchInput = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    console.log(values)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search-product/${values.keywords}`);

            setValues({ ...values, results: data });
            navigate("/search");

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <div className="form-control border border-sgreen w-full rounded-full overflow-hidden relative">
                    <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="  Search" className="input pl-10 w-full"
                        value={values.keywords} onChange={(e) => setValues({ ...values, keywords: e.target.value })} />
                </div>
            </form>
        </div>
    )
}

export default SearchInput