import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const MyAuthContext = createContext();

const AuthWrapper = ({ children }) => {

    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // Default axios to put the values inside the header for example the token
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("auth");

        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            })
        }

    }, [])


    return (
        <MyAuthContext.Provider value={[auth, setAuth]} >
            {children}
        </MyAuthContext.Provider>
    )
};

// To use this context api data everywhere very easily we need to do the following 

const useAuth = () => useContext(MyAuthContext)

export { useAuth, AuthWrapper };
