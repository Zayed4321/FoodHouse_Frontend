import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout";
import PopularCard from "../../components/PopularCard";
import { } from "react-icons";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import SearchInput from "../../components/SearchInput";
import useCategory from "../../hooks/useCategory";


const Menu = () => {

    const [menu, setMenu] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);


    // We will handle the check funtionality of category here

    const handleFilter = (checkbox, id) => {
        let all = [...checked];

        if (checkbox) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        };

        setChecked(all)
    };

    // We will get all the products from the backend to be displayed here

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-product`);

            if (data?.success) {
                setMenu(data?.products);
                setFilteredItem(data?.products);
                setCurrentPage(1);
            };
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, []);

    useEffect(() => {
        if (checked.length || radio.length) filterProducts();
    }, [checked, radio]);

    //  We will be using axios to get all the category to show in our website

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);

            if (data?.success) {
                setCategories(data?.allCategory);
            };
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Filter the Products as per the Filter bar

    const filterProducts = async () => {
        try {
            console.log("Filter Criteria:", { checked, radio }); // Add this line to check the filter criteria being sent
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`, { checked, radio });
            console.log("Filtered Products:", data); // Add this line to check the filtered products received from the backend
            setFilteredItem(data?.products);
            setCurrentPage(1);
        } catch (error) {
            console.log(error)
        }
    };



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItem.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <Layout title={"Foodhouse - Menu"} >
            <div>
                {/* Banner Part */}
                <div className='max-w-screen-2xl container mx-auto xl:px-28 px-6 text-center ' >
                    <div className="py-48 flex flex-col justify-center items-center gap-8">
                        <div className="space-y-7 px-4">
                            <h2 className='md:text-5xl text-4xl text-black font-bold md:leading-snug leading-snug' > Serving Love and Taste of <span className='text-sgreen' >Food</span></h2>
                            <p className='text-xl text-[#4A4A4A] md:w-4/5 mx-auto' >Join us with your family and stay to enjoy great foods like Salad, Fried Rice, Chicken Briyani, Mutton Polao, Nihari and much more</p>
                            <button className='btn bg-sgreen px-8 py-3 font-semibold text-white rounded-full' > Order Now </button>
                        </div>
                    </div>
                </div>



                {/* ************** Menu Shop section ***************/}
                <div className="max-w-screen-2xl container mx-auto xl:px-28 px-6" >
                    <div className="mb-10 pr-20" >
                        <SearchInput />
                    </div>
                    <div className="flex flex-row" >
                        <div className="basis-3/12 mr-10">
                            <div className="py-3 px-3 rounded-md bg-sgreen" >
                                <h1 className="text-xl text-white text-center" > Filter By Category </h1>
                            </div>
                            <div className="flex flex-col space-y-3 mt-3 pl-2" >
                                {
                                    categories?.map((c) => (
                                        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                                    ))
                                }
                            </div>

                            <div className="py-3 px-3 rounded-md bg-sgreen mt-5" >
                                <h1 className="text-xl text-white text-center" > Filter by Prices </h1>
                            </div>
                            <div className="flex flex-col space-y-3 mt-3 pl-2" >
                                <Radio.Group onChange={(e) => setRadio(e.target.value)} >
                                    {
                                        Prices.map((p) => (
                                            <div key={p._id} className="mb-2 text-xl" >
                                                <Radio value={p.array} >
                                                    {p.name}
                                                </Radio>
                                            </div>
                                        ))
                                    }
                                </Radio.Group>
                            </div>

                            <div className="flex justify-center" >
                                <div className="bg-sgreen rounded-md p-5 mt-5 inline-block " >
                                    <button className="text-white" onClick={() => window.location.reload()} > Reset Filters </button>
                                </div>
                            </div>
                        </div>
                        <div className="basis-9/12">
                            {/* Products card Map */}
                            <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4" >
                                {
                                    currentItems.map((item) => (
                                        <PopularCard key={item._id} item={item} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Section */}
                <div className="flex justify-center my-10 gap-8 py-5" >
                    {
                        Array.from({ length: Math.ceil(filteredItem.length / itemsPerPage) }).map((_, index) => (
                            <button key={index + 1} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-sgreen text-white" : "bg-gray-200"}`} >
                                {index + 1}
                            </button>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Menu