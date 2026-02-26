import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className='text-center'>
                    <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
                    <p className='text-gray-600 font-medium'>Loading post...</p>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <Container>
                {/* Header with Action Buttons */}
                {isAuthor && (
                    <div className="mb-6 flex justify-end gap-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </Button>
                        </Link>
                        <Button
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </Button>
                    </div>
                )}

                {/* Article Container */}
                <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Featured Image */}
                    <div className="w-full h-96 md:h-[500px] bg-gray-900 overflow-hidden relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Optional gradient overlay for better text readability if needed */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">
                                    {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {post.status === 'active' ? '✓ Published' : 'Draft'}
                                </span>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="prose prose-lg max-w-none browser-css">
                            {parse(post.content)}
                        </div>
                    </div>
                </article>

                {/* Back Button */}
                <div className="max-w-4xl mx-auto mt-8">
                    <Link to="/">
                        <Button className="bg-gray-400 hover:bg-gray-600 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-all inline-flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </Container>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                            Delete Post?
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to delete "<strong>{post.title}</strong>"? This action cannot be undone.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 bg-gray-400 hover:bg-gray-500 text-gray-900 py-3 rounded-lg font-semibold transition-all"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    deletePost();
                                    setShowDeleteModal(false);
                                }}
                                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}