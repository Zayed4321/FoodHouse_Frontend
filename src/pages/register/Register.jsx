import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import "../register/register.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reconfirmPassword, setReconfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();


  // Form handling to catch all the values typed by user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The process.env option doen't work so we have to fix and change codes on the vite.config.js file to make it work
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/addUser`, {
        name, email, password, reconfirmPassword, phone, answer
      });

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/');
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <section className='section register' >
        <div className="register__box">
          <div className="register__title">
            <h1> Please Register First to Join Our Community </h1>
          </div>
          <form className='register__form' onSubmit={handleSubmit} >
            <div className="form__input">
              <input type="text" placeholder='Your Name' className='form__control' name='form_name' value={name} onChange={(e) => { setName(e.target.value) }} required />
            </div>
            <div className="form__input">
              <input type="text" placeholder='Your Email' className='form__control' name='form_name' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
            </div>
            <div className="form__input">
              <input type="text" placeholder='New Password' className='form__control' name='form_name' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
            </div>
            <div className="form__input">
              <input type="text" placeholder='Rewrite Password' className='form__control' name='form_name' value={reconfirmPassword} onChange={(e) => { setReconfirmPassword(e.target.value) }} required />
            </div>
            <div className="form__input">
              <input type="text" placeholder='Phone Number (Optional)' className='form__control' name='form_name' value={phone} onChange={(e) => { setPhone(e.target.value) }} required />
            </div>
            <div className="form__input">
              <input type="text" placeholder='Your Favourite Subject' className='form__control' name='form_name' value={answer} onChange={(e) => { setAnswer(e.target.value) }} required />
            </div>
            <div className="register__button_box">
              <div className="register__button">
                <button type='submit' > Register </button>
              </div>
            </div>
            <div className="register__button_box">
              <div className="nav__login">
                <NavLink to={"/"} > <span> <FaArrowLeft /> </span> Go Back to Login </NavLink>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register