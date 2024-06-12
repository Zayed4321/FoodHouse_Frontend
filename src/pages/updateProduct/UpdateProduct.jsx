import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [cat, setCat] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // We will fetch the single-product data here 

  const getSingleProduct = async () => {
    try {

      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`);

      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
      setCategory(data.product.category._id);
      setCat(data.product.category);

    } catch (error) {
      console.log("Error:", error.response);
    }
  }

  // We will keep the Add Product Function here for the button

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const productData = new FormData()

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);


      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);

      if (data?.success) {
        toast.success("Product Updated");
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log("Error:", error.response);
      toast.error("Error Updating product. Please try again later.");
    }
  };

  //  We will be using axios to get all the category to show in our website

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);

      if (data?.success) {
        setCategories(data?.allCategory);
      };
    } catch (error) {
      console.log("Error:", error.response);
      toast.error("Error fetching categories. Please try again later.");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  return (
    <Layout title={"Update Product - FoodHouse"} >
      <div className='flex flex-row max-w-screen-2xl container mx-auto justify-center pt-20' >
        <div className="flex">
          <div className="p-5">
            <h1 className='text-2xl font-bold text-center mb-5' > Update Product </h1>
            {/* This is the category section where we select the category to use */}
            <div className='m-1'>
              <select onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-64 max-w-xs">
                <option value="">{cat.name}</option>
                {categories.map((opts, i) => <option key={i} value={opts._id}>{opts.name}</option>)}
              </select>

            </div>
            <div className='mb-3 mt-2' >
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text btn btn-outline-secondary">{photo ? photo.name : "Upload Product Photo"} </span>
                </div>
                <input type="file" name='photo' accept='image/*' className="file-input file-input-info file-input-bordered w-full max-w-x" onChange={(e) => setPhoto(e.target.files[0])} hidden />
              </label>
            </div>
            <div className='mb-5' >
              {photo ? (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="Product Photo" height={'200px'} className='img img-responsive' />
                </div>
              ) :
                <div className="text-center">
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${id}`} alt="Product Photo" height={'200px'} className='img img-responsive' />
                </div>
              }
            </div>
            <div className="mb-5">
              <label className="input input-bordered flex items-center gap-2">
                <input value={name} type="text" className="grow" placeholder="Enter Product Name Here" onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div className="mb-5">
              <label className='flex items-center textarea textarea-bordered' >
                <textarea value={description} placeholder='Give Product Description' className='grow' onChange={(e) => setDescription(e.target.value)}></textarea>
              </label>
            </div>
            <div className="mb-5">
              <label className="input input-bordered flex items-center gap-2">
                <input value={price} type="number" className="grow" placeholder="Enter Product Price Here" onChange={(e) => setPrice(e.target.value)} />
              </label>
            </div>
            <div className="mb-5">
              <label className="input input-bordered flex items-center gap-2">
                <input value={quantity} type="number" className="grow" placeholder="Enter Product Quantity Here" onChange={(e) => setQuantity(e.target.value)} />
              </label>
            </div>
            <div className='mb-5' >
              <select onChange={(e) => { setShipping(e.target.value) }} className="select select-bordered w-64 max-w-xs">
                <option >{shipping ? "Yes" : "No"}</option>
                <option value="1"> Yes </option>
                <option value="0"> No </option>
              </select>
            </div>
            <div className="flex justify-center mb-5">
              <button className='btn btn-primary' onClick={handleUpdate} > Update Product </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct