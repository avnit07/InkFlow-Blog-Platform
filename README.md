# 📝 InkFlow – Blog Platform

InkFlow is a modern, full-stack **blog platform** built with **React** and **Appwrite**, where users can write, publish, and manage blog posts with images and rich text content.  
The project focuses on clean architecture, real-world backend integration, and a polished UI.

---


## 🚀 Features

- 🔐 User Authentication (Signup / Login / Logout)
- ✍️ Create, Edit, and Delete Blog Posts
- 🖼️ Image Upload with Appwrite Storage
- 📝 Rich Text Editor for blog content
- 🔗 SEO-friendly unique slugs
- 👤 Author-based post access
- 📄 Public & private content handling
- 🎨 Clean and responsive UI with Tailwind CSS

---


## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Redux Toolkit
- React Hook Form
- Tailwind CSS

### Backend (BaaS)
- Appwrite
  - Authentication
  - Database
  - Storage

### Editor
- TinyMCE (Rich Text Editor)

---

## 🔐 Authentication Flow

- User authentication is handled by **Appwrite Auth**
- On app load:
  - The app checks for the current logged-in user
  - Redux state is updated accordingly
- Auth state controls:
  - Navigation visibility
  - Access to protected routes (Add/Edit posts)

  ---

## 📝 Post Creation Flow

1. User fills in:
   - Title
   - Content (Rich Text Editor)
   - Featured Image
   - Status (Active / Inactive)
2. Slug is auto-generated from the title
3. Image is uploaded to **Appwrite Storage**
4. Appwrite returns a `fileId`
5. `fileId` is stored in the database as `featuredImage`
6. Post document is created in Appwrite Database
7. User is redirected to the post page

---

## 🖼️ Image Handling

- Images are stored in **Appwrite Storage**
- Database stores **only the file ID**
- Images are displayed using Appwrite file preview/view APIs
- Storage permissions allow public image access

---

## 🧪 Installation & Setup

npm install

##  Create a .env file and add:
- VITE_APPWRITE_URL=your_appwrite_url
- VITE_APPWRITE_PROJECT_ID=your_project_id
- VITE_APPWRITE_DATABASE_ID=your_database_id
- VITE_APPWRITE_COLLECTION_ID=your_collection_id
- VITE_APPWRITE_BUCKET_ID=your_bucket_id

## Run the app
npm run dev



## Future Improvements

- Comments system
- Likes & bookmarks
- User profile pages
- Draft & publish workflow
- Dark mode
- Pagination / infinite scroll

