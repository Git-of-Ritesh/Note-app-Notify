import React, { useState } from 'react'; // Importing useState hook
import bgImage from '../../../assets/logo/bgImage.png';
import logoImage from '../../../assets/logo/logo.png'; // Logo image
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux';
import { signInFailure } from '../../../redux/user/userSlice';
import { signInStart } from '../../../redux/user/userSlice';
import { signInSuccess } from '../../../redux/user/userSlice';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages

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
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-1/2 h-screen flex flex-col">
        {/* Background Image with Specific Dimensions */}
        <img
          src={bgImage}
          alt="Background"
          className="rounded-2xl object-cover w-full h-[700px]"
        />

        {/* Cropped Portion of Background with Matching Border Radius */}
        <div className="absolute top-0 left-0 w-[150px] h-[100px] bg-white overflow-hidden rounded-2xl"></div>

        {/* Logo */}
        <img
          src={logoImage}
          alt="Logo"
          className="absolute top-0 left-0 w-1/4 h-16 object-contain"
        />
        <span className="absolute top-0 left-24 w-1/4 h-16 text-lg font-bold -ml-1 font-Logo">
          otetify
        </span>
      </div>

      <div className="w-3/4 md:w-1/2 h-full bg-white flex flex-col p-6">
        <div className="flex flex-col gap-6">
          <h1 className="tracking-wide text-[2.5rem] text-center text-black font-Ubuntu">
            Keep Your Notes Organized.
          </h1>

          <h1 className="text-center font-lala text-[2rem] tracking-wide">Welcome Back</h1>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-center mb-4 text-sm">Enter your Email and password to access your notes account</p>
          <div className="box-border border-2 rounded-md w-3/5 justify-center flex flex-col p-4 mx-auto h-44%">
            <p className="mt-2 px-2 text-sm">Email</p>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-50% h-4% text-black py-1 mb-2 mt-1 mx-2 px-2 bg-transparent border border-[#D9D9D9] rounded-md"
            />

            <p className="mt-2 px-2 text-sm">Password</p>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-50% h-4% text-black py-1 mb-2 mt-1 mx-2 px-2 bg-transparent border border-[#D9D9D9] rounded-md"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="w-50% h-4% flex flex-col my-3">
              <button
                onClick={handleSubmit}
                className="w-50% h-4% text-white mx-2 my-2 font-semibold bg-black rounded-md py-2 text-center flex items-center justify-center"
              >
                Log-In
              </button>
            </div>

            <div className="w-50% h-4% mx-2 flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember me</p>
              </div>

              <p className="text-sm font-medium mr-4 mb-2 whitespace-nowrap cursor-pointer underline underline-offset-2">
                Forget Password?
              </p>
            </div>
            <div className="w-50% h-4% text-[#FFFFFF] cursor-pointer mx-2 my-2 font-semibold bg-[#1877F2] border-black rounded-md py-2 text-center flex items-center justify-center shadow-md shadow-black/20">
              Continue with Facebook
            </div>
            <div className="w-50% h-4% text-[#0000008A] cursor-pointer mx-2 my-2 font-semibold bg-[#FFFFFF] border-black rounded-md py-2 text-center flex items-center justify-center shadow-md shadow-black/20">
              Continue with Google
            </div>
            <div className="w-50% h-4% text-[#FFFFFF] cursor-pointer mx-2 my-1 font-semibold bg-black border-black rounded-md py-2 text-center flex items-center justify-center shadow-md shadow-black/20">
              Continue with Github
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <p className="text-sm font-normal text-black">
              Don't have an account?{" "}
              <span
                onClick={handleSignUpRedirect} // Call the redirection function
                className="font-semibold underline underline-offset-2 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;