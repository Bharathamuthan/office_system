import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

interface Chat {
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  unreadCount?: number;
}

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: number) => void;
}

// ChatList component
const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <ListItem
          key={chat.id}
          component="button"
          onClick={() => onSelectChat(chat.id)}
          sx={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}
        >
          <Badge
            badgeContent={chat.unreadCount}
            color="primary"
            invisible={!chat.unreadCount}
            sx={{ marginRight: 2 }}
          >
            <Avatar alt={chat.name} src={chat.avatar} />
          </Badge>
          <ListItemText
            primary={chat.name}
            secondary={chat.lastMessage}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
