import React, { useState } from 'react';

const ChatWindow = ({ chat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='chat-window' style={styles.chatWindow}>
      <div className='chat-header' style={styles.chatHeader}>
        <h4 style={styles.chatTitle}>{chat.name}</h4>
      </div>
      <div className='chat-messages' style={styles.chatMessages}>
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
      <div className='chat-input' style={styles.chatInput}>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type your message...'
          style={styles.inputField}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatWindow: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  chatHeader: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '600',
  },
  chatMessages: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    maxWidth: '70%',
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '20px',
    wordBreak: 'break-word',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    color: '#000',
  },
  chatInput: {
    padding: '10px',
    borderTop: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
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

export default ChatWindow;
