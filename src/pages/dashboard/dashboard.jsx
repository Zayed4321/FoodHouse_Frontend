import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/authContext'
import UserMenu from '../../components/UserMenu';

const dashboard = () => {

    const [auth] = useAuth();
    console.log(auth)

    return (
        <Layout title={"Dashboard - FoodHouse"} >
            <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24' >
                <div className='basis-3/12' >
                    <UserMenu />
                </div>
                < div className="flex flex-col basis-9/12 p-5" >
                    <div className="card w-96 bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title"> {auth?.user?.name}</h2>
                            <h1> {auth?.user?.email} </h1>
                            <h1> Contact No: {auth?.user?.phone} </h1>
                            {
                                console.log(auth?.user)
                            }
                        </div>
                    </div>
                </div >
            </div>
        </Layout>
    )
}

export default dashboard

