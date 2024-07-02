import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Loginpage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Ensure cookies are sent with the request
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setError('Login failed: ' + errorData.message);
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setRedirect(true);
    } catch (e) {
      console.error('Fetch error:', e);
      setError('An error occurred. Please try again.');
    }
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='username'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
