import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth, PROTOTYPE_USERS } from '../context/AuthContext';
import {
  Activity,
  Users,
  Stethoscope,
  HeartPulse,
  FlaskConical,
  Baby,
  Pill,
  CreditCard,
  ShieldAlert,
  LogOut,
  LayoutDashboard,
  Building2,
  UserCheck,
} from 'lucide-react';

export default function MainLayout() {
  const { currentUser, logout, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Departmental navigation items with role-awareness
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['all'] },
    { label: 'Reception & Records', path: '/reception', icon: Users, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'RECEPTIONIST'] },
    { label: 'Doctors', path: '/doctors', icon: Stethoscope, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR'] },
    { label: 'Nurses', path: '/nurses', icon: HeartPulse, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'NURSE'] },
    { label: 'Laboratory', path: '/laboratory', icon: FlaskConical, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'LAB_SCIENTIST', 'DOCTOR'] },
    { label: 'Labour & Maternity', path: '/maternity', icon: Baby, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'MIDWIFE', 'DOCTOR'] },
    { label: 'Pharmacy', path: '/pharmacy', icon: Pill, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'PHARMACIST'] },
    { label: 'Cashier & Billing', path: '/cashier', icon: CreditCard, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'CASHIER'] },
    { label: 'Administration', path: '/admin', icon: ShieldAlert, roles: ['SUPER_ADMIN', 'HOSPITAL_ADMIN'] },
  ];

  // Filter items visible to current user's role
  const visibleNavItems = navItems.filter(
    (item) => item.roles.includes('all') || item.roles.includes(currentUser?.role)
  );

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      {/* 1. SIDEBAR */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Hospital Branding */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={28} color="#38bdf8" />
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 }}>City Care Hospital</h1>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Staff Management Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '16px 8px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, padding: '0 12px 8px' }}>
            Workspaces
          </div>
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#0284c7' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  marginBottom: '4px',
                  transition: 'background-color 0.15s',
                })}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Prototype Switcher: Quick Switch Role for Testing */}
        <div style={{ padding: '12px', borderTop: '1px solid #1e293b', backgroundColor: '#090d16' }}>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            <UserCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Switch Active Role (Demo):
          </label>
          <select
            value={currentUser?.username || ''}
            onChange={(e) => {
              const selected = PROTOTYPE_USERS.find((u) => u.username === e.target.value);
              if (selected) {
                setCurrentUser(selected);
                localStorage.setItem('hms_staff_user', JSON.stringify(selected));
              }
            }}
            style={{
              width: '100%',
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '4px',
              padding: '6px',
              fontSize: '0.75rem',
              outline: 'none',
            }}
          >
            {PROTOTYPE_USERS.map((u) => (
              <option key={u.username} value={u.username}>
                {u.role}: {u.name}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* 2. MAIN APP CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Header */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="#64748b" />
            <span style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}>
              Location: <strong>Main Hospital Branch (Private)</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>{currentUser?.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 500 }}>
                {currentUser?.role} • {currentUser?.department}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fee2e2',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </header>

        {/* Safety & Protocol Banner (SRS Compliance) */}
        <div
          style={{
            backgroundColor: '#eff6ff',
            borderBottom: '1px solid #dbeafe',
            padding: '6px 24px',
            fontSize: '0.75rem',
            color: '#1e40af',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Staff-only Hospital Management System — Enforcing Role-Based Access & Data Integrity</span>
          <span style={{ fontWeight: 600 }}>Development Mode: Using Fictional Test Records Only</span>
        </div>

        {/* Sub-page Outlet */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
