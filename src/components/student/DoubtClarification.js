import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const DoubtClarification = () => {
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const getAIResponse = async (input) => {
        setIsTyping(true);
        try {
            // --- This should be your working Make.com Webhook URL ---
            const makeWebhookUrl = 'https://hook.eu2.make.com/kij1q3fiexth8sib16eadupm61frssvs'; 
            
            const response = await fetch(makeWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }), 
            });

            if (!response.ok) {
                throw new Error('Network response from Make.com was not ok');
            }
            
            const aiReply = await response.text();
            return aiReply;

        } catch (error) {
            console.error("Error fetching from Make.com webhook:", error);
            return `Error: ${error.message}`;
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendMessage = async () => {
        const trimmedInput = chatInput.trim();
        if (trimmedInput === '' || isTyping) return;

        // 1. Add the user's message to the chat
        const userMessage = { sender: 'student', text: trimmedInput };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');
        
        // 2. Get the AI's response
        const aiResponse = await getAIResponse(trimmedInput);
        const aiMessage = { sender: 'ai', text: aiResponse };
        
        // 3. (FIXED) Add ONLY the AI's message to the chat
        setChatMessages(prev => [...prev, aiMessage]);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                    Ask Aura (AI Tutor)
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, height: 400, overflowY: 'auto', border: '1px solid #333', borderRadius: 2, p: 2 }}>
                    {chatMessages.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                            Ask me anything! e.g., "Explain recursion in a simple way"
                        </Typography>
                    )}
                    {chatMessages.map((msg, index) => (
                        <Box key={index} sx={{ alignSelf: msg.sender === 'student' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'student' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', p: 1.5, borderRadius: 2, maxWidth: '80%' }}>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                        </Box>
                    ))}
                    {isTyping && <Box sx={{ alignSelf: 'flex-start', p: 1.5 }}><CircularProgress size={24} /></Box>}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField fullWidth variant="outlined" placeholder="Ask a question..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => (e.key === 'Enter' ? handleSendMessage() : null)} size="small" disabled={isTyping} />
                    <Button variant="contained" color="primary" onClick={handleSendMessage} startIcon={<SendIcon />} disabled={isTyping || !chatInput.trim()}>Send</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DoubtClarification;

