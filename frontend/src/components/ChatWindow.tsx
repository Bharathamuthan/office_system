import React, { useState, KeyboardEvent } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';

interface Chat {
  name: string;
}

interface Message {
  text: string;
  isSent: boolean;
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
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="chatWindow" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <Box className="chatHeader" sx={{ padding: 2, borderBottom: '1px solid #ddd' }}>
        <Typography variant="h5" className="chatHtag"><b>{chat.name}</b></Typography>
      </Box>

      {/* Chat Messages */}
      <Box className="chatMessages" sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginY: 1,
              borderRadius: 1,
              bgcolor: message.isSent ? 'primary.main' : 'grey.300',
              color: message.isSent ? 'white' : 'black',
              alignSelf: message.isSent ? 'flex-end' : 'flex-start',
              maxWidth: '60%',
            }}
          >
            {message.text}
          </Box>
        ))}
      </Box>

      {/* Chat Input */}
      <Box className="chatInputContainer" sx={{ display: 'flex', padding: 2, borderTop: '1px solid #ddd' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chatInput"
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          className="sendButton"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
