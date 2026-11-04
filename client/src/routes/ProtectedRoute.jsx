import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/common/Alert';
import Card from '../components/common/Card';
import { ShieldAlert } from 'lucide-react';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check role access
  if (allowedRoles.length > 0) {
    const isSuperOrAdmin = currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'HOSPITAL_ADMIN';
    const isAllowed = isSuperOrAdmin || allowedRoles.includes(currentUser.role);

    if (!isAllowed) {
      return (
        <Card title="Access Restricted" style={{ maxWidth: '600px', margin: '40px auto' }}>
          <Alert
            type="error"
            title="Unauthorized Departmental Workspace"
            message={`Your active role (${currentUser.role}) does not have permission to access this departmental area. To access this workspace, switch to an authorized staff role.`}
          />
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            In compliance with hospital data protection and patient privacy policies, access to clinical and financial records is restricted to authorized roles.
          </p>
        </Card>
      );
    }
  }

  return <Outlet />;
}

