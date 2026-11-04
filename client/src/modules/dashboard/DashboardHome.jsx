import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Stethoscope,
  HeartPulse,
  FlaskConical,
  CreditCard,
  RefreshCw,
  Server,
  Database,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardHome() {
  const { currentUser } = useAuth();
  const [healthStatus, setHealthStatus] = useState({ loading: true, data: null, error: null });

  const fetchHealth = async () => {
    setHealthStatus({ loading: true, data: null, error: null });
    try {
      const res = await fetch('/api/v1/health');
      const json = await res.json();
      if (json.success) {
        setHealthStatus({ loading: false, data: json.data, error: null });
      } else {
        throw new Error(json.error?.message || 'Failed to ping health API');
      }
    } catch (err) {
      setHealthStatus({ loading: false, data: null, error: err.message });
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  // Fictional sample metrics for Phase 2 UI prototype
  const stats = [
    { label: "Today's Patient Visits", value: '28', icon: Users, color: '#0284c7', change: '+12% from yesterday' },
    { label: 'Awaiting Triage', value: '4', icon: HeartPulse, color: '#eab308', change: 'Normal queue pace' },
    { label: 'Active Consultations', value: '6', icon: Stethoscope, color: '#16a34a', change: '2 doctors on duty' },
    { label: 'Pending Lab Orders', value: '9', icon: FlaskConical, color: '#8b5cf6', change: '3 urgent requests' },
    { label: 'Unpaid Invoices', value: '5', icon: CreditCard, color: '#f97316', change: 'Cashier processing' },
  ];

  const recentVisits = [
    { id: 1, visitNo: 'VIS-2026-0012', patient: 'Amina Sani', time: '10:15 AM', dept: 'General OPD', status: 'AWAITING_CONSULTATION' },
    { id: 2, visitNo: 'VIS-2026-0013', patient: 'Chukwuma Eze', time: '10:30 AM', dept: 'General OPD', status: 'AWAITING_TRIAGE' },
    { id: 3, visitNo: 'VIS-2026-0014', patient: 'Blessing Udoh', time: '10:45 AM', dept: 'Labour & Maternity', status: 'IN_PROGRESS' },
    { id: 4, visitNo: 'VIS-2026-0015', patient: 'Ibrahim Danjuma', time: '11:00 AM', dept: 'Laboratory', status: 'AWAITING_INVESTIGATION' },
  ];

  const columns = [
    { header: 'Visit No', accessor: 'visitNo' },
    { header: 'Patient Name', accessor: 'patient' },
    { header: 'Time Registered', accessor: 'time' },
    { header: 'Department', accessor: 'dept' },
    {
      header: 'Workflow Status',
      render: (row) => {
        const variants = {
          AWAITING_TRIAGE: 'warning',
          AWAITING_CONSULTATION: 'info',
          IN_PROGRESS: 'purple',
          AWAITING_INVESTIGATION: 'neutral',
        };
        return <Badge variant={variants[row.status] || 'neutral'}>{row.status.replace(/_/g, ' ')}</Badge>;
      },
    },
  ];

  return (
    <div>
      {/* Welcome Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>
            Hospital Operational Dashboard
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '2px' }}>
            Welcome back, <strong>{currentUser?.name}</strong>. Here is today's real-time facility summary.
          </p>
        </div>

        <Button variant="secondary" icon={RefreshCw} onClick={fetchHealth} size="sm">
          Refresh Live Data
        </Button>
      </div>

      {/* Backend & DB Health Card */}
      <Card
        title="Infrastructure & Services Status"
        action={
          <Badge variant={healthStatus.data ? 'success' : 'danger'}>
            {healthStatus.data ? 'All Systems Online' : 'Service Alert'}
          </Badge>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <Server size={24} color={healthStatus.data ? '#16a34a' : '#dc2626'} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Express API Server</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {healthStatus.loading ? 'Checking...' : healthStatus.data?.server || 'Backend offline'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <Database size={24} color={healthStatus.data ? '#16a34a' : '#dc2626'} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>MySQL (hms_db via Prisma)</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {healthStatus.loading ? 'Checking...' : healthStatus.data?.database || 'Database unreachable'}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{s.label}</span>
                <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: `${s.color}15` }}>
                  <Icon size={18} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>{s.value}</div>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{s.change}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Visits Queue */}
      <Card
        title="Current Outpatient Queue"
        subtitle="Real-time patient flow across triage, consultation, and investigation"
      >
        <Table columns={columns} data={recentVisits} />
      </Card>
    </div>
  );
}

