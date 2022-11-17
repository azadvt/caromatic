import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCars } from "../../features/Car/carSlice";
import UserLayout from "../../components/Layout/User/UserLayout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
function CarSection() {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate()
  if(id===null){
    navigate('/error')
  }
  const dispatch = useDispatch();
  const { carData, isLoading, } = useSelector(
    (state) => state.car
  );
  


  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const car = carData.filter((carData) => carData._id === id);

  if(isLoading){
    return (<LoadingSpinner/>)
  }
  return (
    <UserLayout>
    <div className="car grid md:grid-cols-2 md:grid-rows-1 grid-rows-[auto_auto] grid-cols-1 gap-6 justify-around		 w-3/4 m-auto">
      <CarPictures car={car}/>
      <CarDetails car={car}/>
    </div>
    </UserLayout>
  );
}

function SpecGroup(props) {
  return (
    <div className="spec__group flex justify-between lg:text-lg text-md font-medium">
      <p className="text-secondary-300">{props.name}</p>
      <p>{props.value}</p>
    </div>
  );
}

function CarDetails({car}) {
  const navigate = useNavigate()

  const rentNow = (id) => {
    navigate('/checkout',{state:id})
  }
  return (
    <div className="car__details p-6 rounded-2xl flex flex-col bg-white  md:mr-auto drop-shadow-md mt-10">
      <h2 className=" font-bold text-dark lg:text-3xl text-2xl">{car[0]?.name}</h2>
     
      <p className="car__description tex-lg lg:mt-8 mt-4 leading-loose">
        {car[0]?.description}
      </p>
      <div className="car__specs grid l xl:grid-cols-1 grid-cols-1  gap-x-8 md:gap-y-4 gap-y-4 lg:mt-auto my-4">
        <SpecGroup name="Car Type" value={car[0]?.type}></SpecGroup>
        <SpecGroup name="Capacity" value={car[0]?.seat+" Person"}></SpecGroup>
        <SpecGroup name="Transimission" value={car[0]?.transmission}></SpecGroup>
        <SpecGroup name="Petrol" value={car[0]?.fuel+" L"}></SpecGroup>
      </div>
      <div className="car__actions mt-auto">
        <div className="flex md:flex-row flex-col justify-between md:items-end lg:gap-6 gap-4">
          <div className="flex-1">
            <p className="text-almost-black fw-bold fs-xl">
              {car[0]?.price} /<span className="fs-sm text-light fw-base">Hour</span>
            </p>

            
          </div>
          
          <button
            className=" bu-med fw-base flex-1 rounded-sm py-4 text-white bg-zinc-800 "
             onClick={()=>rentNow(car[0]?._id)}
          >Rent Now</button>
        </div>
      </div>
    </div>
  );
}
function CarPictures({car}) {
  const [activePic, setActivePic] = useState(0);

  const ActiveBorder = (index) => {
    return index === activePic ? " border-2 border-accent-500 " : "";
  };


  
  
  return (
    <div className="car__pictures grid grid-cols-3 gap-4 grid-rows-4  self-start md:ml-auto">
      <img
        className="block m-auto col-span-3 row-span-3 rounded-2xl border border-secondary-200"
        src={car[0]?.imageUrl[activePic]}
        alt=""
      />
      <img
        className={"rounded-2xl" + ActiveBorder(0)}
        src={car[0]?.imageUrl[0]}
        onClick={() => {
          setActivePic(0);
        }}
        alt='car pic'
      ></img>
      <img
        className={"rounded-2xl" + ActiveBorder(1)}
        src={car[0]?.imageUrl[1]}
        onClick={() => {
          setActivePic(1);
        }}
        alt='car pic'

      ></img>
      <img
        className={"rounded-2xl" + ActiveBorder(2)}
        src={car[0]?.imageUrl[2]}
        onClick={() => {
          setActivePic(2);
        }}
        alt='car pic'

      ></img>
    </div>
  );
}



export default CarSection;
