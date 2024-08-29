import React, { useState } from 'react';
import '../styles/Dashboard.css'; 

const LeaveRequest = () => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        reason: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
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
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Leave Request</h2>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
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
