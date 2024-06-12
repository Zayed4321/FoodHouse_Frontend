import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import "../home/home.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Home = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();

  const authData = localStorage.getItem("auth");

  // Using this function will cause anyone who is not logged in to first go to the login page and then login to come to the home page

  if (authData) {

    // If we don't use useeffect then navigate will not work properly
    return useEffect(() => {
      navigate('/home')
    }, []);
  }

  // Form handling to catch all the values typed by user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The process.env option doen't work so we have to fix and change codes on the vite.config.js file to make it work
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/userLogin`, {
        email, password
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || '/home');
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <section className="home" >
      <div className="bg">
        <div className="login__box">
          <div className="site__name mb-4 pl-2">The Food House</div>
          <form className="form__area mb-2" onSubmit={handleSubmit} >
            <input type="text" className="w-full mb-2 py-2 form__control" placeholder="Your Email ID" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="text" className="w-full mb-2 py-2 form__control" placeholder="Your Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <div className="login__button-box">
              <button type='submit' className="login__button mb-1 "> Login </button>
            </div>
            <div className="login__button-box">
              <NavLink to={'/forgot-pass'} type='button' className="login__button mb-1 "> Forgot Password </NavLink>
            </div>
          </form>

          <div className="form__register pl-2"> If you are new here, please <span> <Link to={"/register"} > Register </Link> </span></div>
        </div>
      </div>
    </section>
  )
}

export default Home