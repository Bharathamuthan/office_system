import React, { useState } from 'react';

const GroupWindow = ({ group, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='group-window' style={styles.groupWindow}>
      <div className='group-header' style={styles.groupHeader}>
        <h4 style={styles.groupTitle}>{group.name}</h4>
      </div>
      <div className='message-list' style={styles.messageList}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.isSent ? styles.sentMessage : styles.receivedMessage),
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className='input-area' style={styles.inputArea}>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type a message...'
          style={styles.inputField}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  groupWindow: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  groupHeader: {
    padding: '15px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  groupTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '600',
  },
  messageList: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#f4f4f4',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Add some space between messages
  },
  message: {
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '20px',
    wordBreak: 'break-word',
    alignSelf: 'flex-start', // Default alignment
  },
  sentMessage: {
    backgroundColor: '#007bff',
    color: '#fff',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#e9ecef',
    color: '#000',
    alignSelf: 'flex-start',
  },
  inputArea: {
    padding: '10px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 15px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default GroupWindow;
