import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, to, color }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 180, // Ensure consistent height
        backgroundColor: color,
        color: '#000000ff',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-10px) scale(1.03)', // Lift and slightly scale on hover
          boxShadow: '0 12px 24px rgba(0, 242, 255, 1)', // Neon glow shadow
        },
      }}
    >
      <CardActionArea component={Link} to={to} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;