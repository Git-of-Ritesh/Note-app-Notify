import React, { useState, useSelector } from 'react';
import Logo4 from '../../../assets/logo/logo4.png'
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInFailure } from '../../../redux/user/userSlice';
import { signInStart } from '../../../redux/user/userSlice';
import { signInSuccess } from '../../../redux/user/userSlice';
import { Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import LoadingAnimation from '../../../components/LoadingAnimation/LoadingAnimation';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required");
            return;
        } else {
            setError("");
        }

        //Login API

        try {
            dispatch(signInStart());
            setLoading(true);

            const res = await axios.post(`${import.meta.env.VITE_API_BACKENDBASE_URL}/api/auth/signin`, {
                email,
                password
            });

            if (res.data.status === false) {
                console.log(res.data);
                dispatch(signInFailure(res.data.message));
                return;
            }

            // Store token in sessionStorage
            if (res.data.token) {
                sessionStorage.setItem('authToken', res.data.token);
            }
            dispatch(signInSuccess(res.data));
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 9500);

            // Show success toast, then navigate after a short delay
            // toast('Login Successfully  👍', {
            //     className: "w-[350px] rounded-2xl bg-white/20  backdrop-blur-xl text-lg text-gray-600 px-10 shadow-xl",
            //     hideProgressBar: true,
            //     onClose: () => { 
            //         setLoading(false); 
            //         navigate('/'); },
            //     autoClose: 1000,// Toast duration (adjust as needed)
            // });

        } catch (error) {
            console.log(error.message);
            dispatch(signInFailure(error.message));
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirect to sign-up page
    };

    return (
        <div className='bg-gray-100 h-dvh  '>

            {loading ? <LoadingAnimation /> : (


                <div className='flex flex-col justify-center items-center h-full w-full '>

                    <div className='flex justify-center items-center gap-2 mb-6'>
                        <img className='sm:size-8 size-7 rounded-lg' src={Logo4} alt="Logo image" />
                        <span className="text-2xl font-Logo font-semibold">
                            Notify
                        </span>
                    </div>
                    {/* Right Side */}
                    <div className='flex border flex-col rounded-xl shadow-md bg-white justify-center items-center sm:px-10 py-5 px-6'>

                        {/* header div */}
                        <div className='flex flex-col justify-between items-center'>

                            {/* Welcome Back */}
                            <div className='flex flex-col items-center'>
                                <h1 className="font-medium text-xl tracking-normal">
                                    Welcome Back
                                </h1>
                                <p className="text-center text-[#7C7B7B] my-2 sm:text-sm text-xs">Enter your Email and password to access Notify</p>
                            </div>

                        </div>

                        {/* Form div */}
                        <div className='flex flex-col mt-5 gap-3'>
                            <div >
                                <h3 className='text-sm'>Email</h3>
                                <input className='border w-72 sm:w-80 rounded-lg h-7 p-4 mt-2 text-sm ' type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} placeholder='m@example.com' />
                            </div>

                            <div>
                                <div className='flex justify-between'>
                                    <h3 className='text-sm'>Password</h3>
                                    <h3 className='text-sm'>Forgot password</h3>
                                </div>
                                <input className='border w-72 sm:w-80 rounded-lg h-7 p-4 mt-2 text-sm' type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                            </div>


                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


                            <button onClick={handleSubmit} className=' flex justify-center items-center w-72 sm:w-80 rounded-lg h-7 p-4 bg-black text-white font-normal mt-2 '>Sign in</button>
                            <ToastContainer
                                position='top-center'
                                transition={Slide}
                            />

                            <div className='flex justify-center items-center gap-3'>
                                <hr className='w-20 sm:w-24 border-[#A09F9F] border-1' />
                                <span className='text-gray-500 text-sm font-light tracking-tight'>Or login with</span>
                                <hr className='w-20 sm:w-24 border-[#A09F9F] border-1' />
                            </div>

                            <div className='flex flex-col justify-center items-center gap-3'>
                                <button className='flex gap-2 justify-center items-center border border-gray-300 w-72 sm:w-80 rounded-lg h-7 p-4 text-sm hover:bg-gray-100'>
                                    <FcGoogle className='size-5' />Login with Google
                                </button>

                                <button className='flex gap-2 justify-center items-center border border-gray-300 w-72 sm:w-80 rounded-lg h-7 p-4 text-sm hover:bg-gray-100'>
                                    <GrApple className='size-5' />Login with apple
                                </button>
                            </div>

                            <div className="flex items-center justify-center mt-4">
                                <p className="text-sm font-normal text-[#827E7E]">
                                    Don't have an account?{" "}
                                    <span onClick={handleSignUpRedirect}
                                        className="font-semibold text-black cursor-pointer underline "
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;