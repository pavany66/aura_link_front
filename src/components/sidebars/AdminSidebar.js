import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// You can reuse or create different styles for the admin sidebar
const SidebarWrapper = styled.div`
  width: 240px;
  background-color: #1a1a1a;
  color: white;
  height: 100vh;
  padding: 20px 0;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #2ecc71;
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
      background-color: #333;
      color: white;
    }

    &.active {
      background-color: #2ecc71;
      color: #1a1a1a;
      font-weight: bold;
    }
  }
`;

const AdminSidebar = () => {
  return (
    <SidebarWrapper>
      <Title>Admin Portal</Title>
      <NavList>
        <NavItem>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </NavItem>
        {/* Add more links here for Manage Students, Class Schedule, etc. */}
      </NavList>
    </SidebarWrapper>
  );
};

export default AdminSidebar;