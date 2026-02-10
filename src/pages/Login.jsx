import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className='fixed inset-0 z-50 bg-white'>
      <LoginComponent />
    </div>
  )
}

export default Login