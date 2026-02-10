import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    
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
                        <span>
                            {new Date().toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <span className='text-blue-600 font-medium group-hover:underline'>
                            Read more →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard