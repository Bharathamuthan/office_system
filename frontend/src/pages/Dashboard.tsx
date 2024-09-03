import React from 'react';
import { Container, Grid, Button, Box, Divider, Typography } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

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
    <Container maxWidth={false} sx={{ mt: 5, height: '100vh' }}>
      <Grid container>
        {/* Sidebar */}
        <Grid item md={3} sx={{ backgroundColor: 'lightgray', height: '100vh', overflowY: 'auto' }}>
          <Box className='sidebar' p={2}>
            <Typography variant="h5" fontWeight="bold">PCS</Typography>
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

        {/* Main Content */}
        <Grid item md={9} sx={{ padding: 0 }}>
          <Box className='main-content' sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
