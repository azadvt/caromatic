import React, { useEffect } from 'react'
import Cards from '../../components/Cards/Cards'
import {useDispatch,useSelector} from 'react-redux'
import { getCars } from '../../features/Car/carSlice'
import "./CarDisplay.css"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
function ScrollDisplay() {
    const dispatch = useDispatch()
    const {carData,isLoading } = useSelector((state)=>state.car)
  
    useEffect(()=>{
        dispatch(getCars())
    
      },[dispatch])
if(isLoading){
    return(<LoadingSpinner/>)
}
  return (
    <section className="flex flex-col gap-4 ">
      <p className="text-light">Recommended</p>
      
    <div
      className="grid grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] gap-6"
    >
       {carData.map((car,index)=>(
      <Cards car={car} admin={false} key={index}/>

      ))}
    </div>
    <button
        className="py-4 px-6   rounded-sm m-auto mt-4"
      >View More</button>
  </section>
    )
}

export default ScrollDisplay