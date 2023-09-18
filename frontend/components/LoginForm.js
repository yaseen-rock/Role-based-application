import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../lib/api';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (response.token && response.user && response.user.role) {
        const { role } = response.user;

        switch (role) {
          case 'Super Admin':
            router.push('/dashboard');
            break;
          case 'Admin':
            router.push('/admin-dashboard');
            break;
          case 'Customer':
            router.push('/customer-dashboard');
            break;
          default:
            console.error('Unknown role:', role);
            break;
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='image'>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
      </div>
      <style jsx>{`
      .image {
        background-image: url("https://w0.peakpx.com/wallpaper/216/617/HD-wallpaper-macbook-pro-laptop-ultra-computers-hardware-dark-internet-business-laptop-apple-night-open-modern-design-background-digital-technology-computer-macbook-macbookpro-aesthetic-portable.jpg");
        background-size: cover;
        background-position: center;
        height: 110vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 90vh; /*
          height: 100vh; /* Make the container full height of the viewport */
          
  }
  
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
         /* Increase border radius */
          font-size: 18px;
        }

        button {
          width: 100%;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 15px; /* Increase padding */
          cursor: pointer;
          font-size: 15px; 
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;