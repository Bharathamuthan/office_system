import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import GroupWindow from '../components/GroupWindow';
import MessageInput from '../components/MessageInput';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [chats] = useState([
    { id: 1, name: 'Bharath', avatar: 'path_to_avatar', lastMessage: 'Hey there!', unreadCount: 1 },
  ]);

  const [groups] = useState([
    { id: 1, name: 'Node Team', lastMessage: 'Welcome to the group!', unreadCount: 2 },
    { id: 2, name: 'Laravel Team', lastMessage: 'Group chat started', unreadCount: 0 },
  ]);

  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const navigate = useNavigate();

  const handleSelectChat = (chatId) => {
    const chat = chats.find(chat => chat.id === chatId);
    setSelectedChat(chat);
    setSelectedGroup(null);

    setMessages([
      { text: 'Hello, how are you?', isSent: false },
      { text: 'I am fine, thanks!', isSent: true },
    ]);
  };

  const handleSelectGroup = (groupId) => {
    const group = groups.find(group => group.id === groupId);
    setSelectedGroup(group);
    setSelectedChat(null);

    setMessages([
      { text: 'Welcome to the group!', isSent: false },
      { text: 'Thank you!', isSent: true },
    ]);
  };

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isSent: true }]);
  };

  return (
    <MDBContainer fluid className='mt-5'>
      <MDBRow>
        {/* Combined Chats and Groups Sidebar */}
        <MDBCol md='3' className='bg-light' style={{ height: '100vh', overflowY: 'auto' }}>
          <div className='sidebar'>
            <h5>Chats</h5>
            <ChatList chats={chats} onSelectChat={handleSelectChat} />
            <hr />
            <h5>Groups</h5>
            <ChatList chats={groups} onSelectChat={handleSelectGroup} />
            <hr />
            <MDBBtn color='primary' onClick={() => navigate('/leave-request')}>
              Leave Request
            </MDBBtn>
          </div>
        </MDBCol>

        {/* Main Content */}
        <MDBCol md='9' style={{ padding: 0 }}>
          <div className='main-content' style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                <ChatWindow chat={selectedChat} messages={messages} onSendMessage={handleSendMessage} />
                <MessageInput onSendMessage={handleSendMessage} />
              </>
            ) : selectedGroup ? (
              <>
                <GroupWindow group={selectedGroup} messages={messages} onSendMessage={handleSendMessage} />
                <MessageInput onSendMessage={handleSendMessage} />
              </>
            ) : (
              <div className='d-flex justify-content-center align-items-center h-100'>
                <h4>Please select a chat or group</h4>
              </div>
            )}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Dashboard;
