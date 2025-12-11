import React from 'react';
import styled from 'styled-components';
import CourseCard from '../../components/student/CourseCard'; // Import the migrated component


// --- Mock Data ---
// In the future, you can fetch this from a 'courses' table in Supabase
const courses = [
  { title: 'C Course', description: 'Dive into the fundamentals of structured programming with C.', to: '/student/virtual-lab/c-course', color: '#007BFF' },
  { title: 'Python Course', description: 'Explore versatile scripting, data science, and automation.', to: '/student/virtual-lab/python-course', color: '#FFC107' },
  { title: 'Java Course', description: 'Master object-oriented programming for robust applications.', to: '/student/virtual-lab/java-course', color: '#28A745' },
];

// --- Styled Components ---
const LabWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  padding: 40px;
`;

// UPDATED: Changed color from #333 to white
const LabHeader = styled.h1`
  color: #ffffff; 
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const VirtualLabPage = () => {
  return (
    <LabWrapper>
      <LabHeader>Virtual Programming Lab</LabHeader>
      {/* UPDATED: Changed text color to light gray for readability */}
      <p style={{ color: '#cccccc' }}>Your gateway to interactive learning. Start your journey with a course or dive into projects.</p>
      
      <CourseGrid>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            description={course.description}
            to={course.to}
            color={course.color}
          />
        ))}
      </CourseGrid>
    </LabWrapper>
  );
};

export default VirtualLabPage;