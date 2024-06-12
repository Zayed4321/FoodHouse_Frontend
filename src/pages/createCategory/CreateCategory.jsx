import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/forms/categoryForm';
import { Button, Modal } from 'antd';

const CreateCategory = () => {

    const [categories, setCategories] = useState();
    const [name, setName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // The below codes are functions that help to open and close the Modal we use in edit system

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // We will now handle the update form system below

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });

            if (data?.success) {
                toast.success(data?.message);
                setSelected(null);
                setUpdatedName("")
                setIsModalOpen(false);
                getAllCategory();
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Error to Update Category")
        }
    };

    // We will handle the category form system in this section and take the form value to display in the table below

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });

            if (data.success) {
                toast.success(`${name} is created`)
                getAllCategory();

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Error in Form Input");
        }
    }

    //  We will be using axios to get all the category to show in our website

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);

            if (data?.success) {
                setCategories(data?.allCategory);
            };
        } catch (error) {
            console.log(error);
            toast.error("Trouble in creating Category");
        }
    };

    useEffect(() => {
        getAllCategory();

    }, [handleUpdate]);

    // We will now handle the Delete system of our category

    const handleDelete = async (cid) => {
        try {
            const data = axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${cid}`);

            if (data.success) {
                toast.success("Category is Deleted");
                getAllCategory();
            }

        } catch (error) {
            console.log(error);
            toast.error("Error in Deleting")
        }
    };

    return (
        <Layout title={"Category Dash - FoodHouse"} >
            <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24' >
                <div className="flex flex-row">
                    <div className="basis-3/12">
                        <AdminMenu />
                    </div>
                    <div className="basis-9/12 p-7">
                        <div> <h1 className='pb-2 text-xl font-semibold text-sgreen' > Manage My Category </h1> </div>

                        {/* This is the form through which we will enter all the name of category. Whatever we made above such as name, setName, handleCategorySubmit those things we need to pass into the categoryform component */}
                        <div className='p-3' >
                            <CategoryForm handleCategorySubmit={handleCategorySubmit} value={name} setValue={setName} />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className='w-64 font-bold' >Name</th>
                                        <th className='w-64 font-bold'>Action</th>
                                        <th className='w-64 font-bold'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table Row */}
                                    {
                                        categories?.map((c) => (
                                            <>
                                                <tr>
                                                    <td key={c._id} > {c.slug} </td>
                                                    <td> <button className='btn btn-primary text-white' onClick={() => { setIsModalOpen(true); setUpdatedName(c.slug); setSelected(c); }} > Edit </button> </td>
                                                    <td> <button onClick={() => {
                                                        handleDelete(c._id);
                                                    }} className='btn btn-danger' > Delete </button> </td>
                                                </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Modal title="Update Category" className='z-[99999999] text-center' footer={null} open={isModalOpen} onCancel={handleCancel}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleCategorySubmit={handleUpdate} setModal={setIsModalOpen} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory