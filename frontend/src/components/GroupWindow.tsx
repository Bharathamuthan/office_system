import React, { useState, KeyboardEvent } from 'react';
import '../styles/Group.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Picker from '@emoji-mart/react';  // Update import to default
import data from '@emoji-mart/data';     // Emoji data import

interface Message {
  text: string;
  isSent: boolean;
}

interface Group {
  name: string;
}

interface GroupWindowProps {
  group: Group;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void; 
}

const GroupWindow: React.FC<GroupWindowProps> = ({ group, messages, onSendMessage, onClose }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      console.log('Selected file:', e.target.files[0]);
    }
  };

  const addEmoji = (emoji: any) => {
    setNewMessage(newMessage + emoji.native);
  };

  return (
    <div className='group-window'>
      <div className='group-header'>
        <h4 className='group-title'>{group.name}</h4>
        <button className='close-button' onClick={onClose}>
          &#10006; 
        </button>
      </div>

      <div className='message-list'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isSent ? 'sent-message' : 'received-message'}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className='input-area'>
        {/* File Sharing Option */}
        <div className='file-sharing'>
          <label htmlFor='file-upload' className='file-upload-label'>
            <i className='fas fa-upload'></i>
            <input
              type='file'
              id='file-upload'
              className='file-upload-input'
              onChange={handleFileChange}
              style={{ display: 'none' }} 
            />
          </label>

          {/* Emoji Picker Button */}
          <span className='emoji-icon' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😀
          </span>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className='emoji-picker'>
              <Picker data={data} onEmojiSelect={addEmoji} /> {/* Updated to onEmojiSelect */}
            </div>
          )}
        </div>

        {/* Message Input */}
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type a message...'
          className='input-field'
        />
        <button onClick={handleSend} className='send-button'>
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupWindow;
