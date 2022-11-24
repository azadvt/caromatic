import React from "react";
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin,reset } from "../../features/adminAuth/adminAuthSlice";
import { useForm } from "react-hook-form";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();  
  const onSubmit = async data => { 
    dispatch(adminLogin(data))
  };

const navigate = useNavigate()
const dispatch = useDispatch()
const {admin,isLoading,isError,isSuccess,message } = useSelector((state)=>state.adminAuth)

useEffect(()=>{ 
  if(isError){
      alert(isError)
  }
  if(isSuccess  || admin) {
      navigate('/admin')
  } 
      dispatch(reset())
},[admin,isError,isSuccess,message,navigate])

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-zinc-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">caromatic <br /> Admin</a>
          </div>
         
         
        
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                user name
              </label>
              <input

                id="email" 
                name="userName" 
                {...register("userName", { required: true,  })}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              {errors.userName && errors.userName.type === "required" && (
                  <p className="text-red-600 text-sm">please enter your user name</p>
                )}
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <a
                  href="/"
                  className="text-sm text-zinc-800 hover:underline focus:zinc-800"
                >
                  Forgot Password?
                </a>
              </div>
              <input
               {...register("password", { required: true,  })}
                type="password"
                id="password"
                name="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              {errors.password && errors.password.type === "required" && (
                  <p className="text-red-600 text-sm">please enter your password</p>
                )}
            </div>
           
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-zinc-800 rounded-md shadow hover:bg-zinc-900 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
