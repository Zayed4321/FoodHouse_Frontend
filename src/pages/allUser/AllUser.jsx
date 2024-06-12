import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const AllUser = () => {
    return (
        <Layout title={"All Users Dash - FoodHouse"} >
            <div className='container-fluid' >
                <div className="flex flex-row">
                    <div className="basis-3/12">
                        <AdminMenu />
                    </div>
                    <div className="basis-9/12 p-5">
                        All Users
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AllUser