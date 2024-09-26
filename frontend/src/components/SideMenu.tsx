import React from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  // Button Handlers
  const handleAdminClick = () => {
    navigate('admin');
  };

  const handleGroupsClick = () => {
    navigate('groups');
  };

  const handleLeaveRequestClick = () => {
    navigate('leave-request');
  };

  return (
    <Grid item md={3} sx={{ backgroundColor: 'lightgray', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box className='side' p={2} sx={{ flex: 1 }}>
        <Divider sx={{ my: 2 }} />
        <Button variant='contained' color='primary' fullWidth onClick={handleAdminClick}>
          Admin
        </Button>
        <Divider sx={{ my: 2 }} />
        <Button variant='contained' color='primary' fullWidth onClick={handleGroupsClick}>
          Groups
        </Button>
        <Divider sx={{ my: 2 }} />
        <Button variant='contained' color='primary' fullWidth onClick={handleLeaveRequestClick}>
          Leave Request
        </Button>
      </Box>
    </Grid>
  );
};

export default SideMenu;
