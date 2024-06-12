import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import Banner from '../../components/banner/Banner'
import Categories from '../categories/Categories'
import SpecialDish from '../../components/SpecialDish'
import Testimonials from '../../components/Testimonials'
import Service from '../../components/Service'

const Start = () => {

    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();

    // We are taking the help of localstorage to identify if there is any auth logged in already and if it's not then go to login again

    const authData = localStorage.getItem("auth");

    // Using this function will cause anyone who is not logged in to first go to the login page and then login to come to the home page

    if (!authData) {

        // If we don't use useeffect then navigate will not work properly
        return useEffect(() => {
            navigate('/')
        }, []);
    }

    return (
        <Layout title={"FoodHouse - Order Online"} >
            <div>
                <Banner />
                <Categories />
                <SpecialDish />
                <Testimonials />
                <Service />
            </div>

        </Layout>
    )
}

export default Start