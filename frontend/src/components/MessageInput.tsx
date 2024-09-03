import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='d-flex mt-3'>
      <textarea
        rows={1}
        className='form-control flex-grow-1'
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
