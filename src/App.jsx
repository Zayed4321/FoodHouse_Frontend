import { BrowserRouter, Route, Routes, } from "react-router-dom";
import './App.css'
import Home from "../src/pages/home/Home";
import Register from "./pages/register/Register";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Start from "./pages/start/Start";
import Dashboard from "./pages/dashboard/dashboard";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/Routes/PrivateRoute";
import ForgotPass from "./pages/forgotPass/ForgotPass";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AllUser from "./pages/allUser/AllUser";
import CreateCategory from "./pages/createCategory/CreateCategory";
import CreateProduct from "./pages/createProduct/CreateProduct";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import Menu from "./pages/menu/Menu";
import AddToCart from "./pages/addToCart/AddToCart";
import Products from "./pages/products/Products";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import Search from "./pages/Search";
import SpecificProducts from "./pages/specificProducts/SpecificProducts";
import CategoryProduct from "./pages/categoryProduct/CategoryProduct";
import AdminOrder from "./pages/adminOrder/AdminOrder";

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-right" transition={Bounce} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute />} >
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />} >
            <Route path="admin/info" element={<AdminDashboard />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
            <Route path="admin/allUsers" element={<AllUser />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/orders" element={<AdminOrder />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Start />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/single-product/:slug" element={<SpecificProducts />} />
          <Route path="/addToCart" element={<AddToCart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
