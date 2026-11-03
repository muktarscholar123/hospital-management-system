# HMS Project & Code Architecture Guide

This document is an ongoing guide for developers and contributors, explaining the project structure, what each file and folder does, and how the codebase works together.

---

## 1. Project Overview & Technology Stack

The Hospital Management System (HMS) is a staff-only web application designed for a private hospital location. It coordinates clinical, administrative, and financial activities across 8 initial hospital departments.

- **Frontend**: React.js 18 bundled with Vite, styled with custom modular UI components, routed with React Router DOM v6, and iconography with Lucide React.
- **Backend**: Node.js with Express.js providing secure, RESTful API endpoints.
- **Database**: MySQL 8.0 relational database managed via Prisma ORM for structured migrations and queries.
- **Security & Privacy**: Backend-enforced Role-Based Access Control (RBAC), immutable audit logging, and no client-side direct database access.

---

## 2. Directory & File Reference

Here is the current map of the repository and what each item does:

### Root Level
- **`README.md`**: Project overview, technology summary, and quick-start instructions.
- **`AGENTS.md`**: Core engineering rules, coding standards, and safety guidelines for developers and AI assistants.
- **`PROJECT_GUIDE.md`**: This file! A living guide documenting all files, architecture, and learning notes.
- **`.gitignore`**: Tells Git which files to never track (`node_modules/`, `.env` files, build artifacts).

### `documentation/`
Contains the system's foundational specifications and engineering plans:
- **`SRS.md`**: Detailed functional requirements (AUTH, REC, VIS, NUR, DOC, LAB, PHARM, PAY, MAT, ADM) and non-functional requirements.
- **`SYSTEM_DESIGN.md`**: Technical architecture specification, request lifecycles, API conventions, and security boundaries.
- **`WORKFLOWS.md`**: Step-by-step patient journey and cross-department handoffs.
- **`DATABASE_DESIGN.md`**: Conceptual entities, relationships, foreign keys, transaction requirements, and audit principles.
- **`DEVELOPMENT_ROADMAP.md`**: The 13-phase roadmap outlining step-by-step delivery.

### `server/` (Backend Application)
- **`package.json`**: Backend dependencies (`express`, `cors`, `dotenv`, `@prisma/client`, and `prisma`).
- **`.env.example`**: Safe configuration template (`PORT`, `DATABASE_URL`).
- **`.env`** *(ignored by git)*: Local configuration containing the actual credentials for connecting to MySQL.
- **`prisma/schema.prisma`**: Single source of truth for the database schema. Defines all 46 tables across the hospital departments.
- **`prisma/migrations/`**: Auto-generated SQL migration files tracking every change to the database structure.
- **`src/config/prisma.js`**: Shared PrismaClient connection instance for queries.
- **`src/app.js`**: Configures Express, CORS, JSON request parsing, error handling, and the `/api/v1/health` status route.
- **`src/server.js`**: Boots the Express server on port 5000.

### `client/` (Frontend Application)
- **`package.json`**: Frontend package configuration including `react`, `react-dom`, `react-router-dom`, `vite`, and `lucide-react`.
- **`vite.config.js`**: Vite configuration with reverse proxy (`/api` -> `http://localhost:5000`) for seamless backend communication.
- **`index.html`**: HTML shell mounting React into `#root`.
- **`src/main.jsx`**: Initializes React and renders `<App />` into the DOM.
- **`src/index.css`**: Base CSS typography, reset, and layout styles.
- **`src/App.jsx`**: Root component wrapping `<BrowserRouter>` and `<AuthProvider>` around `<AppRoutes>`.
- **`src/context/AuthContext.jsx`**: Global authentication context managing the logged-in staff member, active role, department, and role permissions. Includes prototype role-switcher for development.
- **`src/services/api.js`**: Standardized fetch wrapper for communicating with Express backend endpoints.
- **`src/layouts/MainLayout.jsx`**: Main protected application layout with top navigation, staff profile, hospital branding, safety banner, and role-aware sidebar navigation.
- **`src/layouts/AuthLayout.jsx`**: Clean, focused layout shell for the staff authentication portal.
- **`src/routes/AppRoutes.jsx`**: Central routing table mapping public and protected routes to departmental components.
- **`src/routes/ProtectedRoute.jsx`**: Guard component verifying authentication and checking role permissions before allowing access to departmental workspaces.

#### Reusable UI Components (`client/src/components/common/`)
- **`Button.jsx`**: Reusable button supporting variants (`primary`, `secondary`, `danger`, `outline`, `ghost`), sizes, and loading spinners.
- **`Input.jsx`**: Standardized form input field with labels, error messages, and helper text.
- **`Card.jsx`**: Container card with header, subtitle, actions, and clean shadows.
- **`Badge.jsx`**: Color-coded status badge for queue states, priority tags, and workflow indicators.
- **`Table.jsx`**: Reusable data table with built-in empty states, loading indicators, and column render functions.
- **`Alert.jsx`**: Message banners (`info`, `success`, `warning`, `error`) for clinical and financial safety rules.
- **`Modal.jsx`**: Accessible dialog overlay for forms and confirmations.

#### Departmental Modules (`client/src/modules/`)
- **`dashboard/DashboardHome.jsx`**: Operational dashboard with live server/DB health status, KPIs, and real-time patient queue.
- **`reception/ReceptionView.jsx`**: Patient search, registration modal with duplicate warning rules (SRS REC-04), and visit queue.
- **`doctors/DoctorsView.jsx`**: Consultation queue, vitals inspection, history of presenting illness, provisional/final diagnoses, lab orders, and prescriptions.
- **`nurses/NursesView.jsx`**: Triage intake queue, structured vital signs recording (temperature, BP, pulse, SpO2, pain score), and nursing notes.
- **`laboratory/LaboratoryView.jsx`**: Test request queues, sample tracking, result entry, reference ranges, and verified result releases.
- **`labour-room/MaternityView.jsx`**: Distinct pregnancy episodes (SRS MAT-01/02), labour observations, and deliveries supporting multiple newborns (twins/triplets).
- **`pharmacy/PharmacyView.jsx`**: Prescription queue, atomic stock transactions (SRS PHARM-06), batch tracking, and low-stock indicators.
- **`cashier/CashierView.jsx`**: Invoices register, partial/full payment posting (SRS PAY-02), and receipt generation.
- **`admin/AdminView.jsx`**: Staff user account management, role assignment, and immutable system audit log inspector.

---

## 3. How to Run Locally

### Terminal 1: Start Backend
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2: Start Frontend
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```
