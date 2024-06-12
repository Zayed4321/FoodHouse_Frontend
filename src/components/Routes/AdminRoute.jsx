import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {

    const [ok, setOK] = useState();
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const adminAuthCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/admin-auth`);

            if (res.data.ok) {
                setOK(true);
            } else {
                setOK(false)
            };
        }

        if (auth?.token) adminAuthCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path='home' />
}

export default AdminRoute