import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, $createdAt }) {  // ✅ accept $createdAt

    // ✅ Use real post date, fallback to "Unknown date" if missing
    const formattedDate = $createdAt
        ? new Date($createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        : 'Unknown date'

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='w-full h-48 bg-gray-200 overflow-hidden'>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                </div>
                <div className='p-5'>
                    <h2 className='text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors'>
                        {title}
                    </h2>
                    <div className='flex items-center justify-between text-sm text-gray-500 mt-3'>
                        <span className='flex items-center gap-1'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                            {formattedDate}  {/* ✅ real date */}
                        </span>
                        <span className='text-blue-600 font-medium'>
                            Read more →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard