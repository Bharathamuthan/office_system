import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/Dashboard.css'; 

// Define the types for form data
interface FormData {
  Date: string;
  Hourpermission: string;
  reason: string;
}

const LeaveRequest: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Date: '',
    Hourpermission: '',
    reason: '',
  });

  // Handle changes in form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://your-backend-url/leave-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Leave request submitted successfully.');
      } else {
        alert('Failed to submit leave request.');
      }
    } catch (error) {
      // Type assertion
      if (error instanceof Error) {
        alert('An error occurred: ' + error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Leave Request</h2>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hour Permission:</label>
          <input
            type="time"
            name="Hourpermission"
            value={formData.Hourpermission}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequest;
