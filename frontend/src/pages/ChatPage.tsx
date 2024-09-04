import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatWindow from '../components/ChatWindow';
// Import MessageInput if needed but you won't use it in this case

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
}

interface Message {
  text: string;
  isSent: boolean;
}

const ChatPage: React.FC = () => {
  const [admin] = useState<Chat[]>([
    { id: 1, name: 'Admin', avatar: 'path_to_avatar', lastMessage: 'Hey there!', unreadCount: 1 },
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat] = useState<Chat | null>(admin[0]);

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, isSent: true }]);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 5 }}>
      <Grid container>
        {/* Sidebar could go here */}

        {/* Chat Content */}
        <Grid item xs={12} sx={{ padding: 0 }}>
          <Box
            className='main-content'
            sx={{ height: '110vh', display: 'flex', flexDirection: 'column' }}
          >
            {selectedChat ? (
              <>
                <ChatWindow
                  chat={selectedChat}
                  messages={messages}
                  onSendMessage={handleSendMessage} // Pass the prop here
                />
                {/* MessageInput is commented out */}
                {/* <MessageInput onSendMessage={handleSendMessage} /> */}
              </>
            ) : (
              <Box
                className='d-flex justify-content-center align-items-center'
                sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography variant='h4'>Please select a chat</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
