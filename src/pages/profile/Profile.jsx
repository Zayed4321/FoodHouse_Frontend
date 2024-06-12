import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/UserMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import axios from "axios";

const Profile = () => {

    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // Get User Data

    useEffect(() => {
        if (auth?.user) {
            const { email, name, phone } = auth?.user;
            setName(name);
            setEmail(email);
            setPhone(phone);
        }
    }, [auth?.user]);

    // Form handling to catch all the values typed by user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // The process.env option doen't work so we have to fix and change codes on the vite.config.js file to make it work
            const data = await axios.put(`${process.env.REACT_APP_API}/api/v1/users/profile-update`, {
                name, email, password, phone
            });

            console.log(data)

            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updateUser });
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data?.updateUser
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile is Updated Successfully")
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    };

    return (
        <Layout title={"User Profile - FoodHouse"} >
            <div className='flex flex-row max-w-screen-2xl container mx-auto pt-20 pl-24' >
                <div className='basis-3/12' >
                    <UserMenu />
                </div>
                <div className="card flex flex-col justify-center text-center shrink-0 w-full max-w-2xl shadow-2xl bg-base-100 basis-9/12 mt-5" >
                    <div className="register__title mt-5 font-bold text-2xl">
                        <h1> Update Your Profile </h1>
                    </div>
                    <form className="card-body" onSubmit={handleSubmit} >

                        {/* Name */}
                        <div className="form__input">
                            <input type="text" placeholder='Your Name' className='form__control' name='form_name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>

                        {/* Email I'D */}
                        <div className="form__input">
                            <input type="text" placeholder='Your Email' className='form__control' name='form_name' value={email} onChange={(e) => { setEmail(e.target.value) }} disabled />
                        </div>

                        {/* Change Your Password Here */}
                        <div className="form__input">
                            <input type="text" placeholder='New Password' className='form__control' name='form_name' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        {/* Chnage Your Phone Number */}
                        <div className="form__input">
                            <input type="text" placeholder='Phone Number (Optional)' className='form__control' name='form_name' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                        </div>

                        {/* Button to Update Profile */}
                        <div className="form-control">
                            <button className="btn btn-primary">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Profile