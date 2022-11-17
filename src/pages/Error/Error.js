import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";
function Error() {
  return (
    <div class="flex flex-col items-center justify-center w-screen h-screen bg-white">
    <p class="text-5xl text-dark md:text-7xl lg:text-9xl">404</p>
    <Link to="/"><button className="mt-8 bg-zinc-800 rounded-lg p-3 text-white">Go To Home</button></Link>
    </div>
  );
}

export default Error;
