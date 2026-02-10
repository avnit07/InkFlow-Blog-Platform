import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="mb-8">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="animate-pulse">
                                <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                                <div className="bg-white p-5 rounded-b-xl">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }

    // Empty state
    if (posts.length === 0) {
        return (
            <div className='w-full py-16'>
                <Container>
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            No Posts Found
                        </h2>
                        <p className="text-gray-600 text-lg">
                            There are no published posts yet. Check back soon!
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    // Posts grid
    return (
        <div className='w-full py-8'>
            <Container>
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        All Posts
                    </h1>
                    <p className="text-gray-600">
                        Explore {posts.length} {posts.length === 1 ? 'story' : 'stories'} from our community
                    </p>
                </div>

                {/* Posts Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts