import React from 'react';

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No records found.',
  keyField = 'id',
}) {
  return (
    <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  padding: '12px 16px',
                  fontWeight: 600,
                  color: '#475569',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '8px' }}>⏳</span>
                Loading data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row[keyField] || rowIndex}
                style={{
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'background-color 0.1s',
                }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '12px 16px', color: '#1e293b' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

