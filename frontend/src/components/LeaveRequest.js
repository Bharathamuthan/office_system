import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the leave request submission logic here
    console.log('Leave Request Submitted', { leaveType, startDate, endDate, reason });
  };

  return (
    <MDBContainer fluid className='mt-5'>
      <MDBRow>
        <MDBCol md='6' className='offset-md-3'>
          <h3 className='text-center mb-4'>Leave Request</h3>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label='Leave Type'
              type='text'
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className='mb-4'
            />
            <MDBInput
              label='Start Date'
              type='date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='mb-4'
            />
            <MDBInput
              label='End Date'
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='mb-4'
            />
            <MDBTextArea
              label='Reason'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows='4'
              className='mb-4'
            />
            <MDBBtn type='submit' color='primary' block>
              Submit Request
            </MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LeaveRequest;
