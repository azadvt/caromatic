import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData, clear } from "../../features/Booking/bookingPersisterSlice";
import { addBooking } from "../../features/Booking/bookingSlice";
import { Link } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.persistedReducer);
  console.log("bookingdata", Data.bookingData[0]);

  useEffect(() => {
    Data.bookingData[0] === undefined
      ? navigate("/error")
      : dispatch(addBooking(Data?.bookingData[0])) && dispatch(clear())
   
  }, []);



  return (
    <div class="flex flex-col items-center justify-center w-screen h-screen bg-white">
    <p class="text-5xl text-dark md:text-7xl lg:text-4xl">Your Order Placed Successfully</p>
    <Link to="/orders"><button className="mt-8 bg-zinc-800 rounded-lg p-3 text-white">Go To Orders</button></Link>
    </div>
  )
}

export default Success;
