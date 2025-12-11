import React from 'react';
import styled from 'styled-components';
import DoubtClarification from '../../components/student/DoubtClarification';

const PageWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  padding: 40px;
`;

// UPDATED: Changed color from #333 to white
const PageHeader = styled.h1`
  color: #ffffff; 
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
`;

const DoubtClarificationPage = () => {
    return (
        <PageWrapper>
            <PageHeader>🤖 AI Doubt Clarification</PageHeader>
            {/* UPDATED: Changed paragraph color to light gray */}
            <p style={{ color: '#cccccc' }}>Have a question about a lecture? Ask our AI assistant for an instant answer.</p>
            <DoubtClarification />
        </PageWrapper>
    )
}

export default DoubtClarificationPage;