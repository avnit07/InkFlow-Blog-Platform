import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    // ✅ Set image preview for existing post
    useEffect(() => {
        if (post?.featuredImage) {
            setImagePreview(appwriteService.getFilePreview(post.featuredImage));
        }
    }, [post]);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (post) {
                // ── Edit existing post ──────────────────────────
                let featuredImageId = post.featuredImage;
                if (data.image?.[0]) {
                    const file = await toast.promise(
                        appwriteService.uploadFile(data.image[0]),
                        { loading: "Uploading image...", success: "Image uploaded!", error: "Upload failed" }
                    );
                    if (file) {
                        await appwriteService.deleteFile(post.featuredImage);
                        featuredImageId = file.$id;
                    }
                }
                const dbPost = await toast.promise(
                    appwriteService.updatePost(post.$id, {
                        title: data.title,
                        content: data.content,
                        status: data.status,
                        featuredImage: featuredImageId,
                    }),
                    { loading: "Saving changes...", success: "Post updated!", error: "Update failed" }
                );
                // ✅ Use post.$id (slug) for navigation
                if (dbPost) setTimeout(() => navigate(`/post/${post.$id}`), 1500);

            } else {
                // ── Create new post ─────────────────────────────
                let uploadedFileId = null;
                const file = await toast.promise(
                    appwriteService.uploadFile(data.image[0]),
                    { loading: "Uploading image...", success: "Image ready!", error: "Upload failed" }
                );
                if (!file) return;
                uploadedFileId = file.$id;

                try {
                    const dbPost = await toast.promise(
                        appwriteService.createPost({
                            title: data.title,
                            slug: data.slug,
                            content: data.content,
                            status: data.status,
                            featuredImage: file.$id,
                            userId: userData.$id,
                        }),
                        { loading: "Publishing post...", success: "Post published!", error: "Publish failed" }
                    );
                    // ✅ Navigate using slug (which is the document ID)
                    if (dbPost) setTimeout(() => navigate(`/post/${data.slug}`), 1500);
                } catch (err) {
                    if (uploadedFileId) await appwriteService.deleteFile(uploadedFileId);
                    throw err;
                }
            }
        } catch (error) {
            console.error("Submit failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✅ Fixed slug transform — max 36 chars, Appwrite-safe
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            const base = value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")   // only lowercase alphanumeric
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
                .slice(0, 28);                  // max 28 chars + 7 suffix = 35 total
            const suffix = Date.now().toString().slice(-6);
            return `${base}-${suffix}`;
        }
        return "";
    }, []);

    useEffect(() => {
        const sub = watch((value, { name }) => {
            if (name === "title")
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
        });
        return () => sub.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const currentStatus = watch("status");

    const inputCls = `
        w-full px-4 py-3 rounded-xl outline-none transition-all duration-200
        bg-[#FAFAFA] text-[#111111] placeholder:text-[#9CA3AF]
        border border-[#E2E2E7]
        focus:bg-white focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15
        hover:border-[#C7D2FE]
        text-sm font-medium
    `;

    const cardCls = `
        bg-white rounded-2xl border border-[#E2E2E7]
        shadow-[0_2px_20px_rgba(0,0,0,0.08)]
        overflow-hidden
    `;

    return (
        <div className="min-h-screen bg-[#F5F5F7]">

            {/* ── Top accent bar ── */}
            <div className="h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* ── Page Header ── */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#6B7280] text-sm">Dashboard</span>
                            <svg className="w-3.5 h-3.5 text-[#D1D5DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] px-2.5 py-1 rounded-full">
                                {post ? "Edit Post" : "New Post"}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-[#111111] tracking-tight">
                            {post ? "Edit Post" : "Create New Post"}
                        </h1>
                        <p className="text-[#6B7280] mt-1.5 text-sm">
                            {post ? "Update your post details below" : "Fill in the details to publish your story"}
                        </p>
                    </div>

                    {/* ✅ Status pill */}
                    <div className="hidden md:flex items-center gap-2 bg-white border border-[#E2E2E7] shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-4 py-2.5 rounded-full mt-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-[#111111] text-xs font-semibold">
                            {post ? "Editing post" : "Ready to publish"}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* ── Left: Main Content ── */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* ── Post Details Card ── */}
                        <div className={cardCls}>
                            <div className="h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]" />
                            <div className="px-6 py-5 border-b border-[#F3F4F6] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-[#111111]">Post Details</h2>
                                        <p className="text-xs text-[#6B7280] mt-0.5">Title and URL slug</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1 rounded-full">
                                    Step 1
                                </span>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#111111] mb-1.5">
                                        Post Title
                                        <span className="text-[#EC4899] ml-1">*</span>
                                    </label>
                                    <input
                                        placeholder="What's your story about?"
                                        {...register("title", { required: true })}
                                        className={`${inputCls} text-base py-3.5`}
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#111111] mb-1.5">
                                        URL Slug
                                        <span className="text-[#EC4899] ml-1">*</span>
                                    </label>
                                    <div className="flex items-stretch bg-[#FAFAFA] border border-[#E2E2E7] rounded-xl overflow-hidden
                                                    focus-within:bg-white focus-within:border-[#6366F1] focus-within:ring-4 focus-within:ring-[#6366F1]/15
                                                    hover:border-[#C7D2FE] transition-all duration-200">
                                        <span className="px-3.5 py-3 text-[#6B7280] text-xs font-mono bg-[#F3F4F6] border-r border-[#E2E2E7] flex items-center select-none whitespace-nowrap">
                                            /post/
                                        </span>
                                        <input
                                            placeholder="auto-generated-from-title"
                                            {...register("slug", { required: true })}
                                            // ✅ slug is read-only on edit — don't allow changes
                                            readOnly={!!post}
                                            className={`flex-1 px-4 py-3 font-mono text-sm outline-none placeholder:text-[#D1D5DB]
                                                ${post
                                                    ? "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                                                    : "bg-transparent text-[#6B7280]"
                                                }`}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-[#6B7280] flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-[#6366F1] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        {post
                                            ? "Slug cannot be changed after publishing"
                                            : "Auto-generated from title — used as your post URL"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Content Card ── */}
                        <div className={cardCls}>
                            <div className="h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]" />
                            <div className="px-6 py-5 border-b border-[#F3F4F6] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-[#111111]">Content</h2>
                                        <p className="text-xs text-[#6B7280] mt-0.5">Write your story</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1 rounded-full">
                                    Step 2
                                </span>
                            </div>
                            <div className="p-6">
                                <RTE label="" name="content" control={control} defaultValue={getValues("content")} />
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Sidebar ── */}
                    <div className="lg:col-span-1">
                        <div className={`${cardCls} sticky top-6`}>
                            <div className="h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]" />

                            <div className="px-6 py-5 border-b border-[#F3F4F6] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-[#111111]">Publish Settings</h2>
                                        <p className="text-xs text-[#6B7280] mt-0.5">Image & visibility</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1 rounded-full">
                                    Step 3
                                </span>
                            </div>

                            <div className="p-6 space-y-5">

                                {/* Featured Image */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#111111] mb-2">
                                        Featured Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image-upload"
                                        className="hidden"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        {...register("image", { required: !post })}
                                        onChange={(e) => { register("image").onChange(e); handleImageChange(e); }}
                                    />

                                    {imagePreview ? (
                                        <div className="relative group rounded-xl overflow-hidden ring-2 ring-[#E2E2E7] hover:ring-[#6366F1] transition-all duration-200">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover object-center"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-200 cursor-pointer"
                                            >
                                                <span className="opacity-0 group-hover:opacity-100 bg-white text-[#111111] text-sm font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                                                    </svg>
                                                    Change Image
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#E2E2E7] rounded-xl cursor-pointer hover:border-[#6366F1] hover:bg-[#EEF2FF]/30 transition-all duration-200 group bg-[#FAFAFA]"
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-11 h-11 bg-white rounded-xl border border-[#E2E2E7] shadow-sm flex items-center justify-center group-hover:border-[#C7D2FE] group-hover:bg-[#EEF2FF] transition-all duration-200">
                                                    <svg className="w-5 h-5 text-[#6B7280] group-hover:text-[#6366F1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-semibold text-[#6B7280] group-hover:text-[#4F46E5] transition-colors">
                                                        Click to upload
                                                    </p>
                                                    <p className="text-xs text-[#9CA3AF] mt-1">PNG, JPG, GIF · Max 10MB</p>
                                                </div>
                                            </div>
                                        </label>
                                    )}
                                </div>

                                <div className="h-px bg-[#F3F4F6]" />

                                {/* Visibility */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#111111] mb-2">
                                        Visibility
                                    </label>
                                    <select
                                        {...register("status", { required: true })}
                                        className="w-full px-4 py-3 bg-[#FAFAFA] text-[#111111] border border-[#E2E2E7] rounded-xl outline-none
                                                   focus:bg-white focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15
                                                   hover:border-[#C7D2FE] transition-all duration-200 font-medium text-sm cursor-pointer"
                                    >
                                        <option value="active">Public — Visible to everyone</option>
                                        <option value="inactive">Draft — Only visible to you</option>
                                    </select>
                                    <div className="mt-3">
                                        {currentStatus === "active" ? (
                                            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
                                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                                                <span className="text-xs font-semibold text-emerald-700">
                                                    Will appear on the homepage
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2.5 bg-[#F9FAFB] border border-[#E2E2E7] rounded-xl px-3.5 py-2.5">
                                                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full shrink-0" />
                                                <span className="text-xs font-semibold text-[#6B7280]">
                                                    Saved as private draft
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="h-px bg-[#F3F4F6]" />

                                {/* ✅ Action Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 text-sm font-bold bg-[#111111] hover:bg-[#333333] text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                {post ? "Saving..." : "Publishing..."}
                                            </span>
                                        ) : post ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Save Changes
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Publish Post
                                            </span>
                                        )}
                                    </Button>

                                    {/* ✅ Cancel button */}
                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => navigate(-1)}
                                        className="w-full py-3 px-4 bg-white hover:bg-[#F5F5F7] text-[#6B7280] hover:text-[#111111] font-semibold rounded-xl border border-[#E2E2E7] hover:border-[#C7D2FE] transition-all duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}