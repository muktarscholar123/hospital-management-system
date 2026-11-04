import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

import DashboardHome from '../modules/dashboard/DashboardHome';
import ReceptionView from '../modules/reception/ReceptionView';
import DoctorsView from '../modules/doctors/DoctorsView';
import NursesView from '../modules/nurses/NursesView';
import LaboratoryView from '../modules/laboratory/LaboratoryView';
import MaternityView from '../modules/labour-room/MaternityView';
import PharmacyView from '../modules/pharmacy/PharmacyView';
import CashierView from '../modules/cashier/CashierView';
import AdminView from '../modules/admin/AdminView';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Authentication Route */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Staff Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardHome />} />

          {/* Departmental Workspaces with Role-Based Access Control */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'RECEPTIONIST']} />}>
            <Route path="/reception" element={<ReceptionView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR']} />}>
            <Route path="/doctors" element={<DoctorsView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'NURSE']} />}>
            <Route path="/nurses" element={<NursesView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'LAB_SCIENTIST', 'DOCTOR']} />}>
            <Route path="/laboratory" element={<LaboratoryView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'MIDWIFE', 'DOCTOR']} />}>
            <Route path="/maternity" element={<MaternityView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'PHARMACIST']} />}>
            <Route path="/pharmacy" element={<PharmacyView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN', 'CASHIER']} />}>
            <Route path="/cashier" element={<CashierView />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOSPITAL_ADMIN']} />}>
            <Route path="/admin" element={<AdminView />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

