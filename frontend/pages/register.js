import React from 'react';
import Layout from '@/components/Layout';
import RegisterForm from '@/components/RegisterForm';

function RegisterPage() {
  const headingStyle = {
    textAlign: 'center',    
    fontSize: '24px',       
    marginTop: '200px',     
  };

  return (
    <Layout>
      <h2 style={headingStyle}>New User Registration</h2> {}
      <RegisterForm />
    </Layout>
  );
}

export default RegisterPage;
