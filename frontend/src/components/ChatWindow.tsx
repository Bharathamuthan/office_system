import React, { useState, KeyboardEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface Message {
  text: string;
  isSent: boolean;
}

interface Chat {
  name: string;
}

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box 
      display="flex"
      flexDirection="column"
      height="100%"
      bgcolor="#f4f4f4"
      borderRadius="8px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
    >
      <Box 
        p={2}
        bgcolor="#007bff"
        color="#fff"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <Typography variant="h6" component="h4" margin={0}>
          {chat.name}
        </Typography>
      </Box>
      <Box 
        flex={1}
        p={2}
        bgcolor="#fff"
        display="flex"
        flexDirection="column"
        sx={{
          overflowY: 'auto',  // Use overflowY inside the sx prop
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: '70%',
              p: 2,
              mb: 1,
              borderRadius: '20px',
              wordBreak: 'break-word',
              alignSelf: message.isSent ? 'flex-end' : 'flex-start',
              bgcolor: message.isSent ? '#007bff' : '#e9ecef',
              color: message.isSent ? '#fff' : '#000',
            }}
          >
            {message.text}
          </Box>
        ))}
      </Box>
      <Box 
        p={1}
        borderTop="1px solid #ccc"
        display="flex"
        alignItems="center"
        bgcolor="#fff"
      >
        <TextField
          variant="outlined"
          multiline
          rows={1}
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          sx={{ mr: 1, borderRadius: '20px' }}
        />
        <Button 
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ borderRadius: '20px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
