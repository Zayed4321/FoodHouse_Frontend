import React, { useEffect, useState } from 'react';
import "./navbar.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartContext';


const Navbar = () => {

  // We can use this systemt o set the sticky menu for the entire website

  const [isSticky, setSticky] = useState(false);
  const [cart, setCart] = useCart();
  const categories = useCategory();

  useEffect(() => {

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    }

  }, []);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: "",
    });
    localStorage.removeItem("auth");
    navigate('/');
    toast.success("You are successfully logged out");
  }

  const navItems = (
    <>
      <li><Link to={"/home"} >Home</Link></li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li><Link to={"/menu"} >All</Link></li>
            {
              categories?.map((c) => (
                <div key={c._id} className='text-center' >
                  <li><Link to={`/category/${c.slug}`} >{c.name}</Link></li>
                </div>
              ))
            }
          </ul>
        </details>
      </li>
      <li><Link to={"/services"} > Services </Link></li>
      <li><Link to={"/offers"} > Offers </Link></li>
    </>
  );

  return (
    <header className='container mx-auto max-w-screen-2xl fixed top-0 left-0 right-0' >
      <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost logo__title text-xl"> FoodHouse </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end nav__contact-box">

          {/* Search Button */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>

          {/* Cart Button */}
          <Link to={"/addToCart"} >
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hidden lg:flex">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">{cart ? cart.length : 0}</span>
              </div>
            </div>
          </Link>

          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="nav__contact rounded-full ">{auth?.user?.name}</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin/info' : 'user'}`} > Your Dashboard </NavLink></li>
              <li><a onClick={handleLogout} > <TbLogout2 /> Logout </a></li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar