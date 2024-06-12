import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/authContext'

const AdminDashboard = () => {

    const [auth] = useAuth();

    return (
        <Layout title={"Admin Dash - FoodHouse"} >
            <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24' >
                <div className="flex flex-row">
                    <div className="basis-3/12">
                        <AdminMenu />
                    </div>
                    <div className="basis-9/12 p-5">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title"> {auth?.user?.name}</h2>
                                <h1> {auth?.user?.email} </h1>
                                <h1> Contact No: {auth?.user?.phone} </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard