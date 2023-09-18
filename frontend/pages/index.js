import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Your App</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </div>
  );
};

export default Home;
