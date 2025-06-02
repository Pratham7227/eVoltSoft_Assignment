import React, { useState } from "react";
import loginImg from "../assets/img/signupBg.jpg"; // Your EV image path
import { Login } from "./Login";
import { useForm } from "react-hook-form";
import { signupApi } from "../services/user";

const Signup = () => {
  const [changeForm, setChangeForm] = useState("signup");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForm = (data) => {
    console.log("Submitted Data:", data);
    signupApi(data)
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-4/5 hidden md:flex items-center justify-center bg-gray-100 relative">
        <img src={loginImg} alt="EV" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {changeForm === "signup" ? (
        <div className="w-full md:w-[45%] flex flex-col justify-center px-10 py-12 bg-white shadow-md rounded-l-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-700">
              Welcome to <br />
              <span className="text-blue-600">EV Station Management</span>
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
            <div>
              <label className="text-sm text-gray-600 font-medium">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
                className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.firstname
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.firstname && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                {...register("lastname", { required: true })}
                className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.lastname
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.lastname && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>
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
              <label className="text-sm text-gray-600 font-medium">
                Password
              </label>
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
            <p className="text-gray-600 text-[14px]">
              Already have an account?{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => setChangeForm("login")}
              >
                Login
              </span>
            </p>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full md:w-[45%]">
          <Login setChangeForm={setChangeForm} />
        </div>
      )}
    </div>
  );
};

export default Signup;
