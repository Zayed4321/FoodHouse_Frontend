import { useEffect, useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = '' }) => {

    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        // Interval is to change the count to 0 where initially it's 5
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);

        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        });

        return () => clearInterval(interval);

    }, [count, navigate, location]);

    return (
        <>
            <div className='mt-56 flex flex-col self-center justify-center align-items-center' >
                <h1 className='flex justify-center' > redirecting you back in {count} second </h1>
                <div className='flex justify-center mt-3' >
                    <Watch
                        visible={true}
                        height="80"
                        width="80"
                        radius="48"
                        color="#4fa94d"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass="" />
                </div>
            </div>
        </>
    )
}

export default Spinner