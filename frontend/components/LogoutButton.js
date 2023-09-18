import React from 'react';
import { logoutUser } from '../lib/api';

const styles = {
  button: {
    backgroundColor: '#ff0000', 
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px', 
    cursor: 'pointer',
    float: 'right', 
    marginBottom: '20px',
  },
};

const LogoutButton = () => {
  const handleLogout = () => {
    logoutUser(); 
  };

  return (
    <button style={styles.button} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
