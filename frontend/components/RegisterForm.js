import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/api'; 
import styles from './RegisterForm.module.css'; 


const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer', 
  });

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await registerUser(formData);
  
      
      if (response.status === 'success') {
         console.error('Registration failed');
      } else {
         router.push('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <select name="role" value={role} onChange={handleChange} className={styles.select}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;