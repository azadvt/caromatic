import React from 'react'
import { Footer, NavbarTop } from '../../Navigation/Navigation'

function UserLayout(props) {
  return (
    <>
    <NavbarTop/>
    {props.children}
    <Footer/>
    </>
  )
}

export default UserLayout