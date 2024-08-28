import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const GroupWindow = ({ group, messages }) => {
  return (
    <MDBCard style={{ flex: 1, overflowY: 'auto' }}>
      <MDBCardBody>
        <MDBCardTitle>{group.name}</MDBCardTitle>
        <MDBCardText>
          <small>Last message: {group.lastMessage}</small>
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        {messages.map((message, index) => (
          <MDBListGroupItem key={index} className={message.isSent ? 'text-end' : 'text-start'}>
            {message.text}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCard>
  );
};

export default GroupWindow;
