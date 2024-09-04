import React, { useState, KeyboardEvent } from 'react';
import '../styles/ChatWindow.css';

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
    <div className="chatWindow">
      <div className="chatHeader">
        <h4 className="chatHtag"><b>{chat.name}</b></h4>
      </div>
      <div className="chatMessages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatMessage ${message.isSent ? 'sent' : 'received'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatInputContainer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chatInput"
        />
        <button
          onClick={handleSendMessage}
          className="sendButton"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
