import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../components/Layout/User/UserLayout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getBookings } from "../../features/Booking/bookingSlice";
import { Link } from "react-router-dom";
function BookingsTable() {
  const { bookingData, isLoading, isError } = useSelector(
    (store) => store.booking
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  console.log(bookingData);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <UserLayout>
      {bookingData.length === 0 ? (
        <div class="flex flex-col items-center justify-center w-screen h-screen bg-white">
          <p class="text-5xl text-dark md:text-7xl lg:text-4xl">No Bookings </p>
          <Link to="/">
            <button className="mt-8 bg-zinc-800 rounded-lg p-3 text-white">
              Go To Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-full sm:px-6 min-h-screen">
          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <h1>Bookings</h1>

            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Car </th>
                  <th className="font-normal text-left pl-12">Address</th>
                  <th className="font-normal text-left pl-12">Pick up</th>
                  <th className="font-normal text-left pl-20">Drop off</th>
                  <th className="font-normal text-left pl-20">Payment</th>
                  <th className="font-normal text-left pl-20">Date & Time</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {bookingData.map((data) => (
                  <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-15 h-10">
                          <img
                            className="w-full h-full"
                            src={data?.car?.imageUrl[0]}
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium">{data?.car?.name}</p>
                          <p className="text-xs leading-3 text-gray-600 pt-2">
                            {data?.car?.type}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{data?.name}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        {data?.address} {data?.town}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">{data?.pickUpLocation}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Date:{" "}
                        {data?.pickUpTime
                          .replace(/T/, " ")
                          .replace(/\..+/, "")
                          .slice(0, 11)}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Time:{" "}
                        {data?.pickUpTime
                          .replace(/T/, " ")
                          .replace(/\..+/, "")
                          .slice(11, 16)}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{data?.dropOffLocation}</p>

                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Date:{" "}
                        {data?.dropOffTime
                          .replace(/T/, " ")
                          .replace(/\..+/, "")
                          .slice(0, 11)}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Time:{" "}
                        {data?.dropOffTime
                          .replace(/T/, " ")
                          .replace(/\..+/, "")
                          .slice(11, 16)}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">₹ {data?.total}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        {data?.payment}
                      </p>
                    </td>{" "}
                    <td className="pl-20">
                      <p className="font-medium">
                        Date:{" "}
                        {data?.createdAt
                          .replace(/T/, " ")
                          .replace(/\..+/, "")
                          .slice(0, 11)}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        Time:
                        {data?.createdAt
                          .replace(/T/, " ")
                          .replace(/\..+/, "")
                          .slice(11, 16)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </UserLayout>
  );
}

export default BookingsTable;
