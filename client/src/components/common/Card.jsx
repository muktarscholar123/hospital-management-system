import React from 'react';

export default function Card({ title, subtitle, action, children, style = {} }) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        marginBottom: '20px',
        ...style,
      }}
    >
      {(title || action) && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {title && <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  );
}
