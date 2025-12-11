import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAuth } from '../../context/AuthContext';

const RoomPage = () => {
  const { roomId } = useParams();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const userId = profile?.id || `user_${Date.now()}`;
  const userName = profile?.full_name || 'Guest Student';

  const myMeeting = async (element) => {
    // --- UPDATED: Read from .env file ---
    const appID = Number(process.env.REACT_APP_ZEGO_APP_ID); 
    const serverSecret = process.env.REACT_APP_ZEGO_SERVER_SECRET;
    // ------------------------------------

    if (!appID || !serverSecret) {
      console.error("Missing ZegoCloud keys in .env file");
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userId,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      showScreenSharingButton: true,
      showUserList: true,
      onLeaveRoom: () => {
        navigate(profile?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#121212' }}
    ></div>
  );
};

export default RoomPage;