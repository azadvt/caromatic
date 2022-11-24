import React, { useState, useEffect } from "react";
import UserLayout from "../../components/Layout/User/UserLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCars } from "../../features/Car/carSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import { addData, clear } from "../../features/Booking/bookingPersisterSlice";
import { stripeCheckOut } from "../../features/Booking/bookingSlice";


function Checkout(props) {
  const [dropOffTime, setDropOffTime] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const pickUpOnChange = (e) => {
    setPickUpTime(e.target.value);
  };

  const dropOffOnChange = (e) => {
    setDropOffTime(e.target.value);
  };

  const date1 = new Date(dropOffTime);
  const date2 = new Date(pickUpTime);
  var hours = Math.abs(date1 - date2) / 1000 / 60 / 60;
  hours = parseFloat(hours).toFixed(1);
  if (1 > hours || isNaN(hours)) hours = 1;


  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();
  if (id === null) {
    navigate("/error");
  }


  const dispatch = useDispatch();
  const { carData, isLoading} = useSelector((state) => state.car);
  const {bookingData,isError,isSuccess,message} = useSelector((state)=>state.booking)
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getCars());
    dispatch(clear())
  }, [dispatch]);

  const car = carData.filter((carData) => carData._id === id);


  const onSubmit = (formData) => {
    const userId = user._id;
    const carId = car[0]?._id;
    const imageUrl = car[0]?.imageUrl[0];
    const carName = car[0]?.name;
    const description = car[0]?.description;
    const total = car[0]?.price * hours;
    const {
      name,
      phone,
      address,
      town,
      pickUpLocation,
      pickUpTime,
      dropOffLocation,
      dropOffTime,
      payment,
    } = formData;
    const dataToServer = { description, carName, imageUrl, total };
    const dataToRedux = {
      userId,
      carId,
      name,
      phone,
      address,
      town,
      pickUpLocation,
      pickUpTime,
      dropOffLocation,
      dropOffTime,
      payment,
      total,
    };
    dispatch(stripeCheckOut(dataToServer))
    dispatch(addData(dataToRedux));
      }
      if (message.url) {
        window.location.href = message.url;
      }
  if (isLoading) {
    return (
        <LoadingSpinner />
    );
  }


  return (
    <>
      <UserLayout>
        <form id="checkOut" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-5 w-full max-w-6xl m-auto p-4 gap-4">
            <div className="md:col-span-3 col-start-1 self-start grid lg:grid-cols-2 sm:p-8 p-6 bg-white gap-6 rounded-xl">
              <div className="heading lg:col-span-2">
                <h1 className="text-dark text-xl font-bold">Billing Info</h1>
                <p className="text-secondary-300 mt-1">
                  Please enter your billing info
                </p>
              </div>
              <div>
                <p className="font-semibold text-dark mb-2">Name</p>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                    placeholder="Your Name"
                    id="name"
                    name="name"
                    {...register("name", { required: true, maxLength: 30 })}
                    form="checkOut"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <p className="text-red-600 text-sm">Enter your name</p>
                  )}
                  {errors.name && errors.name.type === "maxLength" && (
                    <p className="text-red-600 text-sm">Max length exceeded</p>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold text-dark mb-2">Phone Number</p>
                <div className="flex flex-col w-full">
                  <input
                    type="number"
                    className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                    name="phone"
                    placeholder="Your Phone Number"
                    {...register("phone", { required: true, maxLength: 10 })}
                    form="checkOut"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <p className="text-red-600 text-sm">
                      Enter your Phone Number
                    </p>
                  )}
                  {errors.phone && errors.phone.type === "maxLength" && (
                    <p className="text-red-600 text-sm">
                      Phone Number must be 10 numbers
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold text-dark mb-2">Address</p>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                    placeholder="Your Address"
                    {...register("address", { required: true, maxLength: 90 })}
                    form="checkOut"
                  />
                  {errors.address && errors.address.type === "required" && (
                    <p className="text-red-600 text-sm">Enter your Address</p>
                  )}
                  {errors.address && errors.address.type === "maxLength" && (
                    <p className="text-red-600 text-sm">Max length exceeded</p>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold text-dark mb-2">Town/City</p>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                    placeholder="Town or City"
                    name="town"
                    {...register("town", { required: true, maxLength: 30 })}
                    form="checkOut"
                  />
                  {errors.town && errors.town.type === "required" && (
                    <p className="text-red-600 text-sm">Enter your Town/City</p>
                  )}
                  {errors.town && errors.town.type === "maxLength" && (
                    <p className="text-red-600 text-sm">Max length exceeded</p>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-3 col-start-1 self-start grid lg:grid-cols-2 sm:p-8 p-6 bg-white gap-6 rounded-xl">
              <div className="heading lg:col-span-2">
                <h1 className="text-dark text-xl font-bold">Rental Info</h1>
                <p className="text-secondary-300 mt-1">
                  Please enter your rental info
                </p>
              </div>

              {/* Pick Up */}

              <h2 className="lg:col-span-2 text-md font-semibold ">Pick-Up</h2>
              <div>
                <p className="font-semibold text-dark mb-2">Location</p>
                <select
                  name="pickUpLocation"
                  className="bg-gray-100 hover:bg-zinc-100 active:bg-zinc-200 py-3 px-4 rounded-lg border-none flex justify-between items-center w-full"
                  {...register("pickUpLocation", { required: true })}
                  form="checkOut"
                >
                  <option className="text-zinc-500" value="" disabled selected>
                    Select your Location
                  </option>
                  <option className="text-zinc-500" value="kochi">
                    Kochi
                  </option>
                  <option className="text-zinc-500" value="trivandrum">
                    Trivandrum
                  </option>
                </select>
                {errors.pickUpLocation &&
                  errors.pickUpLocation.type === "required" && (
                    <p className="text-red-600 text-sm">Select your Location</p>
                  )}
              </div>
              <div>
                <p className="font-semibold text-dark mb-2">Date & Time</p>
                <div className="bg-gray-100 py-2 px-4 rounded-lg">
                  <input
                    className="bg-gray-100  border-none w-full text-gray-400 outline-none"
                    name="pickUpTime"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    {...register("pickUpTime", { required: true })}
                    form="checkOut"
                    onChange={pickUpOnChange}
                  />
                </div>
                {errors.pickUpTime && errors.pickUpTime.type === "required" && (
                  <p className="text-red-600 text-sm">Select your Time</p>
                )}
              </div>

              {/* Drop off */}

              <h2 className="lg:col-span-2 text-md font-semibold ">Drop-Off</h2>
              <div>
                <p className="font-semibold text-dark mb-2">Location</p>
                <select
                  name="dropOffLocation"
                  className="bg-gray-100 hover:bg-zinc-100 active:bg-zinc-200 py-3 px-4 rounded-lg border-none flex justify-between items-center w-full"
                  {...register("dropOffLocation", { required: true })}
                  form="checkOut"
                >
                  <option className="text-zinc-500" value="" disabled selected>
                    Select your Location
                  </option>
                  <option className="text-zinc-500" value="kochi">
                    Kochi
                  </option>
                  <option className="text-zinc-500" value="trivandrum">
                    Trivandrum
                  </option>
                </select>
                {errors.dropOffLocation &&
                  errors.dropOffLocation.type === "required" && (
                    <p className="text-red-600 text-sm">Select your Location</p>
                  )}
              </div>
              <div>
                <p className="font-semibold text-dark mb-2">Date & Time</p>
                <div className="bg-gray-100 py-2 px-4 rounded-lg">
                  <input
                    className="bg-gray-100  border-none w-full text-gray-400 outline-none"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    name="dropOffTime"
                    {...register("dropOffTime", { required: true })}
                    form="checkOut"
                    onChange={dropOffOnChange}
                  />
                </div>
                {errors.dropOffTime &&
                  errors.dropOffTime.type === "required" && (
                    <p className="text-red-600 text-sm">Select your Time</p>
                  )}
              </div>
            </div>

            <div className="md:col-span-3 col-start-1 self-start grid sm:p-8 p-6 bg-white gap-4 rounded-xl">
              <div className="heading mb-2">
                <h1 className="text-dark text-xl font-bold">Payment Method</h1>
                <p className="text-secondary-300 mt-1">
                  Please Select your Payment Method
                </p>
              </div>

              <div className="method-group bg-gray-100 p-4 rounded-md">
                <div className="method-name flex gap-4 ">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    id="stripe"
                    {...register("payment", { required: true })}
                    form="checkOut"
    
                  ></input>
                  <label htmlFor="stripe" className="font-semibold">
                    Stripe
                  </label>
                </div>
              </div>
              {errors.payment && errors.payment.type === "required" && (
                <p className="text-red-600 text-sm">
                  Select your Payment Method
                </p>
              )}

              <button
                form="checkOut"
                text="Rent Now"
                className=" mt-2 py-2 px-4 rounded-lg  bg-white border"
              >
                submit
              </button>
            </div>

            {/* Rental Summary */}
            <div className="md:col-span-2 row-span-2 self-start md:col-start-4 col-start-1 row-start-1 summary bg-white grid md:grid-cols-3 rounded-xl py-6 px-4 sm:p-8 gap-y-1 ">
              <h1 className="text-dark text-xl font-bold col-span-3">
                Rental Summary
              </h1>
              <p className="text-secondary-300 col-span-3 mb-8">
                The Summary of your order
              </p>
              <img
                alt="car pic"
                src={car[0]?.imageUrl[0]}
                className="
          col-span-3
          row-span-1
          lg:col-span-1
          lg:row-span-2 self-center p-2"
              />
              <h2 className=" font-bold text-dark text-lg lg:col-span-2 col-span-3 self-end">
                {car[0]?.name}
              </h2>
              <p className=" text-dark text-md lg:col-span-2 col-span-3 self-end">
                {car[0]?.transmission}
              </p>
              <span className="col-span-3 border border-gray-100 my-4 mt-8"></span>
              <PriceRow name="Price Per Hour" value={`₹ ${car[0]?.price}`} />
              <PriceRow name="Hours" value={hours} />
              <PriceRow name="Subtotal" value={`₹ ${car[0]?.price * hours}`} />
              <PriceRow name="Tax" value={`₹ 0`} />

              <h2 className="text-dark text-lg font-bold col-span-2 self-end">
                Total Price
              </h2>
              <p className="text-2xl text-dark font-bold  self-center ml-auto row-span-2">
                {`₹ ${car[0]?.price * hours}`}
              </p>

              <p className="text-secondary-300 col-span-2 self-start">
                including taxes
              </p>
            </div>
          </div>
        </form>
      </UserLayout>
    </>
  );
}

function PriceRow(props) {
  return (
    <>
      <p className="text-secondary-300 col-span-2 font-medium mb-2">
        {props.name}
      </p>
      <p className="ml-auto text-dark font-semibold mb-2">{props.value}</p>
    </>
  );
}

export default Checkout;
