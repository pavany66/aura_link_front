import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getNotifications, getAttendanceSummary } from '../../api/supabase';
import styled from 'styled-components';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import AttendanceSummary from '../../components/student/AttendanceSummary';
import AttendanceChart from '../../components/student/AttendanceChart';

const DashboardWrapper = styled.div` font-family: 'Inter', sans-serif; padding: 40px; `;
const DashboardGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; margin-top: 30px; `;
const Section = styled.div` background-color: #1e1e1e; padding: 25px; border-radius: 10px; `;
const SectionTitle = styled.h2` color: #ffffff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px; `;
const NotificationList = styled.ul` list-style-type: none; padding: 0; color: #ffffff; `;
const NotificationItem = styled.li` padding: 15px; border-bottom: 1px solid #333; color: #cccccc; strong { color: #ffffff; } &:last-child { border-bottom: none; } `;
const WelcomeHeader = styled.h1` color: #ffffff; `;

function StudentDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [attendance, setAttendance] = useState({ average: 0, entries: 0, chartData: [] });

  useEffect(() => {
    if (profile) {
      getNotifications().then(setNotifications);
      getAttendanceSummary(profile.id).then(setAttendance);
    }
  }, [profile]);

  // FIX: Navigate to Lobby to enter room number
  const handleJoinClass = () => {
    navigate('/student/live-classroom'); 
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <DashboardWrapper>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'}}>
        <WelcomeHeader>Welcome, {profile.full_name}!</WelcomeHeader>
        <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            startIcon={<VideocamIcon />}
            onClick={handleJoinClass}
            sx={{ fontWeight: 'bold', boxShadow: '0 0 15px #FF007F', backgroundColor: '#FF007F', '&:hover': { backgroundColor: '#c40062' } }}
        >
            Join Live Class
        </Button>
      </div>
      <DashboardGrid>
        <Section>
          <SectionTitle>📊 Attendance Overview</SectionTitle>
          <AttendanceSummary attendanceData={attendance} />
          <AttendanceChart attendanceData={attendance.chartData} />
        </Section>
        <Section>
          <SectionTitle>🔔 Notifications</SectionTitle>
          <NotificationList>
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <NotificationItem key={notif.id}><strong>{notif.title}</strong>: {notif.message}</NotificationItem>
              ))
            ) : (<p style={{ color: '#ccc' }}>No new notifications.</p>)}
          </NotificationList>
        </Section>
      </DashboardGrid>
    </DashboardWrapper>
  );
}

export default StudentDashboard;