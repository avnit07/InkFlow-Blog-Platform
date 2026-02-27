import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
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

    //  Reading progress bar
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(Math.min(progress, 100));
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //  Read time calculator
    const getReadTime = (content) => {
        if (!content) return "1 min read";
        const text = content.replace(/<[^>]*>/g, "");
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    const deletePost = async () => {
        setIsDeleting(true);
        try {
            await toast.promise(
                appwriteService.deletePost(post.$id),
                {
                    loading: "Deleting post...",
                    success: "Post deleted!",
                    error: "Failed to delete post",
                }
            );
            await appwriteService.deleteFile(post.featuredImage);
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            console.error("Delete post failed:", error);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    //  Loading 
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#6B7280] text-sm font-medium">Loading post...</p>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="min-h-screen bg-[#F5F5F7]">

            {/*  Reading progress bar */}
            <div
                className="fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            />

            
            <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-gray-900">

                
                <div
                    className="absolute inset-0 scale-110"
                    style={{
                        backgroundImage: `url(${appwriteService.getFilePreview(post.featuredImage)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(24px)",
                        opacity: 0.55,
                    }}
                />

                {/* image  */}
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="relative w-full h-full object-contain z-10"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0 z-20" />

                <div className="absolute top-6 left-6 flex items-center gap-2 z-30">
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Home
                    </Link>
                    <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white/70 text-sm">Post</span>
                </div>

                {/* Author buttons — top right
                {isAuthor && (
                    <div className="absolute top-6 right-6 flex items-center gap-2 z-30">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 border border-white/20">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="flex items-center gap-1.5 bg-white/20 hover:bg-red-500/80 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 border border-white/20"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                )} */}

                {/*  Title + status badge — bottom of hero */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 pt-20 z-30">
                    <div className="max-w-4xl mx-auto">
                        {post.status === "active" ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 rounded-full mb-4 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                Published
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full mb-4">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                Draft
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/*  Two-column layout */}
            <Container>
                <div className="max-w-6xl mx-auto py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

                        {/* ── Main Article ── */}
                        <article className="bg-white rounded-2xl border border-[#E2E2E7] shadow-[0_2px_20px_rgba(0,0,0,0.08)] overflow-hidden">

                            {/* Meta bar */}
                            <div className="px-8 md:px-10 pt-8 pb-6 border-b border-[#F3F4F6]">
                                <div className="flex items-center flex-wrap gap-3">
                                    <div className="flex items-center gap-1.5 text-[#6B7280] text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(post.$createdAt).toLocaleDateString("en-US", {
                                            year: "numeric", month: "long", day: "numeric"
                                        })}
                                    </div>
                                    <span className="text-[#E2E2E7]">·</span>
                                    <div className="flex items-center gap-1.5 text-[#6B7280] text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {getReadTime(post.content)}
                                    </div>
                                </div>
                            </div>

                            {/* Content body */}
                            <div className="px-8 md:px-10 py-8">
                                <div className="prose prose-lg max-w-none
                                    prose-headings:text-[#111111] prose-headings:font-bold prose-headings:tracking-tight
                                    prose-p:text-[#374151] prose-p:leading-relaxed
                                    prose-a:text-[#6366F1] prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-[#111111] prose-strong:font-bold
                                    prose-blockquote:border-l-[#6366F1] prose-blockquote:text-[#6B7280]
                                    prose-code:text-[#6366F1] prose-code:bg-[#EEF2FF] prose-code:px-1.5 prose-code:rounded
                                    prose-img:rounded-xl prose-img:shadow-sm
                                    browser-css">
                                    {parse(post.content)}
                                </div>
                            </div>

                            {/* Article footer */}
                            <div className="px-8 md:px-10 py-6 border-t border-[#F3F4F6] bg-[#FAFAFA]">
                                <div className="flex items-center justify-between">
                                    <Link to="/">
                                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E2E7] hover:border-[#C7D2FE] text-[#6B7280] hover:text-[#4F46E5] font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to Home
                                        </button>
                                    </Link>
                                    <span className="text-xs text-[#9CA3AF] font-mono">
                                        {post.$id?.slice(0, 12)}...
                                    </span>
                                </div>
                            </div>
                        </article>

                        {/*  Sticky Sidebar */}
                        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">

                            {/* Post Info card */}
                            <div className="bg-white rounded-2xl border border-[#E2E2E7] shadow-[0_2px_20px_rgba(0,0,0,0.08)] overflow-hidden">
                                <div className="h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]" />
                                <div className="p-5">
                                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
                                        Post Info
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#6B7280]">Status</span>
                                            {post.status === "active" ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7280] bg-[#F3F4F6] border border-[#E2E2E7] px-2 py-0.5 rounded-full">
                                                    <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full" />
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        <div className="h-px bg-[#F3F4F6]" />
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#6B7280]">Published</span>
                                            <span className="text-xs font-semibold text-[#111111]">
                                                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <div className="h-px bg-[#F3F4F6]" />
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#6B7280]">Read time</span>
                                            <span className="text-xs font-semibold text-[#111111]">
                                                {getReadTime(post.content)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Author Actions card */}
                            {isAuthor && (
                                <div className="bg-white rounded-2xl border border-[#E2E2E7] shadow-[0_2px_20px_rgba(0,0,0,0.08)] overflow-hidden">
                                    <div className="h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]" />
                                    <div className="p-5">
                                        <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
                                            Author Actions
                                        </h3>
                                        <div className="space-y-2.5">
                                            <Link to={`/edit-post/${post.$id}`} className="block">
                                                <button className="w-full flex items-center gap-2.5 px-4 py-3 bg-[#111111] hover:bg-[#333333] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit Post
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => setShowDeleteModal(true)}
                                                className="w-full flex items-center gap-2.5 px-4 py-3 bg-white hover:bg-red-50 text-[#6B7280] hover:text-red-600 text-sm font-semibold rounded-xl border border-[#E2E2E7] hover:border-red-200 transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="bg-gradient-to-br from-[#EEF2FF] to-white rounded-2xl border border-[#C7D2FE] p-5">
                                <p className="text-sm font-bold text-[#4F46E5] mb-1">Explore More</p>
                                <p className="text-xs text-[#6B7280] mb-4">
                                    Discover more stories from our writers
                                </p>
                                <Link to="/all-posts">
                                    <button className="w-full py-2.5 text-sm font-bold text-[#4F46E5] bg-white border border-[#C7D2FE] hover:bg-[#EEF2FF] rounded-xl transition-all duration-200">
                                        All Posts →
                                    </button>
                                </Link>
                            </div>

                        </aside>
                    </div>
                </div>
            </Container>

            {/* ── Delete Confirmation Modal ── */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl border border-[#E2E2E7] shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-md w-full p-8">
                        <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#111111] text-center mb-2">
                            Delete this post?
                        </h3>
                        <p className="text-[#6B7280] text-sm text-center mb-8 leading-relaxed">
                            <span className="font-semibold text-[#111111]">"{post.title}"</span> will be
                            permanently removed. This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 bg-gray-400 hover:bg-gray-600 text-gray-800 font-semibold rounded-xl border border-gray-300 transition-all duration-200 text-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={deletePost}
                                disabled={isDeleting}
                                className="flex-1 py-3 bg-[#111111] hover:bg-red-600 text-white font-bold rounded-xl transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Post
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    ) : null;
}