import React from "react";
import {  useNavigate } from "react-router-dom";
import './Cards.css'
function Cards(props) { 

  const {
    _id,
    name,
    type, 
    seat,
    transmission,
    fuel,
    price,
    imageUrl,
  } = props?.car;
  const navigate = useNavigate()
  const viewCar = (id) => {
    navigate('/car',{state:id})
  }
  return (
    <div className="catalogue-card flex flex-col gap-6 rounded-xl md:p-5 p-4 bg-white h-96 w-90 cursor-pointer border border-zync-600" >
      <div className="flex flex-row justify-between items-start">
        <div>
          <p className="text-almost-black fw-bold fs-xl">{name}</p>
          <p className="fw-bold fs-sm text-light">{type}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center flex-1">
        <img
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className="catalogue-card__pircture flex-1 my-4  w-56 object-contain"
          src={imageUrl}
          alt={""}
          onClick={()=>viewCar(_id)}

        />
        <div className="catalogue-card__specs flex flex-row gap-4 justify-between text-light">
          <div className="spec-group flex flex-row gap-2 items-end">
            <p className="fs-sm fw-medium ">{fuel}L</p>
          </div>
          <div className="spec-group flex flex-row gap-2 items-end">
            <p className="fs-sm fw-medium ">{transmission}</p>
          </div>
          <div className="spec-group flex flex-row gap-2 items-end">
            <p className="fs-sm fw-medium ">{seat}People</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-end gap-6">
        <div className="flex-1">
          <p className="text-almost-black fw-bold fs-xl">₹{price}</p>
          /<span className="fs-sm text-light fw-base">Hour</span>
        </div>
        <button className=" bu-med fw-base flex-1 rounded-sm py-3 bg-zinc-800  text-white"
         onClick={()=>viewCar(_id)} >Rent Now</button>

      </div>
    </div>
  );
}


export default Cards;
