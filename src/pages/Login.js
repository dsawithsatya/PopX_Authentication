import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { loginUser } from '../utils/auth';
import { isAuthenticated } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/account');
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim()) return setError('Email is required');
    if (!password) return setError('Password is required');
    const res = loginUser(email.trim().toLowerCase(), password);
    if (!res.success) {
      if (res.code === 'not_found') return setError('Account not found. Please register first.');
      if (res.code === 'wrong_password') return setError('Invalid password');
      return setError('Login failed');
    }
    navigate('/account');
  }

  return (
    <Container>
      <div className="card">
        <h2 className="title">Login</h2>
        <p className="subtitle">Enter your credentials to access your account.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="error">{error}</div>}
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </Container>
  );
}
