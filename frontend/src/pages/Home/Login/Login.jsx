import React, { useState } from 'react'; 
import LoginImage from '../../../assets/logo/LoginImage.jpg'
import Logo from '../../../assets/logo/logo.png'
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInFailure } from '../../../redux/user/userSlice';
import { signInStart } from '../../../redux/user/userSlice';
import { signInSuccess } from '../../../redux/user/userSlice';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
    } else {
      setError("");
    }
    //Login API
    try {
      dispatch(signInStart());

      const res = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password
      }, { withCredentials: true });

      if (res.data.status === false) {
        console.log(res.data);
        dispatch(signInFailure(res.data.message));
      }

      dispatch(signInSuccess(res.data));
      navigate('/'); 
      

    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirect to sign-up page
  };

  return (
     <div className='flex justify-between bg-gradient-to-r from-[#F8A128] to-[#F5F5F5] h-screen py-14 px-28'>
                <div className='flex h-full w-full bg-white rounded-[35px] drop-shadow-[6px_4px_6px_rgba(0,0,0,0.20)]'>
                    {/* Left Side */}
                    <div className='flex justify-center items-center w-[40%] h-full p-5'>
                        <img className='h-full w-full rounded-2xl' src={LoginImage} alt="image of notes" />
                    </div>
    
                    {/* Right Side */}
                    <div className='flex flex-col justify-center items-center w-3/5 h-full p-5'>
    
                        {/* Logo div */}
                        <div className='flex justify-center items-center'>
                            <img className='size-12' src={Logo} alt="Logo image" />
                            <span className="text-2xl font-Logo ml-[-7.4%] ">
                                otetify
                            </span>
                        </div>
    
                        {/* header div */}
                        <div className='flex flex-col items-center gap-7'>
                            <h1 className="font-instumrntalSans font-semibold text-4xl">
                                Keep Your Notes Organized.
                            </h1>
    
                            {/* Welcome Back */}
                            <div className='flex flex-col items-center'>
                                <h1 className="font-instumrntalSans font-medium text-3xl tracking-tight">
                                    Welcome Back
                                </h1>
                                <p className="text-center text-[#7C7B7B] mb-4 text-sm">Enter your Email and password to access your notes account</p>
                            </div>
                        </div>
    
                        {/* Form div */}
                        <div className='flex flex-col mt-5 gap-4'>
                            <input className='border border-[#A09F9F] w-96 rounded-3xl h-11 p-4 ' type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
    
                            <input className='border border-[#A09F9F] w-96 rounded-3xl h-11 p-4 ' type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
    
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    
                            <div className="flex items-center justify-between mx-4">
                                <div className='flex items-center'>
                                    <input type="checkbox" className="w-5 h-5 mr-2 border border-black appearance-none rounded-full checked:bg-blue-500" />
                                    <p className="text-sm">Remember me</p>
                                </div>
                                <p className="text-sm font-medium  whitespace-nowrap cursor-pointer ">
                                    Forget Password?
                                </p>
                            </div>
    
                            <button onClick={handleSubmit} className=' flex justify-center items-center w-96 rounded-3xl h-11 p-4 bg-my-yellow text-white font-semibold '>Sign in</button>
    
                            <div className='flex justify-center items-center gap-3'>
                                <hr className='w-32 border-[#A09F9F] border-1' />
                                <span className='text-[#827E7E] tracking-tight'>Or login with</span>
                                <hr className='w-32 border-[#A09F9F] border-1' />
                            </div>
    
                            <div className='flex justify-center items-center gap-6'>
                                <button>
                                    <FcGoogle className='size-9' />
                                </button>
    
                                <button>
                                    <GrApple className='size-9' />
                                </button>
                            </div>
    
                            <div className="flex items-center justify-center mt-4">
                                <p className="text-sm font-normal text-[#827E7E]">
                                    Don't have an account?{" "}
                                    <span onClick={handleSignUpRedirect}
                                        className="font-semibold text-black cursor-pointer"
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </div>
    
                        </div>
    
    
                    </div>
                </div>
            </div>
  );
};

export default Login;