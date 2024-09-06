import React, { useState, KeyboardEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  unreadCount: number;
}

interface Message {
  text: string;
  isSent: boolean;
}

interface ChatWindowProps {
  chat: Chat;  // Make sure the 'chat' prop is defined here
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
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box>
      <Typography variant="h4">{chat.name}</Typography>
      <Box>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isSent ? 'sent' : 'received'}`}>
            {message.text}
          </div>
        ))}
      </Box>
      <Box>
        <TextField
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
