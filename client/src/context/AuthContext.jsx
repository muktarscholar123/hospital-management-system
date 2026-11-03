import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Baseline prototype staff accounts for UI testing (as allowed in Phase 2)
export const PROTOTYPE_USERS = [
  {
    id: 1,
    username: 'admin',
    name: 'Dr. Abubakar Bello (Admin)',
    role: 'HOSPITAL_ADMIN',
    department: 'Administration',
    permissions: ['all'],
  },
  {
    id: 2,
    username: 'receptionist',
    name: 'Fatima Garba',
    role: 'RECEPTIONIST',
    department: 'Reception & Records',
    permissions: ['patients.create', 'patients.read', 'visits.create', 'appointments.manage'],
  },
  {
    id: 3,
    username: 'doctor',
    name: 'Dr. Amina Yusuf',
    role: 'DOCTOR',
    department: 'Consultation & Clinical',
    permissions: ['patients.read', 'consultations.create', 'lab.order', 'prescriptions.create'],
  },
  {
    id: 4,
    username: 'nurse',
    name: 'Nurse Grace Okafor',
    role: 'NURSE',
    department: 'Nursing Station',
    permissions: ['patients.read', 'vitals.create', 'nursing_notes.create'],
  },
  {
    id: 5,
    username: 'lab',
    name: 'Musa Ibrahim',
    role: 'LAB_SCIENTIST',
    department: 'Laboratory',
    permissions: ['lab.read', 'lab.enter_result', 'lab.verify_result'],
  },
  {
    id: 6,
    username: 'maternity',
    name: 'Midwife Maryam Aliyu',
    role: 'MIDWIFE',
    department: 'Labour Room & Maternity',
    permissions: ['maternity.read', 'maternity.create_episode', 'maternity.deliveries'],
  },
  {
    id: 7,
    username: 'pharmacy',
    name: 'Pharm. Emeka Okonkwo',
    role: 'PHARMACIST',
    department: 'Pharmacy',
    permissions: ['pharmacy.read', 'pharmacy.dispense', 'inventory.manage'],
  },
  {
    id: 8,
    username: 'cashier',
    name: 'Zainab Danladi',
    role: 'CASHIER',
    department: 'Billing & Cashier',
    permissions: ['billing.read', 'payments.create', 'receipts.print'],
  },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hms_staff_user');
    return saved ? JSON.parse(saved) : PROTOTYPE_USERS[0]; // Default to admin for prototyping
  });

  const login = async (username, password) => {
    // In Phase 2 prototype, match from prototype accounts; in Phase 4 connects to POST /api/v1/auth/login
    const found = PROTOTYPE_USERS.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (!found) {
      throw new Error('Invalid username or password. (For testing, try: admin, doctor, nurse, receptionist, lab, pharmacy, cashier, maternity)');
    }
    setCurrentUser(found);
    localStorage.setItem('hms_staff_user', JSON.stringify(found));
    return found;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hms_staff_user');
  };

  const hasRole = (role) => {
    if (!currentUser) return false;
    if (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'HOSPITAL_ADMIN') return true;
    return currentUser.role === role;
  };

  const hasPermission = (perm) => {
    if (!currentUser) return false;
    if (currentUser.permissions?.includes('all')) return true;
    return currentUser.permissions?.includes(perm);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, hasRole, hasPermission, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
