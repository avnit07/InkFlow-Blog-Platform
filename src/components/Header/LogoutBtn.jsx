import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' // ✅ ADD THIS
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn({ mobile = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate() // ✅ ADD THIS

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/") // ✅ THIS IS THE FIX — go home after logout
        })
    }

    return (
        <button
            onClick={logoutHandler}
            className={mobile
                ? 'w-full text-left px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2'
                : 'inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200'
            }
        >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
            </svg>
            Logout
        </button>
    )
}

export default LogoutBtn