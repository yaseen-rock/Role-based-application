import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../lib/api';
import LogoutButton from './LogoutButton';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    

  },
  header: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    marginBottom: '20px',
    marginTop: '40px',
  },
  userItem: {
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userActions: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

const CustomerDashboard = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    
    async function fetchUser() {
      try {
        const userData = await getUser(); 

        setUser(userData);
      } catch (error) {
        console.error('API error:', error);
      }
    }

    fetchUser();
  }, []);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(user._id, updatedUserData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const handleUserDataChange = (e) => {
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <LogoutButton />
      {user.role === 'Customer' && (
        <>
          <h2 style={styles.header}>Customer Dashboard</h2>
          <div style={styles.userItem}>
            <div>
              <strong>Name:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Role:</strong> {user.role}
            </div>
            <div style={styles.userActions}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleUserDataChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleUserDataChange}
                  />
                  <button style={styles.button} onClick={handleUpdateUser}>
                    Save
                  </button>
                </>
              ) : (
                <button
                  style={styles.button}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDashboard;