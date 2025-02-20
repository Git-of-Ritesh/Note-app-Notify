import React, { useState } from 'react';
import LoginImage from '../../../assets/logo/LoginImage.jpg'
import Logo4 from '../../../assets/logo/logo4.png'
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
    }

    else if (password !== confirmPassword) {
      setError("Passwords do not match");
    }

    else {
      setError("");
    }

    // singup API call
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', { username: name, email, password }, { withCredentials: true });

      if (res.data.status === false) {
        setError(res.data.message);
      }

      setError("");

      navigate('/Login'); // Redirect to login page

    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='flex justify-between bg-gray-100 h-screen py-14 px-28'>
      <div className='flex flex-col justify-center items-center h-full w-full '>

        <div className='flex justify-center items-center gap-2 mb-6'>
          <img className='size-8 rounded-lg' src={Logo4} alt="Logo image" />
          <span className="text-2xl font-Logo font-semibold">
            Notify
          </span>
        </div>
        {/* Right Side */}
        <div className='flex border flex-col rounded-xl shadow-md bg-white justify-center items-center  py-5 px-10'>

          {/* header div */}
          <div className='flex flex-col justify-between items-center'>

            {/* Welcome Back */}
            <div className='flex flex-col items-center'>
              <h1 className="font-medium text-xl tracking-normal">
                Welcome
              </h1>
              <p className="text-center text-[#7C7B7B] my-2 text-sm">Enter your details to have your Notify account</p>
            </div>

          </div>

          {/* Form div */}
          <div className='flex flex-col mt-5 gap-3'>
            <div>
              <h3 className='text-sm'>Name</h3>
              <input className='border w-80 rounded-lg h-7 p-4 mt-2 text-sm ' type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} placeholder='Name' />
            </div>

            <div >
              <h3 className='text-sm'>Email</h3>
              <input className='border w-80 rounded-lg h-7 p-4 mt-2 text-sm ' type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder='m@example.com' />
            </div>

            <div>
              <div className='flex justify-between'>
                <h3 className='text-sm'>Password</h3>
                <h3 className='text-sm'>Forgot password</h3>
              </div>
              <input className='border w-80 rounded-lg h-7 p-4 mt-2 text-sm' type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </div>


            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


            <button onClick={handleSubmit} className=' flex justify-center items-center w-80 rounded-lg h-7 p-4 bg-black text-white font-normal mt-2 '>Sign up</button>

            <div className='flex justify-center items-center gap-3'>
              <hr className='w-24 border-[#A09F9F] border-1' />
              <span className='text-gray-500 text-sm font-light tracking-tight'>Or Signup with</span>
              <hr className='w-24 border-[#A09F9F] border-1' />
            </div>

            <div className='flex flex-col justify-center items-center gap-3'>
              <button className='flex gap-2 justify-center items-center border border-gray-300 w-80 rounded-lg h-7 p-4 text-sm hover:bg-gray-100'>
                <FcGoogle className='size-5' />Signup with Google
              </button>

              <button className='flex gap-2 justify-center items-center border border-gray-300 w-80 rounded-lg h-7 p-4 text-sm hover:bg-gray-100'>
                <GrApple className='size-5' />Signup with apple
              </button>
            </div>

            <div className="flex items-center justify-center mt-4">
              <p className="text-sm font-normal text-[#827E7E]">
                Already have an account?{" "}
                <span onClick={handleLoginRedirect}
                  className="font-semibold text-black cursor-pointer underline "
                >
                  Sign In
                </span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;