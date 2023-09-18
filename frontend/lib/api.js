import { useRouter } from 'next/router';
const API_BASE_URL = 'http://localhost:5000/api'; 

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);

  return data;
}

export async function registerUser(userData) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(`${API_BASE_URL}/users/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data; 
}

export async function getUserData() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(`${API_BASE_URL}/users/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const userData = await response.json();
  console.log('Fetched user data:', userData); 

  return userData;
}


export function logoutUser() {
  localStorage.removeItem('token');

  window.location.href = '/login'; 
}


export async function deleteUser(userId) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(`${API_BASE_URL}/users/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return true; 
}

export async function updateUser(userId, updatedUserData) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(`${API_BASE_URL}/users/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(updatedUserData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const updatedUser = await response.json();
  return updatedUser;
}
export async function getUser() {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(`${API_BASE_URL}/users/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const userData = await response.json();
  console.log('Fetched user data:', userData); 

  return userData;
}