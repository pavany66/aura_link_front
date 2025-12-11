import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentSidebar from '../components/sidebars/StudentSidebar';
import AdminSidebar from '../components/sidebars/AdminSidebar';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  background-color: #121212; /* Dark theme background */
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: calc(100% - 240px); /* Adjust 240px to match your sidebar width */
`;

const AppLayout = () => {
  const { profile } = useAuth();

  return (
    <AppWrapper>
      {/* Conditionally render the sidebar based on the user's role */}
      {profile?.role === 'student' && <StudentSidebar />}
      {profile?.role === 'admin' && <AdminSidebar />}

      <MainContent>
        {/* The Outlet component renders the specific page (e.g., Dashboard, Virtual Lab) */}
        <Outlet />
      </MainContent>
    </AppWrapper>
  );
};

export default AppLayout;