import React, { useEffect } from "react";
import UserLayout from "../../components/Layout/User/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { filterCars, getCars } from "../../features/Car/carSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Cards from "../../components/Cards/Cards";
function Carlisting() {
  const dispatch = useDispatch();
  const { carData,filterCarsData, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.car
  );

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const filter = (value) => {
    dispatch(filterCars(value))
  };
  const types = [...new Set(carData.map((item,) => item.type))];
  const cars = filterCarsData.length==0 ? carData : filterCarsData
  const total = cars.length;


  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <UserLayout>
      <div className="page md:flex md:gap-4">
        <div className="sidebar  lg:w-1/4 md:w-1/3 md:max-w-[18rem] w-ful">
          <div className="backdrop md:hidden w-full h-full bg-secondary-700 opacity-50"></div>
          <div className="filter bg-white w-full h-full p-4 flex flex-col gap-12 ">
            <div className="filter__group">
              <p className="text-secondary-300 text-sm tracking-widest font-semibold">
                TYPE
              </p>
              {types?.map((car, i) => (
                <div className="flex flex-col gap-4 mt-8" key={i}>
                  <div className="flex gap-4 font-semibold">
                    <input
                      type="checkbox"
                      className="checkbox cursor-pointer"
                      onChange={() => filter(car)}
                    />
                    <p>{car}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="recommended flex flex-col gap-4 mt-6 flex-1 p-4 pr-6">
          <div className="flex justify-end gap-8">
            <p className="text-light mr-auto">{total} Results</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-8 gap-y-16 justify-items-center items-center">
           
            {  cars?.map((car, index) => (
              <Cards car={car} key={index} />
            ))}
          </div>
        </section>
      </div>
    </UserLayout>
  );
}

export default Carlisting;
