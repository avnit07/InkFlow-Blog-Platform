import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">

                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        
                        <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-200 to-indigo-300 leading-none select-none">
                            404
                        </h1>
                       
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                                <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Oops! The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Go to Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </button>
                </div>

                {/* Quick Links */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-400 mb-4">Or try one of these pages</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Link
                            to="/"
                            className="px-4 py-2 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200"
                        >
                            🏠 Home
                        </Link>
                        <Link
                            to="/all-posts"
                            className="px-4 py-2 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200"
                        >
                            📚 All Posts
                        </Link>
                        <Link
                            to="/add-post"
                            className="px-4 py-2 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200"
                        >
                            ✍️ Write Post
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200"
                        >
                            🔐 Login
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}