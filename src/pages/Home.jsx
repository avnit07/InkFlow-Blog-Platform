import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config"
import { Container, PostCard, Button } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
                        {[1, 2, 3, 4].map((n) => (
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

    // Empty state - no posts available
    if (posts.length === 0) {
        return (
            <div className="w-full">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <Container>
                        <div className="text-center max-w-3xl mx-auto px-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                                Share Your Stories with{' '}
                                <span className="text-blue-600">InkFlow</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8">
                                A modern blogging platform where your ideas flow freely.
                                Create, publish, and share beautiful stories.
                            </p>
                            {!authStatus ? (
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <Link to="/signup">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                            Start Writing
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Link to="/add-post">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                        Create Your First Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </Container>
                </section>

                {/* Empty State */}
                <section className="py-20">
                    <Container>
                        <div className="text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                No Stories Yet
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {authStatus 
                                    ? "Be the first to share your thoughts with the world."
                                    : "Login to start reading amazing stories from our community."
                                }
                            </p>
                        </div>
                    </Container>
                </section>
            </div>
        )
    }

    // Posts available - show grid
    return (
        <div className="w-full">
            {/* Hero Section - shown even when posts exist */}
            <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
                <Container>
                    <div className="text-center max-w-3xl mx-auto px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Welcome to{' '}
                            <span className="text-blue-600">InkFlow</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-600">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="py-12">
                <Container>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Latest Stories
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Home