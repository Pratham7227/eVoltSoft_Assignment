import React from 'react'
import { useForm } from 'react-hook-form';
import { loginApi } from '../services/user';
import { useNavigate } from 'react-router-dom';

export const Login = ({setChangeForm}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const navigate=useNavigate();
  
    const handleForm = (data) => {
      console.log("Submitted Data:", data);
      loginApi(data,navigate)
    };
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="w-full md:w-full flex flex-col justify-center px-10 py-12 bg-white ">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Welcome to <br />
            <span className="text-blue-600">EV Station Management</span>
          </h1>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit(handleForm)}>
        
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
             <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
          </div>
          <div>
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
          </div>
          <p className="text-gray-600 text-[14px]">Don't have an account? <span className="text-blue-700 cursor-pointer" onClick={()=>setChangeForm("signup")}>Sign up</span></p>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
