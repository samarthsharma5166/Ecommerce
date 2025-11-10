import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

function AdminLayout() {

  const [openSidebar,setOpenSidebar]=useState(false)
  return (
    <div className='w-full  flex min-hscreen'>
        {/* admin sidebar */}
        <AdminSidebar open={openSidebar} setoPen={setOpenSidebar}/>
        <div className='flex flex-1 flex-col'>
       {/* admin header */}
         <AdminHeader setoPen={setOpenSidebar}/>
       <main className='flex flex-1 flex-col bg-muted/40 p-4 md:p-6 '>
        <Outlet/>
       </main>

        </div>
    </div>
  )
}

export default AdminLayout