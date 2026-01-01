import { Heart, MapPinHouse, MoveRight, PackageCheck, ShoppingCart } from 'lucide-react';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom';

function ShoppingAccount() {
  const { user } = useSelector(state=>state.auth);
  const [hover, setHover] = useState(null);

  function handleMouseEnter  (id){
    setHover(id);
  }

  return (
    <div>
      <div
        className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-8 bg-white  rounded-t-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front'/>
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{user.userName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    
      <div className='container p-4 grid md:grid-cols-2 lg:grid-cols-4 mx-auto gap-4 mt-10'>
        <Link to={'/shop/account/address'} id='1' onMouseLeave={() => setHover(null)} onMouseEnter={() => handleMouseEnter(`1`)} className='bg-gradient-to-bl hover:shadow-md hover:scale-105 transition-transform transition-shadow ease-in-out rounded-xl px-4 py-4 shadow-amber-500  from-orange-300 to-orange-500'>
           <div className='flex justify-between items-center'>
            <MapPinHouse className='size-10 text-white' />
            <MoveRight  className={`size-5 text-white animate-bounce ${hover === '1' ? 'opacity-100' : 'opacity-0'}`} />
           </div>
             <h2 className='text-white font-semibold text-xl'>Address</h2>
           <div className='mt-1'>
             <p className='text-gray-100 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
           </div>
        </Link>


        <div id='2' onMouseLeave={() => setHover(null)} onMouseEnter={() => handleMouseEnter(`2`)} className='bg-gradient-to-bl hover:shadow-md hover:scale-105 transition-transform transition-shadow ease-in-out rounded-xl px-4 py-4 shadow-fuchsia-500  from-fuchsia-500 to-pink-500'>
          <div className='flex justify-between items-center'>
            <PackageCheck className='size-10 text-white' />
            <MoveRight className={`size-5 text-white animate-bounce ${hover === '2' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <h2 className='text-white font-semibold text-xl'>Orders</h2>
          <div className='mt-1'>
            <p className='text-gray-100 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>


        <div id='3' onMouseLeave={() => setHover(null)} onMouseEnter={() => handleMouseEnter(`3`)} className='bg-gradient-to-tr hover:shadow-md hover:scale-105 transition-transform transition-shadow ease-in-out rounded-xl px-4 py-4 shadow-lime-500  from-yellow-500 to-lime-300'>
          <div className='flex justify-between items-center'>
            <ShoppingCart className='size-10 text-white' />
            <MoveRight className={`size-5 text-white animate-bounce ${hover === '3' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <h2 className='text-white font-semibold text-xl'>Cart</h2>
          <div className='mt-1'>
            <p className='text-gray-100 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <div id='4' onMouseLeave={() => setHover(null)} onMouseEnter={() => handleMouseEnter(`4`)} className='bg-gradient-to-bl hover:shadow-md hover:scale-105 transition-transform transition-shadow ease-in-out rounded-xl px-4 py-4 shadow-blue-500   from-cyan-300 to-blue-600'>
          <div className='flex justify-between items-center'>
            <Heart  className='size-10 text-white' />
            <MoveRight className={`size-5 text-white animate-bounce ${hover === '4' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <h2 className='text-white font-semibold text-xl'>Address</h2>
          <div className='mt-1'>
            <p className='text-gray-100 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>


      </div>
      <Outlet/>
    </div>
  )
}

export default ShoppingAccount;