import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-4 shadow-sm bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
              <Logo width='50px' />
              <span className='text-xl font-bold text-gray-900 hidden sm:block'>
                InkFlow
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className='flex items-center gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header