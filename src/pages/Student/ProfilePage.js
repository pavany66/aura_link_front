import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './DetailedStudentProfile.css';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  padding: 40px;
`;

function ProfilePage() {
  const { profile, user } = useAuth();
  if (!profile || !user) return <div>Loading profile...</div>;

  return (
    <ProfileWrapper>
      <div className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-card user-info">
          <h2>Personal Information</h2>
          <div className="info-item">
            <span>Name:</span>
            <span>{profile.full_name}</span>
          </div>
          <div className="info-item">
            <span>Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="profile-card academic-info">
          <h2>Academic Details</h2>
          <div className="info-item">
            <span>Student ID:</span>
            <span>{profile.student_id}</span>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}

export default ProfilePage;