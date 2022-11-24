import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  clear, reset } from "../../features/Booking/bookingPersisterSlice";
import { addBooking } from "../../features/Booking/bookingSlice";
import { Link } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.persistedReducer);

  useEffect(() => {
    data.bookingData[0] === undefined
      ? navigate("/error") && dispatch(clear(),reset())
      : dispatch(addBooking(data?.bookingData[0])) && dispatch(clear(),reset())
   
  }, []);



  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
    <p className="text-5xl text-dark md:text-7xl lg:text-4xl">Car Booked Successfully</p>
    <Link to="/bookings"><button className="mt-8 bg-zinc-800 rounded-lg p-3 text-white">Go To Orders</button></Link>
    </div>
  )
}

export default Success;
