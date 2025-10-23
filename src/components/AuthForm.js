import React, { useState } from 'react';
import { login, signup } from '../api';

const AuthForm = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin ? await login({ email: form.email, password: form.password })
        : await signup({ name: form.name, email: form.email, password: form.password });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Auth failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="section-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <>
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </>
          )}

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" required />

          <label>Password</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" required />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">{isLogin ? 'Login' : 'Sign Up'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="btn-secondary">
              {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
