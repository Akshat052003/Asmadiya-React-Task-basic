import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import toast, {Toaster} from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EmployeeForm = () => {
    const initial = {
        name : "",
        email : "",
        password : "",
        age : "",
        mobile: "",
        dob: "",
        gender : "",
        department : "",
        role : "",
        joiningdate : "",
        address : "",
        resume : null
    }

    const [formData , setFormData] = useState(initial)
    const [showPassword , setShowPassowrd] = useState(false)
    const [submitted , setSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value,type,files} = e.target
        if(type == 'file'){
            setFormData({...formData, [name] : files[0]})
        }
        else{
            setFormData({...formData, [name]: value})
        }
    }

    const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting form: ", formData);

  try {
    const { name, email, password, age, mobile, dob, gender, department, role, joiningdate, address, resume } = formData;

    const response = await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
      age,
      mobile,
      dob,
      gender,
      department,
      role,
      joiningdate,
      address,
      resume: resume?.name || null, 
    });

    toast.success("Employee registered successfully!");
    console.log("Registered: ", response.data);
    setFormData(initial);
    setSubmitted(true);

    setTimeout(() => {
        navigate("/login");
    }, 1500);
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed!";
    toast.error(message);
    console.error("Registration error:", error);
  }
};
    const dummyUser = async () => {
        try {
            const response = await fetch("https://dummyjson.com/users")
            const data = await response.json()
            const users = data.users
            const random = users[Math.floor(Math.random() * users.length)]

           setFormData((prev) => ({
            ...prev,
            name: `${random.firstName} ${random.lastName}`,
            email : random.email,
            phone : random.phone,
            dob : random.birthDate,
            age : random.age
           }))
            
        } catch (error) {
            console.error("Error fetching dummy user" , err)
            
        }
    }

    const inputStyle = "p-2  bg-zinc-600 text-white placeholder-gray-300 border border-transparent hover:border-blue-400 roundedfocus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200";

  return (
    <div className='min-h-screen bg-zinc-800 w-full flex items-center justify-center p-4'>
        <Toaster position='top-center' reverseOrder={false} />
        <form onSubmit={handleSubmit} className='bg-zinc-700 p-8 rounded-xl shadow-lg w-full max-w-2xl text-white'>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Employee Registration Form</h2>
          <div className="w-full h-1 bg-blue-500 mx-auto mt-4 rounded p-0 mb-6"></div>
        </div>
        <div className='flex justify-center'>
            <button type='button' onClick={dummyUser} className='bg-blue-500 text-white px-4 py-2 mb-4 rounded'>Load dummy user</button>
        </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Full Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} className={inputStyle} required/>
                    
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Email Address</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} className={inputStyle} required/>
                    
                </div>
                <div className='flex flex-col relative'>
                    <label className='mb-1 font-bold'>Password</label>
                    <input type={showPassword ? "text" : "password"} name='password' value={formData.password} onChange={handleChange} className={inputStyle} required/>

                    <button type='button' onClick={() => setShowPassowrd(!showPassword)} className='absolute right-3 text-xl top-10 text-gray-300'>{showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}</button>
                    
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Phone Number</label>
                    <input type="tel" name='mobile' value={formData.mobile} onChange={handleChange} className={inputStyle} required/>
                    
                </div>
                 <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Age (in years)</label>
                    <input type="number" name='age' value={formData.age} onChange={handleChange} className={inputStyle} required/>
                    
                </div>
                 
                <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Date of Birth</label>
                    <input type="date" name='dob' value={formData.dob} onChange={handleChange} className={inputStyle} required/>
                    
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Gender</label>
                    <div className='flex gap-6 mt-2'>
                        <label className='inline-flex items-center'>
                            <input type="radio" name='gender' value='Male' checked = {formData.gender === 'Male'} onChange={handleChange} className='form-radio text-xl text-blue-500' required/>
                            <span className='ml-2'>Male</span>
                        </label>
                         <label className='inline-flex items-center'>
                            <input type="radio" name='gender' value='Female' checked = {formData.gender === 'Female'} onChange={handleChange} className='form-radio text-xl text-blue-500' required/>
                            <span className='ml-2'>Female</span>
                        </label>
                         <label className='inline-flex items-center'>
                            <input type="radio" name='gender' value='Other' checked = {formData.gender === 'Other'} onChange={handleChange} className='form-radio text-xl text-blue-500' required/>
                            <span className='ml-2'>Other</span>
                        </label>
                    </div>
                </div>
                <div className='flex flex-col'>
                        <label className='mb-1 font-bold'>Department</label>
                        <select name="department" value={formData.department} onChange={handleChange} className={inputStyle} >
                            <option value="">Select Department</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                            <option value="Development">Development</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Applying Position/Role</label>
                    <input type="text" name="role" value={formData.role} onChange={handleChange} className={inputStyle}  />
                </div>
                 <div className='flex flex-col'>
                    <label className='mb-1 font-bold'>Available Joining Date</label>
                    <input type="date" name="joiningdate" value={formData.joiningdate} onChange={handleChange} className={inputStyle}  />
                </div>
               <div className="md:col-span-2 flex flex-col">
                    <label className="mb-1 font-bold">Permanent Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputStyle}/>
                </div>
                <div className="md:col-span-2 flex flex-col">
                    <label className="mb-1 font-bold">Upload your Resume</label>
                    <input type="file" name="resume" onChange={handleChange} className={inputStyle} required/>
                </div>

                <div className='md:col-span-2 flex flex-col'>
                    <button type='submit' className='cursor-pointer bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold'>Register</button>
                </div>

                <div className="mt-2 text-center">
                    <span className="text-md text-center text-gray-300">Already registered? </span>
                    <button type="button" onClick={() => navigate("/login")} className="ml-2 text-center text-blue-400 hover:underline"> Click here </button>
                </div>
                
            </div>
        </form>
    </div>
  
)}

export default EmployeeForm