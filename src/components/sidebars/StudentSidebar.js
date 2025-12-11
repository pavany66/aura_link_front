import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  width: 240px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  padding: 20px 0;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #3498db;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  a {
    display: block;
    padding: 15px 25px;
    color: #bdc3c7;
    text-decoration: none;
    font-size: 1.1em;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #34495e;
      color: white;
    }

    &.active {
      background-color: #3498db;
      color: white;
      font-weight: bold;
    }
  }
`;

const StudentSidebar = () => {
  return (
    <SidebarWrapper>
      <Title>Aura-Link</Title>
      <NavList>
        <NavItem>
          <NavLink to="/student/dashboard">Dashboard</NavLink>
        </NavItem>
         <NavItem>
          <NavLink to="/student/live-classroom">🔴 Live Class</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/student/virtual-lab">Virtual Lab</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/student/library">Library</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/student/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/student/doubts">AI Help</NavLink>
        </NavItem>
        {/* Add more links here */}
      </NavList>
    </SidebarWrapper>
  );
};


export default StudentSidebar;