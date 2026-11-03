import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, PROTOTYPE_USERS } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (user) => {
    setUsername(user.username);
    setPassword('password123');
    setError('');
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Staff Sign In</h2>
      <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '20px' }}>
        Enter your hospital credentials to access your departmental workspace.
      </p>

      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleSubmit}>
        <Input
          label="Username / Staff ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. admin or doctor"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          variant="primary"
          icon={LogIn}
          loading={loading}
          style={{ width: '100%', marginTop: '8px' }}
        >
          Sign In to Portal
        </Button>
      </form>

      {/* Quick Role Tester for Development */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '8px' }}>
          Select Demo Staff Role to Test:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PROTOTYPE_USERS.map((user) => (
            <button
              key={user.username}
              type="button"
              onClick={() => handleSelectPreset(user)}
              style={{
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '4px',
                border: username === user.username ? '1px solid #0284c7' : '1px solid #e2e8f0',
                backgroundColor: username === user.username ? '#e0f2fe' : '#ffffff',
                color: username === user.username ? '#0369a1' : '#475569',
                cursor: 'pointer',
              }}
            >
              {user.role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
