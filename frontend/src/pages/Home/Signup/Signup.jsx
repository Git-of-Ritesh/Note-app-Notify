import React, { useState } from 'react';
import bgImage from '../../../assets/logo/bgImage.png';
import logoImage from '../../../assets/logo/logo.png';
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
      const res = await axios.post('http://localhost:3000/api/auth/signup', {username: name, email, password}, { withCredentials: true });

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
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-1/2 h-screen flex flex-col">
        <img
          src={bgImage}
          alt="Background"
          className="rounded-2xl object-cover w-full h-[700px]"
        />
        <div className="absolute top-0 left-0 w-[150px] h-[100px] bg-white overflow-hidden rounded-2xl"></div>

        <img
          src={logoImage}
          alt="Logo"
          className="absolute top-0 left-0 w-1/4 h-16 object-contain"
        />
        <span className="absolute top-0 left-24 w-1/4 h-16 text-lg font-bold -ml-1 font-Logo">
          otetify
        </span>
      </div>

      <div className="w-3/4 md:w-1/2 h-screen bg-white flex flex-col p-6">
        <div className="flex flex-col gap-6">
          <h1 className="tracking-wide text-[2.5rem] text-center text-black font-Ubuntu">
            Keep Your Notes Organized.
          </h1>

          <h1 className="text-center font-lala text-[2rem] tracking-wide">Welcome</h1>
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-center mb-3 text-sm">Enter your details to create an account</p>
          <div className="box-border size-auto border-2 rounded-md w-3/5 flex flex-col p-1 mx-auto h-auto">
            <p className="mt-0 px-2 text-sm">Full Name</p>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-50% h-9 text-black py-1 mb-2 mt-0 mx-3 px-2 bg-transparent border border-[#D9D9D9] rounded-md"
            />
            <p className="mt-1 px-2 text-sm">Email</p>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-50% h-9 text-black py-1 mb-2 mt-0 mx-3 px-2 bg-transparent border border-[#D9D9D9] rounded-md"
            />

            <p className="mt-1 px-2 text-sm">Password</p>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-50% h-9 text-black py-1 mb-2 mt-0 mx-3 px-2 bg-transparent border border-[#D9D9D9] rounded-md"
            />
            <p className="mt-1 px-2 text-sm">Confirm Password</p>
            <input
              type="password"
              placeholder="Re-enter your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-50% h-9 text-black py-1 mb-2 mt-0 mx-3 px-2 bg-transparent border border-[#D9D9D9] rounded-md"
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <div className="w-50% h-9 flex flex-col my-2">
              <button
                onClick={handleSubmit}
                className="w-50% h-9 text-white mx-3 my-1 font-semibold bg-black rounded-md py-2 text-center flex items-center justify-center"
              >
                Sign Up
              </button>
            </div>

            <div className="w-50% h-3% text-[#FFFFFF] cursor-pointer mx-2 my-1 font-semibold bg-[#1877F2] border-black rounded-md py-2 text-center flex items-center justify-center shadow-md shadow-black/20">
              Continue with Facebook
            </div>
            <div className="w-50% h-3% text-[#0000008A] cursor-pointer mx-2 my-1 font-semibold bg-[#FFFFFF] border-black rounded-md py-2 text-center flex items-center justify-center shadow-md shadow-black/20">
              Continue with Google
            </div>
            <div className="w-50% h-3% text-[#FFFFFF] cursor-pointer mx-2 my-1 font-semibold bg-black border-black rounded-md py-2 text-center flex items-center justify-center shadow-md shadow-black/20">
              Continue with Github
            </div>
          </div>

          <div className="flex items-center justify-center mt-3">
            <p className="text-sm font-normal text-black">
              Already have an account?{" "}
              <span
                onClick={handleLoginRedirect} // Call the redirection function
                className="font-semibold underline underline-offset-2 cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;