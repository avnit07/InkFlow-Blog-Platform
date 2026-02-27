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

    //  Loading — Skeleton cards
    if (loading) {
        return (
            <div className="w-full">
                {/* Skeleton Hero */}
                <section className="w-full py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <div className="h-12 bg-gray-200 rounded-2xl animate-pulse mb-4 mx-auto w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded-xl animate-pulse mb-8 mx-auto w-1/2"></div>
                        <div className="flex gap-4 justify-center">
                            <div className="h-12 w-36 bg-gray-200 rounded-xl animate-pulse"></div>
                            <div className="h-12 w-36 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Skeleton Cards */}
                <section className="w-full py-12 bg-white">
                    <Container>
                        <div className="h-8 bg-gray-200 rounded-xl animate-pulse mb-8 w-48"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
                                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            </div>
        )
    }

    // Empty State 
    if (posts.length === 0) {
        return (
            <div className="w-full">
                {/* Hero */}
                <section className="w-full py-20 md:py-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
                   
                    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

                    <Container>
                        <div className="text-center max-w-3xl mx-auto px-4 relative z-10">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                Now Live — Start Writing Today
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                                Share Your Stories with{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    InkFlow
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                                A modern blogging platform where your ideas flow freely.
                                Create, publish, and share beautiful stories with the world.
                            </p>

                            {!authStatus ? (
                                <div className="flex gap-4 justify-center flex-wrap">
                                    <Link to="/signup">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-base">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Start Writing Free
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-base">
                                            Login →
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Link to="/add-post">
                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-base">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Your First Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </Container>
                </section>

                {/* Feature Cards */}
                <section className="w-full py-20 bg-white">
                    <Container>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything you need to write</h2>
                            <p className="text-gray-500 text-lg">Simple, powerful, and beautiful</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[
                                { icon: '✍️', title: 'Write Freely', desc: 'Rich text editor with full formatting support', color: 'from-blue-50 to-indigo-50 border-blue-100' },
                                { icon: '🌟', title: 'Share Ideas', desc: 'Publish instantly and reach readers worldwide', color: 'from-purple-50 to-pink-50 border-purple-100' },
                                { icon: '🚀', title: 'Grow Together', desc: 'Build your personal brand as a writer', color: 'from-green-50 to-teal-50 border-green-100' },
                            ].map((feature) => (
                                <div
                                    key={feature.title}
                                    className={`text-center p-8 bg-gradient-to-br ${feature.color} rounded-2xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                                >
                                    <div className="text-5xl mb-4">{feature.icon}</div>
                                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="text-center mt-14">
                            {authStatus ? (
                                <Link to="/add-post">
                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
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
                                        <Button className= "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-base">
                                            Create Free Account
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Container>
                </section>
            </div>
        )
    }

    // Posts Available 
    return (
        <div className="w-full">

            {/* Hero — shown when posts exist */}
            <section className="w-full py-14 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
                {/* Background  */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 translate-x-1/2 translate-y-1/2"></div>

                <Container>
                    <div className="text-center max-w-3xl mx-auto px-4 relative z-10">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100 text-blue-600 text-sm font-medium mb-5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            {posts.length} {posts.length === 1 ? 'story' : 'stories'} published
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                InkFlow
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </p>

                        {/* CTA buttons in hero */}

                        <div className="flex gap-3 justify-center flex-wrap">
                            {authStatus ? (
                                <Link to="/add-post">
                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-7 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Write a Post
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup">
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-7 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                                            Start Writing Free
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-7 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
                                            Login →
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="w-full py-12 bg-white">
                <Container>
                    {/* Section Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Latest Stories</h2>
                                <p className="text-sm text-gray-500 mt-0.5">Fresh from our writers</p>
                            </div>
                        </div>
                        {authStatus && (
                            <Link to="/add-post">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    New Post
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/*  3 columns  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Home