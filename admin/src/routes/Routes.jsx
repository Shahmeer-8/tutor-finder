import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import AllSessions from "../pages/admin/AllSessions";
import AddTutor from "../pages/admin/AddTutor";
import TutorsList from "../pages/admin/TutorsList";
import AdminLayout from "../compontents/admin/AdminLayout";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import TutorSessions from "../pages/tutor/TutorSessions";
import TutorProfile from "../pages/tutor/TutorProfile";
import TutorLayout from "../compontents/tutor/TutorLayout";
import Login from "../pages/Auth/Login"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      {/* Admin Layout Wrapper & routes*/}
      <Route element={<AdminLayout />}>
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/all-sessions" element={<AllSessions />} />
        <Route path="/add-tutor" element={<AddTutor />} />
        <Route path="/tutors-list" element={<TutorsList />} />
      </Route>

        {/* Tutor Layout Wrapper & routes*/}
      <Route element={<TutorLayout />}>
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/tutor-sessions" element={<TutorSessions />} />
        <Route path="/tutor-profile" element={<TutorProfile/>} />
      </Route>

    </Routes>
  );
};

export default AppRoutes