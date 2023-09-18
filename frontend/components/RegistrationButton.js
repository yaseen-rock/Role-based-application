import React from 'react';
import { useRouter } from 'next/router';

const styles = {
  button: {
    backgroundColor: 'green', 
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px', 
    cursor: 'pointer',
    marginBottom: '1px', 
    marginLeft: '1500px',
  },
};

const RegistrationButton = () => {
  const router = useRouter();

  const handleRegistrationClick = () => {
    router.push('/register'); 
  };

  return (
    <button style={styles.button} onClick={handleRegistrationClick}>
      Register New User
    </button>
  );
};

export default RegistrationButton;
