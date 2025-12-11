import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COURSE_DATA } from '../../data/courseData'; // Import shared data
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageWrapper = styled.div`
  padding: 40px;
  background-color: #121212;
  min-height: 100vh;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  color: ${props => props.color || '#fff'};
  margin-bottom: 20px;
`;

const VideoContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContentBox = styled.div`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  font-size: 1.1em;
  line-height: 1.6;
  color: #ddd;
`;

const ModuleDetailsPage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  
  const course = COURSE_DATA[courseId];
  // Retrieve module by index
  const module = course ? course.modules[moduleId] : null;

  if (!module) return <PageWrapper>Module not found</PageWrapper>;

  return (
    <PageWrapper>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ color: '#aaa', mb: 2 }}
      >
        Back to Course
      </Button>
      
      <Title color={course.accentColor}>{module.title}</Title>
      
      <ContentBox>
        <h3>Overview</h3>
        <p>{module.content}</p>
        <p>In this module, we will dive deep into the core concepts required to master this topic. Watch the demo video below to get started.</p>
      </ContentBox>

      <h2 style={{marginTop: '40px', color: course.accentColor}}>📺 Video Demo</h2>
      <VideoContainer>
        <iframe 
          src={module.videoUrl} 
          title="Module Demo Video" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen 
        />
      </VideoContainer>
    </PageWrapper>
  );
};

export default ModuleDetailsPage;