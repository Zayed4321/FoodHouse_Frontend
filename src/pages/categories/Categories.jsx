import React from 'react'
import img1 from "../../assets/BurgerCat.png";
import img2 from "../../assets/Sandwich.png";
import img3 from "../../assets/ice_Scream.png";
import img4 from "../../assets/Juice.png";

const Categories = () => {

    // Dummy Data for our Category Card
    const categoryItems = [
        { id: 1, title: "Main Dish", desc: "(57 dishes)", image: img1 },
        { id: 2, title: "Break Fast", desc: "(14 dishes)", image: img2 },
        { id: 3, title: "Dessert", desc: "(42 dishes)", image: img3 },
        { id: 4, title: "Browse All", desc: "(280 dishes)", image: img4 },
    ];


    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-28 px-6 py-16' >
            <div className='text-center' >

                <h2 className='text-4xl text-sgreen md:text-5xl font-bold my-2 md:leading-snug leading-snug' > Trending Categories </h2>
                <p className='tracking-wide font-medium text-lg' > Favorites by Our Customers </p>
            </div>

            {/* Category card spawning */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12' >
                {
                    categoryItems.map((item, i) => (
                        <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all' >
                            <div className='flex w-full mx-auto items-center justify-center' >
                                <img src={item.image} alt="Picture of different food" className='bg-[#C1F1C6] rounded-full p-5 w-28 h-28' />
                            </div>
                            <div className='mt-5 space-y-1' >
                                <h5> {item.title} </h5>
                                <p> {item.desc} </p>
                            </div>
                        </div>

                    ))
                }
            </div>

        </div>
    )
}

export default Categories