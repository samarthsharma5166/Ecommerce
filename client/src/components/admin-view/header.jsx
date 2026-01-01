import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/auth-slice'

function AdminHeader({setoPen}) {
  const dispatch = useDispatch()
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>setoPen(true)}  className="lg:hidden sm:block">
      <AlignJustify />
      <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={() => dispatch(logout())} className="inline-flex gap-2 items-center rounded-md px-4 text-sm py-2 font-medium shadow"><LogOut/>Logout</Button>
      </div>
    </header>
  )
}

export default AdminHeader