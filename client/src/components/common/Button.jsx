import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  style = {},
  className = '',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'background-color 0.15s, border-color 0.15s',
    border: '1px solid transparent',
  };

  const sizes = {
    sm: { padding: '4px 10px', fontSize: '0.8125rem' },
    md: { padding: '8px 16px', fontSize: '0.875rem' },
    lg: { padding: '10px 20px', fontSize: '1rem' },
  };

  const variants = {
    primary: {
      backgroundColor: '#0284c7',
      color: '#ffffff',
      borderColor: '#0284c7',
    },
    secondary: {
      backgroundColor: '#f1f5f9',
      color: '#334155',
      borderColor: '#cbd5e1',
    },
    danger: {
      backgroundColor: '#dc2626',
      color: '#ffffff',
      borderColor: '#dc2626',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#0284c7',
      borderColor: '#0284c7',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#64748b',
      borderColor: 'transparent',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{ ...baseStyles, ...sizes[size], ...variants[variant], ...style }}
      className={className}
      {...props}
    >
      {loading ? (
        <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children}
    </button>
  );
}
