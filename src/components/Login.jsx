import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='h-screen w-full flex overflow-hidden'>
        {/* Left Side - Dynamic Branding */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 relative overflow-hidden'>
            {/* Animated Background Blobs */}
            <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob'></div>
                <div className='absolute top-40 right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000'></div>
                <div className='absolute bottom-20 left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000'></div>
            </div>

            {/* Floating Shapes */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-1/4 left-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-12 animate-pulse'></div>
                <div className='absolute top-1/3 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse animation-delay-2000'></div>
                <div className='absolute bottom-1/3 left-1/4 w-12 h-12 bg-white/10 rounded-lg rotate-45 animate-pulse animation-delay-4000'></div>
            </div>

            {/* Grid Pattern */}
            <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
            
            {/* Content Container */}
            <div className='relative z-10 flex flex-col justify-between p-12 w-full'>
                {/* Top - Logo */}
                <div>
                    <Link to="/" className='flex items-center space-x-3 group'>
                        <div className='w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300'>
                            <Logo width="30px" />
                        </div>
                        <span className='text-white text-2xl font-bold'>InkFlow</span>
                    </Link>
                </div>

                {/* Middle - Main Content */}
                <div className='max-w-lg space-y-8'>
                    <div>
                        <h1 className='text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
                            Welcome back to your stories
                        </h1>
                        <p className='text-xl text-blue-100 leading-relaxed'>
                            Continue where you left off. Your ideas are waiting.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20'>
                            <div className='text-3xl font-bold text-white mb-1'>10K+</div>
                            <div className='text-blue-200 text-sm'>Writers</div>
                        </div>
                        <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20'>
                            <div className='text-3xl font-bold text-white mb-1'>50K+</div>
                            <div className='text-blue-200 text-sm'>Stories</div>
                        </div>
                        <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20'>
                            <div className='text-3xl font-bold text-white mb-1'>1M+</div>
                            <div className='text-blue-200 text-sm'>Readers</div>
                        </div>
                    </div>

                    {/* Feature Pills */}
                    <div className='flex flex-wrap gap-3'>
                        <div className='px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium flex items-center space-x-2'>
                            <span>✨</span>
                            <span>Rich Editor</span>
                        </div>
                        <div className='px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium flex items-center space-x-2'>
                            <span>🎨</span>
                            <span>Beautiful Themes</span>
                        </div>
                        <div className='px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium flex items-center space-x-2'>
                            <span>📊</span>
                            <span>Analytics</span>
                        </div>
                    </div>
                </div>

                {/* Bottom - Testimonial */}
                <div className='max-w-lg bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg'>
                            S
                        </div>
                        <div>
                            <p className='text-blue-50 mb-3 leading-relaxed'>
                                "InkFlow transformed how I write and publish. The interface is intuitive and the features are powerful."
                            </p>
                            <div>
                                <p className='text-white font-semibold text-sm'>Sarah Johnson</p>
                                <p className='text-blue-200 text-xs'>Tech Blogger • 250K followers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto'>
            {/* Mobile Logo */}
            <div className='lg:hidden p-6 border-b border-gray-100'>
                <Link to="/" className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
                        <Logo width="25px" />
                    </div>
                    <span className='text-xl font-bold text-gray-800'>InkFlow</span>
                </Link>
            </div>

            {/* Form Container */}
            <div className='flex-1 flex items-center justify-center px-6 sm:px-12 py-12'>
                <div className='w-full max-w-md'>
                    {/* Header */}
                    <div className='mb-10'>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Sign in</h2>
                        <p className="text-gray-600 text-lg">Enter your credentials to access your account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                            <div className='flex items-start space-x-3'>
                                <svg className='w-5 h-5 text-red-500 mt-0.5 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                                </svg>
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(login)} className='space-y-6'>
                        <Input
                            label="Email Address"
                            placeholder="you@example.com"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        
                        <div>
                            <div className='flex items-center justify-between mb-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Password
                                </label>
                                <button type='button' className='text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'>
                                    Forgot?
                                </button>
                            </div>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>
                        
                        <Button
                            type="submit"
                            className="w-full py-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">Don't have an account?</span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <Link
                        to="/signup"
                        className="flex items-center justify-center w-full py-4 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-200"
                    >
                        Create New Account
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login