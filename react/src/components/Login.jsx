import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import axios from "axios"

const Login = () => {
    const initial = {
        email : "",
        password : ""
    }
    const [formData , setFormData] = useState(initial)
    const [showPassword, setShowPassowrd] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name] : value}))

    }

    const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (email === '' || password === '') {
    toast.error('All fields are required');
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    // Save token in localStorage
    localStorage.setItem("token", res.data.token);

    toast.success("Logged In Successfully");
    console.log("Login response:", res.data);

    // Redirect or navigate to dashboard here if needed
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Try again.";
    toast.error(message);
    console.error("Login error:", error);
  }
};
    const inputStyle = "p-2 bg-zinc-600 text-white placeholder-gray-300 border outline-none border-transparent hover:border-blue-400 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200";


  return (
    <div className='min-h-screen bg-zinc-900 flex items-center justify-center px-4'>
        <Toaster position='top-center'/>
        <form onSubmit={handleLogin} className='bg-zinc-700 p-8 text-white  shadow-lg w-full max-w-2xl rounded-xl'>
        <div className="text-center">
          <h2 className="text-3xl font-bold">LOGIN</h2>
          <div className="w-full h-1 bg-blue-500 mx-auto mt-4 rounded p-0 mb-6"></div>
        </div>

        <div className='mb-4 flex flex-col'>
            <label className='mb-1 font-bold' >Email Address</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} className={inputStyle} />
        </div>
          <div className='mb-4 flex  relative flex-col'>
            <label className='mb-1 font-bold' >Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} className={inputStyle} />
        </div>
        <div className='flex justify-center items-center'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Login</button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-md text-gray-300">Not registered? </span>
          <button type="button" onClick={() => navigate("/")} className="ml-2 text-blue-400 hover:underline"> Register here
          </button>
        </div>
        </form>

        

    </div>
  )
}

export default Login