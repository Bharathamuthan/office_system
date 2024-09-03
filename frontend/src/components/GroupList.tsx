import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface Group {
  id: number;
  name: string;
}

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (id: number) => void;
}

// GroupList component
const GroupList: React.FC<GroupListProps> = ({ groups, onSelectGroup }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {groups.map((group) => (
        <React.Fragment key={group.id}>
          <ListItem
            onClick={() => onSelectGroup(group.id)}
            sx={{ cursor: 'pointer' }}
            component="div" // Render as a div to maintain button-like behavior
          >
            <ListItemText primary={group.name} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default GroupList;
