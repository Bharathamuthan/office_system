import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth={false} sx={{ height: '100vh', padding: 0 }}>
      {/* Header */}
      <Box className="header">
        <Header />
      </Box>

      <Grid container>
        {/* Sidebar */}
        <Grid item md={3} className="side">
          <SideMenu />
        </Grid>

        {/* Main Content */}
        <Grid item md={9} sx={{ padding: 0, marginTop: '70px' }}>
          {/* Main Content Area */}
          <Box className="main-content" sx={{ height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
