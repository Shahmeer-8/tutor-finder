import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Tutors from "../pages/Tutors";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import MyProfile from "../pages/MyProfile";
import MySessions from "../pages/MySessions";
import Session from "../pages/Session";
import AuthPage from "../pages/auth/AuthPage";
import Layout from "../components/common/Layout";
import TermTutors from "@/pages/TermTutors";
import TermStudents from "@/pages/TermStudents";
import AllSessions from "@/pages/admin/AllSessions";
import AddTutor from "@/pages/admin/AddTutor";
import TutorsList from "@/pages/admin/TutorsList";
import TutorDashboard from "@/pages/tutor/TutorDashboard";
import TutorSessions from "@/pages/tutor/TutorSessions";
import TutorProfile from "@/pages/tutor/TutorProfile";
import TutorLayout from "@/components/common/tutor/TutorLayout";
import AdminLayout from "@/components/common/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showFooter showHeader>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/tutors"
          element={
            <Layout showFooter showHeader>
              <Tutors />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout showFooter showHeader>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout showFooter showHeader>
              <Blog />
            </Layout>
          }
        />

        <Route
          path="/my-profile"
          element={
            <Layout showFooter showHeader>
              <MyProfile />
            </Layout>
          }
        />
        <Route
          path="/tutors/:subject"
          element={
            <Layout showFooter showHeader>
              <Tutors />
            </Layout>
          }
        />
        <Route
          path="/session/:tutId"
          element={
            <Layout showFooter showHeader>
              <Session />
            </Layout>
          }
        />
        <Route
          path="/my-sessions"
          element={
            <Layout showFooter showHeader>
              <MySessions />
            </Layout>
          }
        />

        <Route
          path="/term-tutors"
          element={
            <Layout showFooter showHeader>
              <TermTutors />
            </Layout>
          }
        />

        <Route
          path="/term-students"
          element={
            <Layout showFooter showHeader>
              <TermStudents />
            </Layout>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage defaultMode="register" />} />
        <Route path="/login" element={<AuthPage defaultMode="login" />} />

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
          <Route path="/tutor-profile" element={<TutorProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
