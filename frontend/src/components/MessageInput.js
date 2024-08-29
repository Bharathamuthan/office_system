import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='d-flex mt-3'>
      <MDBInput
        type='textarea'
        rows='1'
        className='flex-grow-1'
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='Type your message...'
      />
      <MDBBtn className='ms-2' onClick={handleSend}>
        Send
      </MDBBtn>
    </div>
  );
};

export default MessageInput;
