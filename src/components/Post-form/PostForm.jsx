import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

    const submit = async (data) => {
        try {
            //  UPDATE POST
            if (post) {
                let featuredImageId = post.featuredImage;

                if (data.image?.[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        await appwriteService.deleteFile(post.featuredImage);
                        featuredImageId = file.$id;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage: featuredImageId,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }

            //  CREATE POST
            else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file) return;

                const dbPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Post submit failed:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {post ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-gray-600">
                    {post ? "Update your post details below" : "Fill in the details to publish your story"}
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
                        </div>

                        <div className="space-y-5">
                            <Input
                                label="Title"
                                placeholder="Enter your post title..."
                                {...register("title", { required: true })}
                            />

                            <div>
                                <Input
                                    label="Slug"
                                    placeholder="auto-generated-from-title"
                                    {...register("slug", { required: true })}
                                    onInput={(e) =>
                                        setValue("slug", slugTransform(e.currentTarget.value), {
                                            shouldValidate: true,
                                        })
                                    }
                                />
                                <p className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>URL-friendly version of your title (auto-generated)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Editor Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Content</h2>
                        </div>

                        <RTE
                            label="Write your story"
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        />
                    </div>
                </div>

                {/* Sidebar - Right Side */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Featured Image Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Featured Image</h2>
                        </div>

                        {/* Image Preview - Only show if there's actually an image */}
                        {(imagePreview || post?.featuredImage) && (
                            <div className="mb-4 relative group">
                                <img
                                    src={imagePreview || appwriteService.getFilePreview(post.featuredImage)}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-xl"></div>
                            </div>
                        )}

                        {/* Upload Area */}
                        <div className="relative">
                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                                onChange={(e) => {
                                    register("image").onChange(e);
                                    handleImageChange(e);
                                }}
                            />
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-12 h-12 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-2 text-sm font-semibold text-gray-600 group-hover:text-blue-600">
                                        Click to upload image
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </label>
                        </div>

                        {/* Status Select */}
                        <div className="mt-6">
                            <Select
                                options={["active", "inactive"]}
                                label="Post Status"
                                {...register("status", { required: true })}
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                {watch("status") === "active" ? "✅ Visible to readers" : "🔒 Hidden from readers"}
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 space-y-3">
                            <Button
                                type="submit"
                                className="w-full py-3.5 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                {post ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Update Post</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>Publish Post</span>
                                    </span>
                                )}
                            </Button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}