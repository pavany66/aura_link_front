import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardWrapper = styled.div` font-family: 'Inter', sans-serif; padding: 40px; background-color: #121212; min-height: 100vh; `;
const Header = styled.div` display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; padding-bottom: 20px; `;
const WelcomeMessage = styled.h1` color: #87CEEB; `;
const LogoutButton = styled.button` padding: 10px 20px; border-radius: 8px; border: none; background-color: #e74c3c; color: white; font-size: 1em; font-weight: bold; cursor: pointer; transition: background-color 0.3s; &:hover { background-color: #c0392b; } `;
const ContentArea = styled.div` margin-top: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; `;
const Section = styled.div` background-color: #1e1e1e; padding: 25px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); `;
const SectionTitle = styled.h2` color: #87CEEB; margin-top: 0; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 20px; `;
const SectionParagraph = styled.p` color: #BBBBBB; margin-bottom: 20px; `;
const Form = styled.form` display: flex; flex-direction: column; `;
const Input = styled.input` padding: 12px; border: 1px solid #555; border-radius: 6px; margin-bottom: 15px; font-size: 1em; background-color: #2a2a2a; color: #eeeeee; &::placeholder { color: #999; } `;
const TextArea = styled.textarea` padding: 12px; border: 1px solid #555; border-radius: 6px; margin-bottom: 15px; font-size: 1em; min-height: 100px; resize: vertical; background-color: #2a2a2a; color: #eeeeee; &::placeholder { color: #999; } `;
const SubmitButton = styled.button` padding: 12px 20px; border-radius: 8px; border: none; background-color: #2ecc71; color: white; font-size: 1em; font-weight: bold; cursor: pointer; transition: background-color 0.3s; &:hover { background-color: #27ae60; } &:disabled { background-color: #95a5a6; cursor: not-allowed; } `;
const LiveClassButton = styled(SubmitButton)` background-color: #3498db; &:hover { background-color: #2980b9; } `;

function AdminDashboard() {
    const { profile, user } = useAuth();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // FIX: Navigate to Lobby to start a class manually
    const handleStartLiveClass = () => {
        navigate('/live-classroom');
    };

    const handleSendNotification = async (e) => {
        e.preventDefault();
        if (!title || !message) return alert("Please fill in both title and message.");
        const { error } = await supabase.from('notifications').insert([{ title, message, sent_by: user.id }]);
        if (error) { alert('Error: ' + error.message); } else { alert('Notification sent!'); setTitle(''); setMessage(''); }
    };

    const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
    const handleDocumentSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert('Please select a file first.');
        setIsUploading(true);
        const filePath = `public/${Date.now()}_${selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, selectedFile);
        if (uploadError) { setIsUploading(false); return alert('Error uploading: ' + uploadError.message); }
        const { error: dbError } = await supabase.from('documents').insert([{ file_name: selectedFile.name, file_path: filePath, uploaded_by: user.id }]);
        if (dbError) { setIsUploading(false); return alert('Error saving metadata: ' + dbError.message); }
        alert('File shared!');
        setSelectedFile(null);
        fileInputRef.current.value = "";
        setIsUploading(false);
    };

    const handleLogout = async () => { await supabase.auth.signOut(); navigate('/'); };

    if (!profile) return <div>Loading Admin Portal...</div>;

    return (
        <DashboardWrapper>
            <Header>
                <WelcomeMessage>Admin Portal ({profile.full_name})</WelcomeMessage>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </Header>
            <ContentArea>
                <Section>
                    <SectionTitle>📣 Send Notification</SectionTitle>
                    <Form onSubmit={handleSendNotification}>
                        <Input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <TextArea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
                        <SubmitButton type="submit">Send</SubmitButton>
                    </Form>
                </Section>
                <Section>
                    <SectionTitle>📄 Share Document</SectionTitle>
                    <Form onSubmit={handleDocumentSubmit}>
                        <Input type="file" onChange={handleFileChange} ref={fileInputRef} />
                        <SubmitButton type="submit" disabled={isUploading}>{isUploading ? '...' : 'Upload'}</SubmitButton>
                    </Form>
                </Section>
                <Section>
                    <SectionTitle>🎥 Live Class Control</SectionTitle>
                    <SectionParagraph>Manually enter a room ID to start a session.</SectionParagraph>
                    <LiveClassButton onClick={handleStartLiveClass}>🟢 Start Live Class (Lobby)</LiveClassButton>
                </Section>
            </ContentArea>
        </DashboardWrapper>
    );
}

export default AdminDashboard;