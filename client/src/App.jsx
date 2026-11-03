import React, { useState, useEffect } from 'react';
import { Activity, Database, Server, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    connected: false,
    data: null,
    error: null,
  });

  // Test connectivity with the Express backend
  const checkBackendHealth = async () => {
    setBackendStatus((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch('/api/v1/health');
      const data = await response.json();
      if (data.success) {
        setBackendStatus({
          loading: false,
          connected: true,
          data: data.data,
          error: null,
        });
      } else {
        throw new Error(data.error?.message || 'Server returned failure status');
      }
    } catch (err) {
      setBackendStatus({
        loading: false,
        connected: false,
        data: null,
        error: err.message,
      });
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '24px' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={32} color="#0284c7" />
          <div>
            <h1 style={{ fontSize: '1.75rem', color: '#0f172a' }}>Hospital Management System (HMS)</h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Staff-only Private Hospital Management Platform</p>
          </div>
        </div>
      </header>

      <section style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#1e293b' }}>
          Foundation & Environment Status
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* Frontend Card */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={20} color="#16a34a" />
              <strong>Frontend Client</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>React 18 + Vite running on port 5173</p>
          </div>

          {/* Backend Card */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Server size={20} color={backendStatus.connected ? "#16a34a" : "#dc2626"} />
              <strong>Express Backend</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              {backendStatus.loading
                ? 'Checking connection...'
                : backendStatus.connected
                ? backendStatus.data?.server
                : 'Disconnected / Offline'}
            </p>
          </div>

          {/* Database Card */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Database size={20} color={backendStatus.connected ? "#16a34a" : "#dc2626"} />
              <strong>MySQL Database</strong>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              {backendStatus.loading
                ? 'Testing connection...'
                : backendStatus.connected
                ? backendStatus.data?.database
                : 'Database unreachable'}
            </p>
          </div>
        </div>

        {backendStatus.error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', color: '#991b1b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} />
            <div>
              <strong>Connectivity Note: </strong>
              <span>Ensure the Express server is running on port 5000 (`npm run dev` in server directory). Error: {backendStatus.error}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={checkBackendHealth}
            style={{ background: '#0284c7', color: '#ffffff' }}
          >
            Re-check System Health
          </button>
        </div>
      </section>

      <section style={{ marginTop: '24px', background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
          <ShieldCheck size={20} color="#0284c7" />
          Active Specifications & Modules
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>
          The initial database schema is migrated with 46 tables covering:
        </p>
        <ul style={{ color: '#475569', fontSize: '0.875rem', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Staff & RBAC (Roles, Permissions, Profiles, Departments)</li>
          <li>Reception & Patients (Unique Patient Numbers, Encounters, Visits)</li>
          <li>Nursing & Triage (Vitals, Observations, Pain Scale)</li>
          <li>Doctors & Consultations (Diagnoses, Care Plans, Amendments)</li>
          <li>Laboratory (Order Queues, Samples, Verifications & Releases)</li>
          <li>Pharmacy & Inventory (Batches, Transactions, Prescriptions, Dispensing)</li>
          <li>Cashier & Billing (Invoices, Items, Receipts, Reversals, Adjustments)</li>
          <li>Labour Room & Maternity (Multi-pregnancy preservation, Deliveries & Multiple Newborns)</li>
          <li>Audit Log (Actor, action, timestamp, tamper-resistant trail)</li>
        </ul>
      </section>
    </div>
  );
}

