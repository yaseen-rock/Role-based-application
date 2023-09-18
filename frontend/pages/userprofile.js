import React from 'react';
import UserProfile from '../components/UserProfile';

const UserProfilePage = ({ user }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <UserProfile user={user} />
    </div>
  );
};

export default UserProfilePage;
