import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    if (window.innerWidth > 400) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleClosePopup = () => {
    setShowLogoutPopup(false);
    setErrorMessage(''); // Clear error message on popup close
  };

  const handleConfirmLogout = () => {
    if (!logoutMessage.trim()) {
      setErrorMessage('Please type a message before logging out.');
      return;
    }
    console.log('User Message:', logoutMessage); // Capture and process the typed message
    setShowLogoutPopup(false);
    // Implement the actual logout logic here, such as clearing session/cookies
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <>
      <header className={`header-fixed ${isFixed ? 'fixed' : ''}`}>
        <div className="header-limiter">
          <h1>
            <a href="#">Company<span>logo</span></a>
          </h1>

          {/* Right-side search, notifications, and profile */}
          <div className="header-right">
            {/* Search bar */}
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <SearchIcon className="search-icon" />
            </div>

            {/* Notification icon */}
            <div className="notification">
              <CircleNotificationsIcon className="icon" />
            </div>

            {/* Profile icon */}
            <div className="profile" onClick={handleProfileClick}>
              <AccountCircleIcon className="icon" />
              {showLogout && (
                <div className="logout-dropdown">
                  <ul>
                    <li onClick={handleLogoutClick}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Placeholder to prevent page jump */}
      {isFixed && <div className="header-fixed-placeholder"></div>}

      {/* Logout confirmation popup with message input */}
      {showLogoutPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Confirm Logout</h2>
            <p>Please type a update before you logout:</p>
            <textarea 
              value={logoutMessage} 
              onChange={(e) => setLogoutMessage(e.target.value)} 
              placeholder="Type your update here..."
              rows={4}
              cols={30}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="popup-buttons">
              <button onClick={handleConfirmLogout}>Yes, Logout</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
