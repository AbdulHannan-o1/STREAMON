import React from 'react'
import { Route, Routes } from 'react-router'
import toast, { Toaster } from "react-hot-toast"

import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
const App = () => {
  return (
    <div className='h-screen text-white' data-theme='night'>
      <button onClick={()=> toast.success("helloWord!")}>create a taost</button>
      <Routes>
        <Route path='/' element={< HomePage />} />
        <Route path='/signup' element={< SignUpPage />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/onboarding' element={< OnboardingPage />} />
        <Route path='/call' element={< CallPage />} />
        <Route path='/chat' element={< ChatPage/>} />
        <Route path='/notification' element={< NotificationPage />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
