import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CoachDashboard from './coachDashboard/CoachDashboard.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import Login from './login/Login'
import UserDashboard from './userDashboard/UserDashboard.jsx'
import UserRegistration from './userPages/UserRegistration.jsx'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";

export default function DashBoard() {
  return (
    <div>

      <Routes>
        <Route path={"/*"} element={<Login />} />
        <Route path={"/admin/*"} element={<AdminDashboard />} />
        <Route path={"/trainer/:id/*"} element={<CoachDashboard />} />
        <Route path={"/client/:id/*"} element={<UserDashboard />} />
        <Route path={"/new user"} element={<UserRegistration />} />

      </Routes>

    </div>
  )
}
