
# ✍️ InkFlow — Full-Stack Blogging Platform

**Production-ready blogging platform built with React 19, Appwrite & Vite**

🔗 [Live Demo](https://ink-flow-blog-platform.vercel.app)  
💻 [Source Code](https://github.com/avnit07/InkFlow-Blog-Platform)

---

## 🚀 Overview

**InkFlow** is a scalable full-stack blogging platform that enables authenticated users to create, manage, and publish rich-text articles with media support.

The application is built using a modern React architecture with protected routing, centralized state management, and a backend powered by **Appwrite (Auth + Database + Storage)**.

It demonstrates real-world engineering concepts such as:

- Authentication & Authorization
- Secure route protection
- Full CRUD operations
- File upload & cloud storage handling
- Optimized UI with loading states
- Modular and scalable architecture
- Production-ready deployment workflow

---



## ✨ Key Features

### 🔐 Authentication & Access Control
- Email/password authentication using Appwrite
- Protected routes with access control
- Persistent login sessions
- Author-only editing permissions

### 📝 Rich Blog Management
- Create, edit, and delete blog posts
- TinyMCE-powered rich text editor
- Slug-based dynamic routing (`/post/:slug`)
- Structured content rendering

### 🖼️ Media Handling
- Featured image upload (up to 10MB)
- Appwrite Storage integration
- Optimized image preview display

### 📊 Enhanced User Experience
- Reading progress indicator
- Automatic read-time estimation
- Skeleton loading placeholders
- Toast notifications for real-time feedback
- Scroll restoration on route change
- Custom 404 Not Found page

### 📱 Fully Responsive
- Mobile-first design
- Optimized for desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

React 19, Vite, Tailwind CSS, Redux Toolkit, React Router DOM,  
Appwrite (Auth + Database + Storage), TinyMCE, React Hook Form, Vercel.
---

## 🧠 Technical Highlights

- Designed a modular Appwrite service layer (authentication + database abstraction)
- Centralized authentication state using Redux Toolkit
- Built reusable UI component system (Button, Input, Layout, Auth Guard)
- Implemented secure client-side route protection
- Configured environment-based deployment on Vercel
- Implemented SPA routing rewrites for direct URL access
- Structured project using scalable folder architecture

---
## ⚙️ Local Setup

###  Clone Repository

```bash
git clone https://github.com/avnit07/InkFlow-Blog-Platform.git
cd InkFlow-Blog-Platform

## Install Dependencies
npm install
## Configure Environment Variables

Create a .env file in the root directory:

VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=

## Start Development Server
npm run dev

Open: http://localhost:5173

🌍 Deployment

The project is deployed on Vercel with environment-based configuration and SPA routing support.

👨‍💻 Author

Avnit
GitHub: https://github.com/avnit07


⭐ If you found this project helpful, consider giving it a star!


