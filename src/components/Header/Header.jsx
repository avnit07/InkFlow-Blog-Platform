import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home',      slug: '/',          active: true },
    { name: 'Login',     slug: '/login',     active: !authStatus },
    { name: 'Signup',    slug: '/signup',    active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post',  slug: '/add-post',  active: authStatus, cta: true }, // ✅ CTA flag
  ]

  const handleNavClick = (slug) => {
    navigate(slug)
    setMenuOpen(false)
  }

  return (
    <header className='bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm'>
      <Container>
        <nav className='flex items-center justify-between h-16'>

          {/* ── Logo ── */}
          <Link
            to='/'
            onClick={() => setMenuOpen(false)}
            className='flex items-center gap-2.5 hover:opacity-90 transition-opacity'
          >
            <div className='w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md'>
              {/* Ink pen nib icon */}
              <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.707 5.826l-3.535-3.533a.999.999 0 00-1.408-.006L7.096 10.95a.998.998 0 00-.293.704v3.862l-4.2 4.201a1 1 0 001.414 1.414l4.2-4.2h3.862a1 1 0 00.704-.294l8.662-8.668a1.001 1.001 0 00-.738-1.143zM11.271 14.516h-2.76v-2.76l6.439-6.443 2.76 2.761-6.439 6.442z'/>
              </svg>
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              InkFlow
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className='hidden md:flex items-center gap-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  {item.cta ? (
                    // ✅ "Add Post" as a gradient CTA button
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className='ml-2 flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                      </svg>
                      Add Post
                    </button>
                  ) : (
                    // ✅ Regular nav items
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                        ${location.pathname === item.slug
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ) : null
            )}

            {/* ✅ Logout Button */}
            {authStatus && (
              <li className='ml-1'>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* ── Mobile: Add Post + Hamburger ── */}
          <div className='flex items-center gap-2 md:hidden'>
            {authStatus && (
              <button
                onClick={() => handleNavClick('/add-post')}
                className='flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg shadow'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                </svg>
                Write
              </button>
            )}
            <button
              className='p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors'
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label='Toggle menu'
            >
              {menuOpen ? (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </button>
          </div>

        </nav>

        {/* ── Mobile Dropdown ── */}
        {menuOpen && (
          <div className='md:hidden border-t border-gray-100 pb-4'>
            <ul className='flex flex-col gap-1 pt-3'>
              {navItems.map((item) =>
                item.active && !item.cta ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200
                        ${location.pathname === item.slug
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='pt-2 border-t border-gray-100 mt-1'>
                  <LogoutBtn mobile />
                </li>
              )}
            </ul>
          </div>
        )}

      </Container>
    </header>
  )
}

export default Header