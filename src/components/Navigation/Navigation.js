import React from 'react'

export function NavbarTop() {
  return (
    <nav className='top-nav px-4 py-8 bg-white items-center flex border-b border-b-secondary-200'>
      <p className='logo fw-bold text-2xl text-dark'>caromatic</p>
    </nav>
  )
}

  


export function Footer() {
    return (
      <footer className='footer bg-white'>
        <nav className="bottom-nav flex md:flex-row flex-col gap-6  wrap  md:py-8 px-4 py-3">
          <div className='bottom-nav__col flex-col flex   gap-4 flex-1 '>
            <p className='logo fw-bold md:text-3xl text-2xl text-dark '>caromatic</p>
            <p className="text-justify">Our vision is to provide convenience<br/>and help increase your sales business.</p>
          </div>

          <div className='flex flex-col  align-start gap-4'>
          <p className="text-dark fw-bold fs-xl">About</p>
                    <ul className="flex flex-col gap-2 ">
                        <li><a  href="/#">How it works</a></li>
                        <li><a  href="/#">Featured</a></li>
                        <li><a  href="/#">Partnership</a></li>
                        <li><a  href="/#">Business Relations</a></li>
                    </ul>
          </div>
          <div className="bottom-nav__col flex flex-col  align-start  gap-4">
                    <p className="text-dark fw-bold fs-xl">Community</p>
                    <ul className="flex flex-col gap-2">
                        <li><a  href="/#">Events</a></li>
                        <li><a  href="/#">Podcast</a></li>
                        <li><a  href="/#">Blog</a></li>
                        <li><a  href="/#">Invite a friend</a></li>
                    </ul>
                </div>
                <div className="bottom-nav__col flex flex-col  align-start gap-4">
                    <p className="text-dark fw-bold fs-xl">Socials</p>
                    <ul className="flex flex-col gap-2">
                        <li><a  href="/#">Discord</a></li>
                        <li><a  href="/#">Instagram</a></li>
                        <li><a  href="/#">Twitter</a></li>
                        <li><a  href="/#">Facebook</a></li>
                    </ul>
                </div>

        </nav>
        <div className="legal flex md:flex-row flex-col gap-3 wrap p-4">
                <p className="text-dark fw-bold flex-1 text-sm md:text-base">©2022 caromatic. All rights reserved</p>
                <a  href="/#"className="text-sm md:text-base">Privacy Policy</a>
                <a  href="/#"className="text-sm md:text-base">Terms and conditions</a>
            </div>

      </footer>
    )
  }
  
    