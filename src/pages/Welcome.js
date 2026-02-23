import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { getCurrentUser } from '../utils/auth';

export default function Welcome() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <Container>
      <div className="card">
        <h1 className="title">Welcome to PopX</h1>
        <p className="subtitle">Securely manage your account and settings with PopX.</p>
        <div style={{ marginTop: 20 }}>
          {!user ? (
            <button className="button" onClick={() => navigate('/register')}>
              Create Account
            </button>
          ) : (
            <button className="button" onClick={() => navigate('/account')}>
              Go to Account
            </button>
          )}
        </div>
        <div style={{ marginTop: 12 }}>
          {!user ? (
            <button className="button button-secondary" onClick={() => navigate('/login')}>
              Already Registered? Login
            </button>
          ) : (
            <button className="button button-secondary" onClick={() => navigate('/login')}>
              Switch Account
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
