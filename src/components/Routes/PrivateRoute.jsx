import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";


export default function PrivateRoute() {

    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authChecking = async () => {
            // Always remember you need to call the route link with the process env variable otherwise it won't work just as we do it in postman
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/user-auth`)

            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }

        if (auth?.token) authChecking()
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />
}