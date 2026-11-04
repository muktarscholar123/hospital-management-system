import React from 'react';

export default function Input({
  label,
  error,
  helperText,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  style = {},
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}
        >
          {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: error ? '1px solid #dc2626' : '1px solid #cbd5e1',
          outline: 'none',
          fontSize: '0.875rem',
          backgroundColor: disabled ? '#f8fafc' : '#ffffff',
          color: '#1e293b',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        {...props}
      />

      {error ? (
        <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{helperText}</span>
      ) : null}
    </div>
  );
}

