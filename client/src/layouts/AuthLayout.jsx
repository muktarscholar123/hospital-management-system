import React from 'react';
import { Outlet } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            backgroundColor: '#0284c7',
            marginBottom: '12px',
          }}
        >
          <Activity size={32} color="#ffffff" />
        </div>
        <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700 }}>Hospital Management System</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px' }}>
          Staff Authentication Portal • Private Hospital Location
        </p>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Outlet />
      </div>

      <footer style={{ marginTop: '32px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>
        Authorized personnel only. All access and activity is logged and audited.
      </footer>
    </div>
  );
}
