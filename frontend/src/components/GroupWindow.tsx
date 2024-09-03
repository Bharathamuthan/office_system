import React, { useState, KeyboardEvent } from 'react';
import '../styles/Group.css'; 

interface Message {
  text: string;
  isSent: boolean;
}

interface Group {
  name: string;
}

interface GroupWindowProps {
  group: Group;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const GroupWindow: React.FC<GroupWindowProps> = ({ group, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='group-window'>
      <div className='group-header'>
        <h4 className='group-title'>{group.name}</h4>
      </div>
      <div className='message-list'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isSent ? 'sent-message' : 'received-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className='input-area'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type a message...'
          className='input-field'
        />
        <button onClick={handleSend} className='send-button'>
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupWindow;
