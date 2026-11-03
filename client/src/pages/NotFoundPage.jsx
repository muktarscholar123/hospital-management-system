import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a' }}>404</h1>
      <h2 style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
        The departmental workspace or URL you requested does not exist or may have moved.
      </p>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <Button variant="primary" icon={Home}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
