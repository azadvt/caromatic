import React from 'react'
import UserLayout from '../../components/Layout/User/UserLayout'
import img from '../../assets/hero.jpg'
function HeroSection(){
  return(
    <section className='grid grid-cols-1 grid-rows-3 content-center gap-4 m-auto my-8 max-w-[100rem]md:grid-rows-2 md:grid-cols-2 md:gap-8 md:mt-12
    lg:my-16 '>
      <div className='text-center max-w-2xl row-start-2 
        md:text-start
        lg:row-start-1 '>
        <h1 className='font-bold text-4xl text-dark leading-relaxed '>Rent Your Dream Car <br /> Around the World</h1>
        <p className='text-xl mt-4 leading-loose'>We provide the best car options, with premium customer services at a
          competitive price</p>
      </div>
      <img src={img} alt="" className='self-center max-w-full max-h-full object-cover row-start-1 col-start-1 col-span-2
          lg:row-span-2 lg:col-start-2 lg:col-span-1'/>
    </section>
  )
}


function Home() {
  return (
    <div>
        <UserLayout>
        <div className="page py-5 px-4 md:py-8 md:px-16">
            <HeroSection/>
          </div>
        </UserLayout>
    </div>
  )
}

export default Home