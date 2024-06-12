import { createContext, useContext, useEffect, useState } from "react";

const MyCartContext = createContext();

const CartWrapper = ({ children }) => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingStorage = localStorage.getItem('cart')
        if (existingStorage) setCart(JSON.parse(existingStorage))
    }, [])

    return (
        <MyCartContext.Provider value={[cart, setCart]} >
            {children}
        </MyCartContext.Provider>
    )
};

// To use this context api data everywhere very easily we need to do the following 

const useCart = () => useContext(MyCartContext)

export { useCart, CartWrapper };