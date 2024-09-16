import React, { useState } from 'react';
import GroupList from '../components/GroupList'; 
import GroupWindow from '../components/GroupWindow';
import { Container, Grid, Paper, Typography } from '@mui/material';
import '../styles/Group.css';

interface Group {
  id: number;
  name: string;
  lastMessage: string;
  unreadCount: number;
}

interface Message {
  text: string;
  isSent: boolean;
}

const GroupPage: React.FC = () => {
  const [groups] = useState<Group[]>([
    { id: 1, name: 'Node Team', lastMessage: 'Welcome to the group!', unreadCount: 2 },
    { id: 2, name: 'Laravel Team', lastMessage: 'Group chat started', unreadCount: 0 },
  ]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleSelectGroup = (groupId: number) => {
    const group = groups.find(group => group.id === groupId);
    setSelectedGroup(group || null);

    // Sample messages for the selected group
    setMessages([
      { text: 'Welcome to the group!', isSent: false },
      { text: 'Thank you!', isSent: true },
    ]);
  };

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, isSent: true }]);
  };

  // Handle close button click in GroupWindow
  const handleCloseGroupWindow = () => {
    setSelectedGroup(null); 
  };

  return (
    <Container className='mt-5'>
      <Grid container spacing={2}>
        {/* Group List Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ height: '100vh', overflowY: 'auto', padding: '16px' }}>
            <Typography variant="h6">Groups</Typography>
            <GroupList
              groups={groups}
              selectedGroupId={selectedGroup?.id || null} 
              onSelectGroup={handleSelectGroup}
            />
          
          </Paper>
        </Grid>

        {/* Group Content */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '16px' }}>
            {selectedGroup ? (
              <>
                <GroupWindow 
                  group={selectedGroup} 
                  messages={messages} 
                  onSendMessage={handleSendMessage} 
                  onClose={handleCloseGroupWindow} 
                />
              </>
            ) : (
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '300px' }}
              >
                <Typography variant="h4" align="center">Please select a group</Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupPage;
