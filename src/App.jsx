import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Pages
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Diary from './pages/Diary'
import DiaryEditor from './pages/DiaryEditor'
import Missions from './pages/Missions'
import TeamMissions from './pages/TeamMissions'
import Quiz from './pages/Quiz'
import EcoPet from './pages/EcoPet'
import Leaderboard from './pages/Leaderboard'
import SchoolLeaderboard from './pages/SchoolLeaderboard'
import Feed from './pages/Feed'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Map from './pages/Map'
import Achievements from './pages/Achievements'
import EcoFacts from './pages/EcoFacts'

// Components
import ProtectedRoute from './components/ProtectedRoute'
import Chatbot from './components/Chatbot'

// Context
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Public but view-only routes */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/achievements" element={<Achievements />} />

          {/* Protected Routes - Require Login */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/new" element={<DiaryEditor />} />
            <Route path="/diary/:id" element={<DiaryEditor />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/missions/team" element={<TeamMissions />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/eco-pet" element={<EcoPet />} />
            <Route path="/leaderboard/school" element={<SchoolLeaderboard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/map" element={<Map />} />
            <Route path="/eco-facts" element={<EcoFacts />} />
          </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Chatbot />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

