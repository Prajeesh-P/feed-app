# FeedApp | Modern Social Media Feed

A premium, glassmorphic social media feed application built with **React**, **Redux Toolkit**, and **Tailwind CSS v4**. This project features real-time interactions, smooth animations, and a polished user experience.

🚀 **[Live Demo](https://Prajeesh-P.github.io/feed-app/)**


## ✨ Features

- **🔐 Secure Authentication**: Simulated user registration and login with persistent session management using Redux, LocalStorage, and browser cookies.
- **📝 Dynamic Feed**: 
  - Create, edit, and delete posts.
  - Interactive Likes and real-time Comment counts.
  - Simulated data fetching from the JSONPlaceholder API.
- **🔍 Content Discovery**:
  - Global search to find posts by title or content.
  - Sidebar filters to toggle between the global feed and your own posts.
- **💎 Premium UI/UX**:
  - **Glassmorphism**: Sleek, transparent UI with backdrop blur effects.
  - **Animations**: Fluid entry and exit animations powered by `framer-motion`.
  - **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **⚡ Modern Tech Stack**: Built with the latest Tailwind CSS v4 and Vite for lightning-fast performance.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Form/Auth**: [js-cookie](https://github.com/js-cookie/js-cookie)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/Prajeesh-P/feed-app.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

## 📦 Project Structure

```text
src/
├── components/     # UI Components (Navbar, PostCard, Sidebar, etc.)
├── pages/          # Page Views (Feed, Login, Register)
├── store/          # Redux Slices & Store Configuration
├── types/          # TypeScript Interfaces
└── index.css       # Tailwind v4 Global Styles
```

## 🌐 Deployment

This project is configured for automated deployment to **GitHub Pages** via **GitHub Actions**. Every push to the `main` branch triggers a new build and deployment.

---

Built with ❤️ by Prajeesh
