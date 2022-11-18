import React, { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import userIco from "../../assets/icons/user .png";
import { logout} from "../../features/userAuth/userAuthSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminLogout } from "../../features/adminAuth/adminAuthSlice";
export function NavbarTop() {
  const [dropdown,showDropdown] = useState(false)
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.userAuth)
  const clickLogout = ()=>{
    dispatch(logout())

  }
  return (
    <nav className="top-nav px-4 py-8 bg-white items-center flex border-b border-b-secondary-200">
      <Link to='/'><p className="logo fw-bold text-2xl text-dark">caromatic</p></Link>
      <ul className="flex gap-3 md:gap-5 ml-auto items-center">
        {user ? <li>
          <img
            className=" w-8 h-8 rounded-full cursor-pointer	"
            src={userIco}
            alt=""
            onClick={() => {showDropdown(dropdown ? false :true)}}
          ></img>
        </li> :<><li><Link to="/login"><button  className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-zinc-800">signin</button></Link></li> 
        <li> <Link to="/signup"><button className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-zinc-800">signup</button></Link></li></> }
      </ul>
      {dropdown && user ? <div
        className="absolute right-8 top-20  w-30 origin-top-right  rounded-md bg-white shadow-lg"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          
          <a
            onClick={()=>{clickLogout()}}
            className="text-gray-700 block px-4 py-2 text-sm"
          >
            Logout
          </a>
          <Link to='/bookings'>
          <a
            
            className="text-gray-700 block px-4 py-2 text-sm"
          >
            My Bookings
          </a>
          </Link>
          
        </div>
       
      </div> : null}
    </nav>
  );
}

export function AdminNavbarTop() {
  const [dropdown,showDropdown] = useState(false)
  const dispatch = useDispatch()

  const {admin} = useSelector((state)=>state.adminAuth)
  const clickLogout = ()=>{
    dispatch(adminLogout())

  }
  return (
    <nav className="top-nav px-4 py-8 bg-white items-center flex border-b border-b-secondary-200">
      <p className="logo fw-bold text-2xl text-dark">caromatic admin</p>
      <ul className="flex gap-3 md:gap-5 ml-auto items-center">
        {admin ? <li>
          <img
            className=" w-8 h-8 rounded-full cursor-pointer	"
            src={userIco}
            alt=""
            onClick={() => {showDropdown(dropdown ? false :true)}}
          ></img>
        </li>:null }
      </ul>
      {dropdown && admin ? <div
        className="absolute right-8 top-20  w-24 origin-top-right  rounded-md bg-white shadow-lg"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          
          <a
            onClick={()=>{clickLogout()}}
            className="text-gray-700 block px-4 py-2 text-sm"
          >
            Logout
          </a>
        </div>
       
      </div> : null}
    </nav>
  );
}
export function Footer() {
  return (
    <footer className="footer bg-white">
      <nav className="bottom-nav flex md:flex-row flex-col gap-6  wrap  md:py-8 px-4 py-3">
        <div className="bottom-nav__col flex-col flex   gap-4 flex-1 ">
          <p className="logo fw-bold md:text-3xl text-2xl text-dark ">
            caromatic
          </p>
          <p className="text-justify">
            Our vision is to provide convenience
            <br />
            and help increase your sales business.
          </p>
        </div>

        <div className="flex flex-col  align-start gap-4">
          <p className="text-dark fw-bold fs-xl">About</p>
          <ul className="flex flex-col gap-2 ">
            <li>
              <a href="/#">How it works</a>
            </li>
            <li>
              <a href="/#">Featured</a>
            </li>
            <li>
              <a href="/#">Partnership</a>
            </li>
            <li>
              <a href="/#">Business Relations</a>
            </li>
          </ul>
        </div>
        <div className="bottom-nav__col flex flex-col  align-start  gap-4">
          <p className="text-dark fw-bold fs-xl">Community</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="/#">Events</a>
            </li>
            <li>
              <a href="/#">Podcast</a>
            </li>
            <li>
              <a href="/#">Blog</a>
            </li>
            <li>
              <a href="/#">Invite a friend</a>
            </li>
          </ul>
        </div>
        <div className="bottom-nav__col flex flex-col  align-start gap-4">
          <p className="text-dark fw-bold fs-xl">Socials</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="/#">Discord</a>
            </li>
            <li>
              <a href="/#">Instagram</a>
            </li>
            <li>
              <a href="/#">Twitter</a>
            </li>
            <li>
              <a href="/#">Facebook</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="legal flex md:flex-row flex-col gap-3 wrap p-4">
        <p className="text-dark fw-bold flex-1 text-sm md:text-base">
          ©2022 caromatic. All rights reserved
        </p>
        <a href="/#" className="text-sm md:text-base">
          Privacy Policy
        </a>
        <a href="/#" className="text-sm md:text-base">
          Terms and conditions
        </a>
      </div>
    </footer>
  );
}
