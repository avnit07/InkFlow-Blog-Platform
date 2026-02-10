import React from 'react'
import logo from '../assets/logo.png'

function Logo({ width = '40px' }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="InkFlow Logo"
        style={{ width }}
        className="object-contain"
      />
    </div>
  )
}

export default Logo
