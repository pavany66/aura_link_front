import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CodeEditor = ({ defaultLanguage = "python", defaultValue = "" }) => {
  const [code, setCode] = useState(defaultValue || "// Write your code here...");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const handleRunCode = async () => {
    setIsLoading(true);
    setOutput(""); 
    try {
      // FIX: Use the Environment Variable instead of hardcoded 'localhost'
      // This automatically finds the correct server (Render or Local)
      const backendUrl = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:8000';
      
      const response = await fetch(`${backendUrl}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: code, language: defaultLanguage }),
      });

      const data = await response.json();
      
      // Handle server-side errors (like compilation failures) gracefully
      if (response.status !== 200) {
          setOutput(data.error || data.output || "Code execution failed.");
      } else {
          setOutput(data.output);
      }

    } catch (error) {
      console.error("Execution Error:", error);
      setOutput("Error connecting to server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
};

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: '#1e1e1e', color: 'white', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#00FFFF' }}>
          💻 Live Code Editor ({defaultLanguage.toUpperCase()})
        </Typography>
        <Button 
          variant="contained" 
          color="success" 
          startIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <PlayArrowIcon />}
          onClick={handleRunCode}
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Code"}
        </Button>
      </Box>

      <Box sx={{ border: '1px solid #333', borderRadius: 1, overflow: 'hidden' }}>
        <Editor
          height="400px"
          defaultLanguage={defaultLanguage}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </Box>

      <Box sx={{ mt: 2, p: 2, bgcolor: '#000', borderRadius: 1, minHeight: '100px', fontFamily: 'monospace' }}>
        <Typography variant="subtitle2" color="gray">Output:</Typography>
        <pre style={{ color: '#00ff00', margin: 0, whiteSpace: 'pre-wrap' }}>
          {output || "Waiting for output..."}
        </pre>
      </Box>
    </Paper>
  );
};

export default CodeEditor;
