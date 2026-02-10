import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='h-screen w-full flex overflow-hidden'>
        {/* Left Side - Dynamic Branding */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700 relative overflow-hidden'>
            {/* Animated Background Blobs */}
            <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob'></div>
                <div className='absolute top-40 right-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000'></div>
                <div className='absolute bottom-20 left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000'></div>
            </div>

            {/* Floating Shapes */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-1/4 right-10 w-24 h-24 border-2 border-white/20 rounded-full animate-pulse'></div>
                <div className='absolute bottom-1/4 left-10 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45 animate-pulse animation-delay-2000'></div>
                <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse animation-delay-4000'></div>
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
                            Start your creative journey today
                        </h1>
                        <p className='text-xl text-purple-100 leading-relaxed'>
                            Join thousands of writers who trust InkFlow to bring their ideas to life.
                        </p>
                    </div>

                    {/* Benefits List */}
                    <div className='space-y-4'>
                        <div className='flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
                            <div className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0'>
                                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                </svg>
                            </div>
                            <div>
                                <p className='text-white font-semibold mb-1'>Powerful Editor</p>
                                <p className='text-purple-200 text-sm'>Format your content with our intuitive rich text editor</p>
                            </div>
                        </div>

                        <div className='flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
                            <div className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0'>
                                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                                </svg>
                            </div>
                            <div>
                                <p className='text-white font-semibold mb-1'>Media Library</p>
                                <p className='text-purple-200 text-sm'>Upload and manage images seamlessly</p>
                            </div>
                        </div>

                        <div className='flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10'>
                            <div className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 flex-shrink-0'>
                                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
                                </svg>
                            </div>
                            <div>
                                <p className='text-white font-semibold mb-1'>Instant Publishing</p>
                                <p className='text-purple-200 text-sm'>Share your work with the world in seconds</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom - Social Proof */}
                <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
                    <div className='flex items-center space-x-4 mb-4'>
                        <div className='flex -space-x-3'>
                            <div className='w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs'>A</div>
                            <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs'>M</div>
                            <div className='w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs'>K</div>
                        </div>
                        <div>
                            <p className='text-white font-semibold text-sm'>Join 10,000+ writers</p>
                            <p className='text-purple-200 text-xs'>Writing amazing stories daily</p>
                        </div>
                    </div>
                    <p className='text-purple-100 text-sm italic'>
                        "The perfect platform for writers who care about their craft."
                    </p>
                </div>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto'>
            {/* Mobile Logo */}
            <div className='lg:hidden p-6 border-b border-gray-100'>
                <Link to="/" className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center'>
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
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Create account</h2>
                        <p className="text-gray-600 text-lg">Start your writing journey in seconds</p>
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
                    <form onSubmit={handleSubmit(create)} className='space-y-6'>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password (min. 8 characters)"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        
                        <Button 
                            type="submit" 
                            className="w-full py-4 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Terms */}
                    <p className='mt-6 text-center text-xs text-gray-500'>
                        By signing up, you agree to our{' '}
                        <a href='#' className='text-indigo-600 hover:text-indigo-700 font-medium'>Terms of Service</a>
                        {' '}and{' '}
                        <a href='#' className='text-indigo-600 hover:text-indigo-700 font-medium'>Privacy Policy</a>
                    </p>

                    {/* Divider */}
                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
                        </div>
                    </div>

                    {/* Sign In Link */}
                    <Link
                        to="/login"
                        className="flex items-center justify-center w-full py-4 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-semibold text-gray-700 transition-all duration-200"
                    >
                        Sign In Instead
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup