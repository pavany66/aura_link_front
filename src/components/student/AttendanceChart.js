import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceChart = ({ attendanceData }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Attendance Overview
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={attendanceData}>
            <XAxis dataKey="name" stroke="#00FFFF" />
            <YAxis stroke="#00FFFF" />
            <Tooltip />
            <Bar dataKey="attendance" fill="#00FFFF" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;