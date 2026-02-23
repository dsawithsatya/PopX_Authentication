import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { getCurrentUser, logoutUser } from '../utils/auth';

export default function Account() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function handleLogout() {
    logoutUser();
    navigate('/login');
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <div className="card profile-card">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="avatar">{user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}</div>
        </div>
        <h2 className="title" style={{ textAlign: 'center' }}>{user.fullName}</h2>
        <p className="subtitle" style={{ textAlign: 'center' }}>{user.email}</p>
        <p style={{ marginTop: 12, color: '#666', textAlign: 'center' }}>Manage your account settings and preferences.</p>
        <div style={{ marginTop: 16 }}>
          <button className="button" onClick={() => navigate('/')} style={{ width: '100%' }}>Home</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <button className="button button-secondary" onClick={handleLogout} style={{ width: '100%' }}>Logout</button>
        </div>
      </div>
    </Container>
  );
}
