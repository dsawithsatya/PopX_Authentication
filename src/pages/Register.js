import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { registerUser } from '../utils/auth';
import { isAuthenticated } from '../utils/auth';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isAgency, setIsAgency] = useState('no');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/account');
    }
  }, [navigate]);

  function validate() {
    if (!fullName.trim()) return 'Full Name is required';
    if (!phone.trim()) return 'Phone Number is required';
    if (!email.trim()) return 'Email Address is required';
    if (!password) return 'Password is required';
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) return setError(v);
    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      password,
      company: company.trim(),
      isAgency: isAgency === 'yes',
    };
    const res = registerUser(payload);
    if (!res.success) {
      return setError(res.message || 'Registration failed');
    }
    navigate('/login');
  }

  return (
    <Container>
      <div className="card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Fill in your details to create a PopX account.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <input className="input" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input className="input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="input" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="input" placeholder="Company Name (optional)" value={company} onChange={(e) => setCompany(e.target.value)} />

          <div className="radio-group">
            <label>Agency</label>
            <div>
              <label>
                <input type="radio" name="agency" value="yes" checked={isAgency === 'yes'} onChange={() => setIsAgency('yes')} /> Yes
              </label>
              <label style={{ marginLeft: 12 }}>
                <input type="radio" name="agency" value="no" checked={isAgency === 'no'} onChange={() => setIsAgency('no')} /> No
              </label>
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button className="button" type="submit">Create Account</button>
        </form>
      </div>
    </Container>
  );
}
