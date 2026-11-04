import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Alert from '../../components/common/Alert';
import { UserCheck, ShieldAlert, History, Key } from 'lucide-react';

export default function AdminView() {
  const staffMembers = [
    { id: 1, staffNo: 'STF-001', name: 'Dr. Abubakar Bello', username: 'admin', role: 'HOSPITAL_ADMIN', dept: 'Administration', status: 'ACTIVE' },
    { id: 2, staffNo: 'STF-002', name: 'Dr. Amina Yusuf', username: 'doctor', role: 'DOCTOR', dept: 'Doctors', status: 'ACTIVE' },
    { id: 3, staffNo: 'STF-003', name: 'Fatima Garba', username: 'receptionist', role: 'RECEPTIONIST', dept: 'Reception', status: 'ACTIVE' },
    { id: 4, staffNo: 'STF-004', name: 'Grace Okafor', username: 'nurse', role: 'NURSE', dept: 'Nurses', status: 'ACTIVE' },
    { id: 5, staffNo: 'STF-005', name: 'Musa Ibrahim', username: 'lab', role: 'LAB_SCIENTIST', dept: 'Laboratory', status: 'ACTIVE' },
  ];

  const auditEvents = [
    { id: 1, timestamp: '2026-11-03 13:42:10', actor: 'Dr. Abubakar Bello', action: 'DATABASE_MIGRATION', entity: 'Schema (46 tables)' },
    { id: 2, timestamp: '2026-11-03 14:05:22', actor: 'Fatima Garba', action: 'PATIENT_REGISTERED', entity: 'PAT-2026-0001 (Amina Sani)' },
    { id: 3, timestamp: '2026-11-03 14:15:30', actor: 'Dr. Amina Yusuf', action: 'LAB_ORDER_CREATED', entity: 'LAB-2026-0001' },
    { id: 4, timestamp: '2026-11-03 14:30:15', actor: 'Zainab Danladi', action: 'PAYMENT_POSTED', entity: 'REC-2026-0042 (₦45,000.00)' },
  ];

  const staffColumns = [
    { header: 'Staff No', accessor: 'staffNo' },
    { header: 'Full Name', accessor: 'name' },
    { header: 'Username', accessor: 'username' },
    { header: 'Assigned Role', accessor: 'role' },
    { header: 'Department', accessor: 'dept' },
    {
      header: 'Status',
      render: (row) => <Badge variant="success">{row.status}</Badge>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button size="sm" variant="outline">
            Edit Role
          </Button>
          <Button size="sm" variant="secondary">
            Reset Password
          </Button>
        </div>
      ),
    },
  ];

  const auditColumns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Staff Member (Actor)', accessor: 'actor' },
    {
      header: 'Action',
      render: (row) => <Badge variant="neutral">{row.action}</Badge>,
    },
    { header: 'Entity / Target', accessor: 'entity' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Administration & System Control</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Manage hospital staff accounts, role-based privileges, security policies, and review audit trails.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card
          title="Staff User Accounts & Role Permissions"
          subtitle="Staff credentials, department assignments, and access statuses"
          action={<Button size="sm" variant="primary">+ Create Staff Account</Button>}
        >
          <Table columns={staffColumns} data={staffMembers} />
        </Card>

        <Card
          title="System Audit Log (SRS 4.12 & AUD-01)"
          subtitle="Protected chronological record of actions, transactions, and security events"
        >
          <Table columns={auditColumns} data={auditEvents} />
        </Card>
      </div>
    </div>
  );
}

