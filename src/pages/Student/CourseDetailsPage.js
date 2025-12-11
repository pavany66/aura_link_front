import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CodeEditor from '../../components/student/CodeEditor';
import { COURSE_DATA } from '../../data/courseData'; // Updated Import
import { Button } from '@mui/material';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import CodeIcon from '@mui/icons-material/Code';

// --- Styled Components ---
const CourseWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  padding: 40px;
  background-color: #121212; 
  min-height: 100vh;
  color: #e0e0e0;
`;

const CourseHeader = styled.h1`
  color: ${props => props.color || '#00FFFF'}; 
  border-bottom: 2px solid #333;
  padding-bottom: 20px;
  margin-bottom: 10px;
`;

const CourseDescription = styled.p`
  font-size: 1.1em;
  margin-bottom: 40px;
  color: #ccc;
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

const SectionTitle = styled.h2`
  color: ${props => props.color || '#00FFFF'};
  border-left: 4px solid #FF007F; 
  padding-left: 10px;
  margin-top: 0;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;
`;

const OutcomeList = styled.ul`
  padding-left: 20px;
`;

const ProjectList = styled.ul`
  padding-left: 20px;
`;

// New Styled Component for Module Buttons
const ModuleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #2a2a2a;
  border: 1px solid #333;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #333;
    transform: translateX(5px);
    border-color: ${props => props.accent || '#fff'};
  }
`;

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null); // Reference for scrolling
  
  const course = COURSE_DATA[courseId];

  // Logic to pick the correct language for the editor
  const languageMap = {
    'c-course': 'c',
    'python-course': 'python',
    'java-course': 'java',
  };
  const editorLanguage = languageMap[courseId] || 'python';

  if (!course) {
    return (
      <CourseWrapper>
        <CourseHeader color="#e74c3c">404: Course Not Found</CourseHeader>
        <CourseDescription>The course with ID "{courseId}" does not exist.</CourseDescription>
      </CourseWrapper>
    );
  }

  const handleScrollToLab = () => {
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CourseWrapper>
      <CourseHeader color={course.accentColor}>{course.title}</CourseHeader>
      <CourseDescription>{course.description}</CourseDescription>

      <SectionContainer>
        <MainContent>
          <SectionTitle color={course.accentColor}>Course Modules</SectionTitle>
          <div>
            {course.modules.map((mod, index) => (
              <ModuleButton 
                key={index} 
                accent={course.accentColor}
                onClick={() => navigate(`/student/virtual-lab/${courseId}/module/${index}`)}
              >
                <div style={{fontWeight: 'bold', color: '#fff'}}>{mod.title}</div>
                <PlayLessonIcon sx={{ color: course.accentColor }} />
              </ModuleButton>
            ))}
          </div>

          {/* Virtual Lab Section */}
          <br /><br />
          <div ref={editorRef}> {/* Scroll Target */}
            <SectionTitle color={course.accentColor}>🔬 Virtual Lab Playground</SectionTitle>
            <p style={{color: '#ccc', marginBottom: '15px'}}>
              Test your knowledge! Write and run real {course.title} code directly here.
            </p>
            <CodeEditor defaultLanguage={editorLanguage} />
          </div>

        </MainContent>

        <Sidebar>
          {/* --- NEW: Start Practicing Button --- */}
          <Card style={{textAlign: 'center'}}>
             <h3 style={{marginTop: 0, color: '#fff'}}>Ready to Code?</h3>
             <Button 
                variant="contained" 
                size="large"
                startIcon={<CodeIcon />}
                onClick={handleScrollToLab}
                sx={{
                    width: '100%',
                    backgroundColor: course.accentColor,
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#fff' }
                }}
             >
                Start Practicing
             </Button>
          </Card>

          <Card>
            <SectionTitle color={course.accentColor} style={{ borderLeftColor: course.accentColor }}>Learning Outcomes</SectionTitle>
            <OutcomeList>
              {course.outcomes.map((outcome, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{outcome}</li>
              ))}
            </OutcomeList>
          </Card>

          <Card>
            <SectionTitle color={course.accentColor} style={{ borderLeftColor: course.accentColor }}>Recommended Projects</SectionTitle>
            <ProjectList>
              {course.projects.map((project, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{project}</li>
              ))}
            </ProjectList>
          </Card>
        </Sidebar>
      </SectionContainer>
    </CourseWrapper>
  );
};

export default CourseDetailsPage;