import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export default function Alert({ title, message, type = 'info', style = {} }) {
  const configs = {
    info: { bg: '#f0f9ff', border: '#bae6fd', text: '#0369a1', icon: Info },
    success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', icon: CheckCircle },
    warning: { bg: '#fffbeb', border: '#fde68a', text: '#b45309', icon: AlertTriangle },
    error: { bg: '#fef2f2', border: '#fecaca', text: '#b91c1c', icon: AlertCircle },
  };

  const { bg, border, text, icon: Icon } = configs[type] || configs.info;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color: text,
        marginBottom: '16px',
        ...style,
      }}
    >
      <Icon size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        {title && <strong style={{ display: 'block', fontSize: '0.875rem', marginBottom: '2px' }}>{title}</strong>}
        {message && <p style={{ fontSize: '0.8125rem', margin: 0, opacity: 0.9 }}>{message}</p>}
      </div>
    </div>
  );
}

