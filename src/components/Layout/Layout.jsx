import React from 'react';
import Footer from '../Footer';
import Navbar from '../navbar/Navbar';
import Helmet from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main className='min-h-screen' >
        {children}
      </main>
      <Footer />
    </div>
  )
};

Layout.defaultProps = {
  title: "FoodHub - Order Now",
  description: "This is a Food Ordering Website that is made by Zayed Alam",
  keywords: "food, online, order, purchase, eat, drink, pizza, juice, taste",
  author: "Zayed Alam"
}

export default Layout