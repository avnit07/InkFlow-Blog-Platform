import React from 'react'

function Logo({ width = '40px' }) {
  return (
    <div className="flex items-center justify-center" style={{ width }}>
      <svg 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Ink Drop Shape */}
        <path 
          d="M60 15C60 15 35 45 35 68C35 82.3594 46.6406 94 61 94C75.3594 94 87 82.3594 87 68C87 45 60 15 60 15Z" 
          fill="url(#gradient1)"
          className="drop-shadow-lg"
        />
        
        {/* Inner Highlight */}
        <path 
          d="M60 25C60 25 45 48 45 65C45 75.4934 53.5066 84 64 84C74.4934 84 83 75.4934 83 65C83 48 60 25 60 25Z" 
          fill="url(#gradient2)"
          opacity="0.4"
        />
        
        {/* Shine Effect - Top Left */}
        <ellipse 
          cx="52" 
          cy="45" 
          rx="8" 
          ry="12" 
          fill="white" 
          opacity="0.35"
          transform="rotate(-25 52 45)"
        />
        
        {/* Center Dot Detail */}
        <circle 
          cx="61" 
          cy="70" 
          r="6" 
          fill="white" 
          opacity="0.2"
        />
        
        {/* Small Sparkle */}
        <circle 
          cx="48" 
          cy="38" 
          r="2.5" 
          fill="white" 
          opacity="0.8"
        />
        
        {/* Gradient Definitions */}
        <defs>
          {/* Main Gradient - Blue to Indigo */}
          <linearGradient 
            id="gradient1" 
            x1="35" 
            y1="15" 
            x2="87" 
            y2="94" 
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="50%" stopColor="#6366F1"/>
            <stop offset="100%" stopColor="#8B5CF6"/>
          </linearGradient>
          
          {/* Inner Gradient - Lighter */}
          <linearGradient 
            id="gradient2" 
            x1="45" 
            y1="25" 
            x2="83" 
            y2="84" 
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#60A5FA"/>
            <stop offset="100%" stopColor="#A78BFA"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Logo