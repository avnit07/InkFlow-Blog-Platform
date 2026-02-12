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
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    // Smoother Loading state - No skeleton, just spinner
    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className='text-center'>
                    <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
                    <p className='text-gray-600 font-medium'>Loading stories...</p>
                </div>
            </div>
        )
    }

    // Empty state - no posts available
    if (posts.length === 0) {
        return (
            <div className="w-full animate-fadeIn">
                {/* Hero Section - Full Width Background */}
                <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <Container>
                        <div className="text-center max-w-3xl mx-auto px-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                                Share Your Stories with{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">InkFlow</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8">
                                A modern blogging platform where your ideas flow freely.
                                Create, publish, and share beautiful stories.
                            </p>
                            {!authStatus ? (
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <Link to="/signup">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                                            Start Writing
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                                            Login
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Link to="/add-post">
                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
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
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
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
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-3">✍️</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Write Freely</h3>
                                    <p className="text-sm text-gray-600">Express yourself with our rich text editor</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-3">🌟</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Share Ideas</h3>
                                    <p className="text-sm text-gray-600">Connect with readers who care</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
                                    <div className="text-4xl mb-3">🚀</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Grow Together</h3>
                                    <p className="text-sm text-gray-600">Build your audience organically</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center">
                                {authStatus ? (
                                    <Link to="/add-post">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Write Your First Post
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="flex gap-4 justify-center flex-wrap">
                                        <Link to="/login">
                                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                                                Login to Get Started
                                            </Button>
                                        </Link>
                                        <Link to="/signup">
                                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
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
        <div className="w-full animate-fadeIn">
            {/* Hero Section - Full Width Background */}
            <section className="w-full py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <Container>
                    <div className="text-center max-w-3xl mx-auto px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">InkFlow</span>
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
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Latest Stories
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                            </p>
                        </div>
                        {authStatus && (
                            <Link to="/add-post">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    New Post
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <div key={post.$id} className="animate-fadeIn">
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