import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className='chat-list'>
      {chats.map(chat => (
        <div
          key={chat.id}
          className='chat-item'
          onClick={() => onSelectChat(chat.id)}
          style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
        >
          <div className='chat-name'>{chat.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
