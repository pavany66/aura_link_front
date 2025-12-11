import React from 'react';
import styled from 'styled-components';

const LiveClassroomWrapper = styled.div`
  padding: 40px;
  color: #fff;
  background-color: #121212;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #87CEEB; /* Sky Blue */
  border-bottom: 2px solid #333;
  padding-bottom: 20px;
`;

function LiveClassroom() {
  return (
    <LiveClassroomWrapper>
      <Title>Live Classroom Management</Title>
      <p>This is where the live video conference interface or management tools will go.</p>
      {/* You will place your video conference component (e.g., Zoom SDK, WebRTC) here */}
    </LiveClassroomWrapper>
  );
}

export default LiveClassroom;