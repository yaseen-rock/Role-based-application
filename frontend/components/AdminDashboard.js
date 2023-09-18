import React, { useEffect, useState } from 'react';
import { getUserData, deleteUser} from '../lib/api'; 
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
    marginTop: '50px',
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

const Dashboard = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await getUserData(); 
   
        const filteredUsers =
          userRole === 'Admin'
            ? userList.filter((user) => user.role === 'Customer')
            : userList.filter((user) => user.role !== 'Super Admin');

        setUsers(filteredUsers);
      } catch (error) {
        console.error('API error:', error);
      }
    }

    fetchUsers();
  }, [userRole]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Delete user error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <LogoutButton />
      <h2 style={styles.header}>Admin Dashboard</h2>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
