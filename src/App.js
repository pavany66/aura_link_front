import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// --- Import all your pages ---
import LandingPage from './components/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/Student/StudentDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoomPage from './pages/common/Room.jsx';
import LibraryPage from './pages/Student/LibraryPage';
import ProfilePage from './pages/Student/ProfilePage';
import VirtualLabPage from './pages/Student/VirtualLabPage';
import DoubtClarificationPage from './pages/Student/DoubtClarificationPage';
import CourseDetailsPage from './pages/Student/CourseDetailsPage';
import ModuleDetailsPage from './pages/Student/ModuleDetailsPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* --- Student Protected Routes --- */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        {/* Removed LobbyPage, pointing live classroom directly to the Room logic if needed, 
            but usually dynamic ID is better. For now, we rely on the dynamic route below. */}
        <Route path="/student/library" element={<LibraryPage />} />
        <Route path="/student/profile" element={<ProfilePage />} />
        <Route path="/student/virtual-lab" element={<VirtualLabPage />} />
        
        {/* Course & Module Routes */}
        <Route path="/student/virtual-lab/:courseId" element={<CourseDetailsPage />} />
        <Route path="/student/virtual-lab/:courseId/module/:moduleId" element={<ModuleDetailsPage />} />
        
        <Route path="/student/doubts" element={<DoubtClarificationPage />} />
      </Route>

      {/* --- Admin Protected Routes --- */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      
      {/* --- Generic Protected Routes --- */}
      <Route element={<ProtectedRoute />}>
         {/* The room route handles the video call. 
             roomId can be '123' or anything generated. */}
         <Route path="/room/:roomId" element={<RoomPage />} />
      </Route>

      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;