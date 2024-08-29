import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const GroupWindow = ({ group, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage(''); 
    }
  };

  return (
    <MDBCard style={styles.groupWindow}>
      <MDBCardBody style={styles.cardBody}>
        <MDBCardTitle style={styles.groupTitle}>{group.name}</MDBCardTitle>
      </MDBCardBody>

      <MDBListGroup flush style={styles.messageList}>
        {messages.map((message, index) => (
          <MDBListGroupItem key={index} style={message.isSent ? styles.sentMessage : styles.receivedMessage}>
            {message.text}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>

      <MDBInputGroup className="p-3" style={styles.inputGroup}>
        <MDBInput 
          type="text" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
          style={styles.inputField}
        />
        <MDBBtn color="primary" onClick={handleSend} style={styles.sendButton}>
          Send
        </MDBBtn>
      </MDBInputGroup>
    </MDBCard>
  );
};

const styles = {
  groupWindow: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  cardBody: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    padding: '20px',
  },
  groupTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px 20px',
    backgroundColor: '#f4f4f4',
  },
  sentMessage: {
    marginBottom: '10px',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '20px',
    alignSelf: 'flex-end',
    maxWidth: '75%',
    wordBreak: 'break-word',
  },
  receivedMessage: {
    marginBottom: '10px',
    padding: '10px 15px',
    backgroundColor: '#e9ecef',
    color: '#000',
    borderRadius: '20px',
    alignSelf: 'flex-start',
    maxWidth: '75%',
    wordBreak: 'break-word',
  },
  inputGroup: {
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '15px',
    padding: '10px 20px',
    borderRadius: '20px',
  },
};

export default GroupWindow;
