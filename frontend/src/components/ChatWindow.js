import React from 'react';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const ChatWindow = ({ chat, messages }) => {
  return (
    <MDBCard className='h-100'>
      <MDBCardBody>
        <h5 className='fw-bold'>{chat.name}</h5>
        <div className='chat-messages' style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <div key={index} className={`d-flex ${message.isSent ? 'justify-content-end' : ''}`}>
              <div
                className={`message ${message.isSent ? 'bg-primary text-white' : 'bg-light text-dark'} p-2 my-2 rounded`}
                style={{ maxWidth: '75%' }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ChatWindow;
