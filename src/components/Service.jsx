import img1 from "../assets/icon1.png";
import img2 from "../assets/icon2.png";
import img3 from "../assets/icon3.png";
import img4 from "../assets/icon4.png";


const Service = () => {

    const serviceList = [
        { id: 1, title: "Catering", desc: "Delight your guests with our flavors and  presentation", image: img1 },
        { id: 2, title: "Fast Delivery", desc: "We deliver your order promptly to your door", image: img2 },
        { id: 3, title: "Order Online", desc: "Explore menu & order with ease using our Online Ordering ", image: img3 },
        { id: 4, title: "Gift Vouchers", desc: "Give the gift of exceptional dining with Foodi Gift Cards", image: img4 },
    ];

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-28 px-6 py-16' >
            <div className='flex flex-col md:flex-row items-center justify-between gap-12' >
                <div className="md:w-1/2">
                    <div className='text-left md:w-4/5' >

                        <h2 className='text-4xl text-sgreen md:text-5xl font-bold my-2 md:leading-snug leading-snug mb-5' > Embark with us on our Culinary Journey </h2>
                        <p className='tracking-wide font-medium text-lg' > Services we Offer </p>
                        <p className='my-5 leading-[30px]' >
                            “I had the pleasure of dining at FoodHouse last night, and I'm still raving about the experience! The attention to detail in presentation and service was prompt”
                        </p>

                        <button className='btn bg-sgreen text-white px-8 py-3 rounded-full' > Explore </button>

                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center" >
                        {
                            serviceList.map((service) => (
                                <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-sgreen cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border" >
                                    <img src={service.image} alt="icons" className="mx-auto" />
                                    <h5 className="pt-3 font-semibold" > {service.title} </h5>
                                    <p className="text-[]" > {service.desc} </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service