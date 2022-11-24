import React from "react";
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/icons/google.svg'
import { reset ,login} from "../../features/userAuth/userAuthSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();  
  const onSubmit = async data => { 
    dispatch(login(data))
  };

const navigate = useNavigate()
const dispatch = useDispatch()
const {user,isLoading,isError,isSuccess,message } = useSelector((state)=>state.userAuth)

useEffect(()=>{ 
  if(isError){
    console.log(message);
      toast(message)
  }
  if(isSuccess  || user) {
      navigate('/')
  } 
      dispatch(reset())
},[user,isError,isSuccess,message,navigate,dispatch])


if(isLoading){
  return (<LoadingSpinner/>)
}
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-zinc-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">caromatic</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            We provide the best car options, with premium customer services at a
            competitive price!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <a href="/signup" className="underline">
              Get Started!
            </a>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our{" "}
            <a href="/#" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="/#" className="underline">
              conditions
            </a>
          </p>
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
                Email address
              </label>
              <input

                id="email" 
                name="email" 
                {...register("email", { required: true,  })}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              {errors.email && errors.email.type === "required" && (
                  <p className="text-red-600 text-sm">please enter your email</p>
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="remember"
                className="text-sm font-semibold text-gray-500"
              >
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-zinc-800 rounded-md shadow hover:bg-zinc-900 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                >
                  <img src={google} alt="" className="w-4"/>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Google
                  </span>
                </a>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
