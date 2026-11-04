import React from 'react';

export default function Badge({ children, variant = 'neutral' }) {
  const styles = {
    neutral: { bg: '#f1f5f9', color: '#475569' },
    success: { bg: '#dcfce7', color: '#166534' },
    warning: { bg: '#fef3c7', color: '#92400e' },
    danger: { bg: '#fee2e2', color: '#991b1b' },
    info: { bg: '#e0f2fe', color: '#075985' },
    purple: { bg: '#f3e8ff', color: '#6b21a8' },
  };

  const current = styles[variant] || styles.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {children}
    </span>
  );
}

