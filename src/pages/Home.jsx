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
                {/* Hero Section - Full Width Background */}
                <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
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

                {/* Enhanced Empty State - White Background */}
                <section className="w-full py-20 bg-white">
                    <Container>
                        <div className="max-w-2xl mx-auto">
                            {/* Icon and Message */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    {authStatus ? "Ready to Share Your Story?" : "No Stories Yet"}
                                </h2>
                                <p className="text-lg text-gray-600">
                                    {authStatus 
                                        ? "Your words have power. Start writing and inspire others with your unique perspective."
                                        : "Our community is just getting started. Login to join the conversation and discover amazing content."
                                    }
                                </p>
                            </div>

                            {/* Feature Cards */}
                            <div className="grid md:grid-cols-3 gap-6 mb-12">
                                <div className="text-center p-6 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-3">✍️</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Write Freely</h3>
                                    <p className="text-sm text-gray-600">Express yourself with our rich text editor</p>
                                </div>
                                <div className="text-center p-6 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-3">🌟</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Share Ideas</h3>
                                    <p className="text-sm text-gray-600">Connect with readers who care</p>
                                </div>
                                <div className="text-center p-6 bg-gray-50 rounded-xl">
                                    <div className="text-3xl mb-3">🚀</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Grow Together</h3>
                                    <p className="text-sm text-gray-600">Build your audience organically</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center">
                                {authStatus ? (
                                    <Link to="/add-post">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Write Your First Post
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="flex gap-4 justify-center flex-wrap">
                                        <Link to="/login">
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                                Login to Get Started
                                            </Button>
                                        </Link>
                                        <Link to="/signup">
                                            <Button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
                                                Create Account
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        )
    }

    // Posts available - show grid
    return (
        <div className="w-full">
            {/* Hero Section - Full Width Background */}
            <section className="w-full py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
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

            {/* Posts Grid - White Background */}
            <section className="w-full py-12 bg-white">
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