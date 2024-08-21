import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdb-react-ui-kit';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <MDBListGroup>
      {chats.map(chat => (
        <MDBListGroupItem
          key={chat.id}
          className='d-flex justify-content-between align-items-center'
          onClick={() => onSelectChat(chat.id)}
          action
        >
          <div className='d-flex align-items-center'>
            <img
              src={chat.avatar}
              alt={chat.name}
              className='rounded-circle'
              style={{ width: '40px', marginRight: '15px' }}
            />
            <div>
              <h6 className='fw-bold mb-0'>{chat.name}</h6>
              <small className='text-muted'>{chat.lastMessage}</small>
            </div>
          </div>
          {chat.unreadCount > 0 && (
            <MDBBadge pill color='danger'>
              {chat.unreadCount}
            </MDBBadge>
          )}
        </MDBListGroupItem>
      ))}
    </MDBListGroup>
  );
};

export default ChatList;
