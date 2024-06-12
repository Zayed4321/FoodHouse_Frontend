import React from 'react';
import chefImg from "../assets/chef.jpg";
import img1 from "../assets/mask1.png";
import img2 from "../assets/mask2.png";
import img3 from "../assets/mask3.png";
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    return (
        <div className='max-w-screen-2xl mx-auto container xl:px-28 px-6' >
            <div className='flex flex-col md:flex-row items-center justify-between gap-12' >
                <div className="md:w-1/2">
                    <img src={chefImg} alt="A Master chef image" />
                </div>
                <div className="md:w-1/2">
                    <div className='text-left md:w-4/5' >

                        <h2 className='text-4xl text-sgreen md:text-5xl font-bold my-2 md:leading-snug leading-snug mb-5' > Reviews from Our Customers </h2>
                        <p className='tracking-wide font-medium text-lg' > Consumer Testimonials </p>
                        <blockquote className='my-5 leading-[30px]' >
                            “I had the pleasure of dining at FoodHouse last night, and I'm still raving about the experience! The attention to detail in presentation and service was prompt”
                        </blockquote>

                        {/* Avatar for customer review */}
                        <div className='flex items-center gap-8 flex-wrap mt-10' >
                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={img1} />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={img2} />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={img3} />
                                    </div>
                                </div>
                                <div className="avatar placeholder">
                                    <div className="w-12 bg-neutral text-neutral-content">
                                        <span>+99</span>
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-1' >
                                <h5 className='text-lg font-semibold' > Customer Feedback </h5>
                                <div className='flex items-center gap-2' >
                                    <FaStar className='text-yellow-400' />
                                    <span className='font-medium' > 4.9 </span> <span className='text-[807E7E]' > (18.6k Reviews) </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials