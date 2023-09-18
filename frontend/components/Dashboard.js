import React, { useEffect, useState } from 'react';
import { getUserData, deleteUser, updateUser } from '../lib/api'; 
import LogoutButton from './LogoutButton';
import RegistrationButton from './RegistrationButton';

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
  },
  userList: {
    listStyleType: 'none',
    padding: '0',
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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    
    async function fetchUsers() {
      try {
        const userList = await getUserData(); 

        const filteredUsers = userList.filter((user) => user.role !== 'Super Admin');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('API error:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Delete user error:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      if (selectedUserId && Object.keys(updatedUserData).length > 0) {
        const updatedUser = await updateUser(selectedUserId, updatedUserData);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUserId ? updatedUser : user
          )
        );
        setSelectedUserId(null);
        setUpdatedUserData({});
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const handleSelectUser = (userId) => {
   
    setSelectedUserId(userId);
  };

  const handleUserDataChange = (e) => {
  
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <LogoutButton />
      <RegistrationButton />
      
      <h2 style={styles.header}>Super Admin Dashboard</h2>
      <ul style={styles.userList}>
        {users.map((user) => (
          <li key={user._id} style={styles.userItem}>
            <div>
              <strong>Name:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Role:</strong> {user.role}
            </div>
            <div style={styles.userActions}>
              <button
                style={styles.button}
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
              <button
                style={styles.button}
                onClick={() => handleSelectUser(user._id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div>
          <h3>Edit User</h3>
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
          <input
            type="text"
            name="role"
            placeholder="Role"
            onChange={handleUserDataChange}
          />
          <button style={styles.button} onClick={handleUpdateUser}>
            Update User
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
