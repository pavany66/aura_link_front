import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// --- Pages ---
import LandingPage from './components/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/Student/StudentDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import LiveClassroomPage from './pages/common/LiveClassroomPage'; // Import the restored page
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

      {/* --- Student Routes --- */}
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        
        {/* FIX: This makes the Sidebar link work (Default Room 123) */}
        <Route path="/student/live-classroom" element={<LiveClassroomPage />} />
        
        <Route path="/student/library" element={<LibraryPage />} />
        <Route path="/student/profile" element={<ProfilePage />} />
        <Route path="/student/virtual-lab" element={<VirtualLabPage />} />
        <Route path="/student/virtual-lab/:courseId" element={<CourseDetailsPage />} />
        <Route path="/student/virtual-lab/:courseId/module/:moduleId" element={<ModuleDetailsPage />} />
        <Route path="/student/doubts" element={<DoubtClarificationPage />} />
      </Route>

      {/* --- Admin Routes --- */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      
      {/* --- Shared Routes --- */}
      <Route element={<ProtectedRoute />}>
         {/* This handles direct links like /room/123 or buttons from Dashboard */}
         <Route path="/room/:roomId" element={<LiveClassroomPage />} />
         
         {/* Also support /live-classroom if Admin uses it */}
         <Route path="/live-classroom" element={<LiveClassroomPage />} />
      </Route>

      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;