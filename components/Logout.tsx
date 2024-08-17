'use client'
import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/app/authenticate/auth.actions'

// Define props type
interface LogoutProps {
  id: string;
}

// Destructure `id` from props
const Logout: React.FC<LogoutProps> = ({ id }) => {
  return (
    <Button onClick={() => logout(id)}>Logout</Button>
  )
}

export default Logout;
