import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const AttendanceSummary = ({ attendanceData }) => {
  const { average, entries } = attendanceData;
  return (
    <Card sx={{ textAlign: 'center', backgroundColor: '#1e1e1e' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>Overall Attendance</Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2, mb: 2 }}>
          <CircularProgress variant="determinate" value={100} size={150} thickness={2} sx={{ color: 'rgba(0, 255, 255, 0.1)' }}/>
          <CircularProgress variant="determinate" value={average} size={150} thickness={3} sx={{ color: 'primary.main', position: 'absolute', left: 0 }}/>
          <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" component="div" color="primary">{average}%</Typography>
          </Box>
        </Box>
        {/* UPDATED: Changed text color to white for visibility */}
        <Typography variant="body2" sx={{ color: '#ffffff' }}>Based on {entries} entries.</Typography>
      </CardContent>
    </Card>
  );
};

export default AttendanceSummary;