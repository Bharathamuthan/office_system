import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Dashboard = () => {
  const [chats] = useState([
    { id: 1, name: 'John Doe', avatar: 'path_to_avatar', lastMessage: 'Hey there!', unreadCount: 1 },
    { id: 2, name: 'Jane Smith', avatar: 'path_to_avatar', lastMessage: 'Hello!', unreadCount: 0 },
  ]);
  
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chatId) => {
    const chat = chats.find(chat => chat.id === chatId);
    setSelectedChat(chat);
    // Fetch or load messages for the selected chat
    setMessages([
      { text: 'Hello, how are you?', isSent: false },
      { text: 'I am fine, thanks!', isSent: true },
    ]);
  };

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isSent: true }]);
  };

  return (
    <MDBContainer fluid className='mt-5'>
      <MDBRow>
        <MDBCol md='4'>
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </MDBCol>
        <MDBCol md='8'>
          {selectedChat ? (
            <>
              <ChatWindow chat={selectedChat} messages={messages} />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className='d-flex justify-content-center align-items-center h-100'>
              <h4>Please select a chat</h4>
            </div>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Dashboard;
