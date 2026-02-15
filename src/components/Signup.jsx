import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input} from './index.js'
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
    <div className='min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 p-4'>
        {/* Signup Card */}
        <div className='w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12'>
            {/* Header */}
            <div className='text-center mb-8'>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign Up</h1>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(create)} className='space-y-6'>
                <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    label="Email"
                    placeholder="Enter your email"
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
                    placeholder="Create a password"
                    {...register("password", {
                        required: true,
                    })}
                />
                
                <Button 
                    type="submit" 
                    className="w-full py-3.5 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Sign Up
                </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className='text-blue-600 font-semibold hover:text-blue-700 transition-colors'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Signup