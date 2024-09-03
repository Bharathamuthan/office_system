import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import GroupPage from './pages/GroupPage';
import LeaveRequest from './components/LeaveRequest';
import reportWebVitals from './reportWebVitals';

// Adding types to the root element
const rootElement = document.getElementById('root');

// Ensure the root element is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route path="admin" element={<ChatPage />} />
          <Route path="groups" element={<GroupPage />} />
          <Route path="leave-request" element={<LeaveRequest />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

reportWebVitals();
