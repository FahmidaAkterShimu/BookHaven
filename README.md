# 📚 BookHaven - Online Book Borrowing Platform 

## 📌 Project Name

**BookHaven**

## 🎯 Purpose

BookHaven is a modern digital library platform designed to help users explore and discover books easily. The goal of this project is to provide a user-friendly and responsive platform where users can browse books, view details, authenticate securely, and enjoy a smooth digital reading experience.

## 🌐 Live URL

🔗 Live Site: https://book-haven-project.vercel.app

## ✨ Key Features

* 🔐 **Authentication System**

  * User registration and login with email/password
  * Google OAuth authentication
  * Secure authentication using Better Auth

* 📚 **Book Management & Browsing**

  * Browse available books
  * View book details
  * Explore books by categories
  * Responsive book card design

* 🎨 **Modern User Interface**

  * Fully responsive design for all devices
  * Light and dark theme support
  * Smooth animations and transitions
  * Interactive book slider

* 👤 **User Profile**

  * Display user information
  * Show user avatar
  * Personalized user experience

* ⚡ **Performance Optimization**

  * Built with Next.js App Router
  * Server-side rendering support
  * Optimized images using Next Image

## 🛠️ Technologies Used

* Next.js
* React.js
* Tailwind CSS
* MongoDB
* Better Auth

## 📦 NPM Packages Used

The project uses the following npm packages:

* `next` - React framework for building the application
* `react` - JavaScript library for building UI
* `react-dom` - React DOM rendering
* `better-auth` - Authentication solution
* `@better-auth/mongo-adapter` - MongoDB adapter for Better Auth
* `mongodb` - MongoDB database connection
* `@heroui/react` - UI components
* `lucide-react` - Icon library
* `swiper` - Responsive slider/carousel component
* `animate.css` - CSS animation library
* `react-toastify` - Toast notifications
* `next-themes` - Theme management

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/bookhaven.git
```

Navigate to the project folder:

```bash
cd bookhaven
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure environment variables:

```env
MONGO_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run the development server:

```bash
npm run dev
```

Open in your browser:

```
http://localhost:3000
```

## 📂 Project Structure

```
BookHaven/
│
├── app/
│   ├── (commonLayout)/
│   ├── api/
│   └── layout.jsx
│
├── public/
│   └── images/
│
├── lib/
│   ├── auth-client.js
│   └── auth.js
│
├── package.json
└── README.md
```
