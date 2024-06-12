import { useState } from 'react';
import '../forgotPass/forgotPass.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPass = () => {

    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handlePassSubmit = async (e) => {
        e.preventDefault();
        try {

            // The process.env option doen't work so we have to fix and change codes on the vite.config.js file to make it work
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/forgot-pass`, {
                email, answer, newPassword
            });

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/');
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }


    return (
        <>
            <section className='section forgot__pass' >
                <div className="forgotPass__box">
                    <div className="forgotPass__title">
                        <h1> RESET PASSWORD </h1>
                    </div>
                    <form className='forgotPass__form' onSubmit={handlePassSubmit} >
                        <div className="form__input">
                            <input type="text" placeholder='What is your favorite subject?' className='form__control' name='form_name' value={answer} onChange={(e) => { setAnswer(e.target.value) }} required />
                        </div>
                        <div className="form__input">
                            <input type="text" placeholder='Your Email' className='form__control' name='form_name' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>
                        <div className="form__input">
                            <input type="text" placeholder='New Password' className='form__control' name='form_name' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required />
                        </div>
                        <div className="forgotPass__button_box">
                            <div className="forgotPass__button">
                                <button type='submit' > Change Password </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ForgotPass