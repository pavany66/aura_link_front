import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAuth } from '../../context/AuthContext';

const LiveClassroomPage = () => {
  const { roomId } = useParams();
  const { profile } = useAuth();
  const navigate = useNavigate();

  // 1. Determine Room ID:
  // If URL has an ID (e.g. /room/math101), use it.
  // If not (e.g. /student/live-classroom), default to '123'.
  const activeRoomId = roomId || '123';

  // 2. User Info (Fallback to random if profile isn't loaded)
  const userId = profile?.id || `user_${Date.now()}`;
  const userName = profile?.full_name || 'Guest User';

  const myMeeting = async (element) => {
    // Read keys from .env
    const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
    const serverSecret = process.env.REACT_APP_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      console.error("Missing ZegoCloud keys in .env file");
      alert("System Error: Video keys missing. Please check .env file.");
      return;
    }

    // Generate Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      activeRoomId,
      userId,
      userName
    );

    // Initialize ZegoCloud
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Join the Room
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // Best for classrooms
      },
      showScreenSharingButton: true,
      showUserList: true,
      sharedLinks: [
        {
          name: 'Class Link',
          url: window.location.origin + '/room/' + activeRoomId,
        },
      ],
      onLeaveRoom: () => {
        // Redirect based on role
        if (profile?.role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/student/dashboard');
        }
      },
    });
  };

  return (
    <div
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#121212' }}
    />
  );
};

export default LiveClassroomPage;