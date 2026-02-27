import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    // ✅ Also watch userData to know when App.jsx auth check is done
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, userData, navigate, authentication])

    return loader ? (
        // ✅ Proper loading spinner instead of plain <h1>
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#6B7280] text-sm font-medium">Loading...</p>
            </div>
        </div>
    ) : <>{children}</>
}