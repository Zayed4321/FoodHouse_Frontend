import bannerImg from '../../assets/BurgerEating_BG.png';
import foodImg from "../../assets/burgir.png";
import noddlesImg from "../../assets/noodles.png";

const Banner = () => {
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-28 px-6 bg-gradient-to-tr from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%' >
            <div className="py-24 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="md:w-1/2 space-y-7 px-4">
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug' >Dive into Delights Of Delectable <span className='text-sgreen' >Food</span></h2>
                    <p className='text-xl text-[#4A4A4A]' >Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                    <button className='btn bg-sgreen px-8 py-3 font-semibold text-white rounded-full' > Order Now </button>
                </div>
                <div className="md:w-1/2">
                    <img src={bannerImg} alt="Girl eating snacks" />
                    <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-4 -ms-28' >
                        <div className='flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-56' >
                            <img src={foodImg} alt="Burger Image" className='rounded-full' />
                            <div className='space-y-1' >
                                <h5> Delicious Burger </h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" defaultChecked />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                </div>
                                <p className='text-sred' > $8.00 </p>
                            </div>
                        </div>
                        <div>
                            <div className='md:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-56' >
                                <img src={noddlesImg} alt="Noodles Image" className='rounded-full' />
                                <div className='space-y-1' >
                                    <h5> Tasty Noodles </h5>
                                    <div className="rating rating-sm">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" defaultChecked />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-sgreen" />
                                    </div>
                                    <p className='text-sred'> $12.00 </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner