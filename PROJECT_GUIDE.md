# HMS Project & Code Architecture Guide

This document is an ongoing guide for developers and contributors, explaining the project structure, what each file and folder does, and how the codebase works together.

---

## 1. Project Overview & Technology Stack

The Hospital Management System (HMS) is a staff-only web application designed for a private hospital location. It coordinates clinical, administrative, and financial activities across 8 initial hospital departments.

- **Frontend**: React.js bundled with Vite for fast local development and modern UI rendering.
- **Backend**: Node.js with Express.js providing secure, RESTful API endpoints.
- **Database**: MySQL 8.0 relational database managed via Prisma ORM for structured migrations and queries.
- **Security & Privacy**: Backend-enforced Role-Based Access Control (RBAC), immutable audit logging, and no client-side direct database access.

---

## 2. Directory & File Reference

Here is the current map of the repository and what each item does:

### Root Level
- **`README.md`**: Project overview, technology summary, and quick-start instructions.
- **`AGENTS.md`**: Core engineering rules, coding standards, and safety guidelines for developers and AI assistants (e.g. no inventing medical protocols, atomic transactions for financial data).
- **`PROJECT_GUIDE.md`**: This file! A living guide documenting all files, architecture, and learning notes.
- **`.gitignore`**: Tells Git which files to never track (such as `node_modules/`, `.env` files containing database passwords, and build artifacts).

### `documentation/`
Contains the system's foundational specifications and engineering plans:
- **`SRS.md` (Software Requirements Specification)**: Detailed functional requirements (AUTH, REC, VIS, NUR, DOC, LAB, PHARM, PAY, MAT, ADM) and non-functional requirements (security, privacy, performance).
- **`SYSTEM_DESIGN.md`**: Technical architecture specification, request lifecycles, API conventions, and security boundaries.
- **`WORKFLOWS.md`**: Step-by-step patient journey and cross-department handoffs (e.g. Doctor -> Lab -> Doctor, Doctor -> Pharmacy, Billing -> Cashier).
- **`DATABASE_DESIGN.md`**: Conceptual entities, relationships, foreign keys, transaction requirements, and audit principles.
- **`DEVELOPMENT_ROADMAP.md`**: The 13-phase roadmap outlining step-by-step delivery from project foundation to production pilot.

### `server/` (Backend Application)
- **`package.json`**: Manages backend dependencies (`express`, `cors`, `dotenv`, `@prisma/client`, and `prisma`).
- **`.env.example`**: Safe configuration template showing expected environment variables (`PORT`, `DATABASE_URL`).
- **`.env`** *(ignored by git)*: Local configuration containing the actual credentials for connecting to MySQL.
- **`prisma/schema.prisma`**: The single source of truth for the database schema. Defines models, fields, types, foreign keys, and indexes for all 46 tables across the hospital departments.
- **`prisma/migrations/`**: Auto-generated SQL migration files tracking every change to the database structure.
- **`src/config/prisma.js`**: Instantiates and exports a single shared PrismaClient connection for database queries.
- **`src/app.js`**: Configures Express, CORS, JSON request parsing, error handling, and the `/api/v1/health` status route.
- **`src/server.js`**: Boots the Express server and starts listening on port 5000.

### `client/` (Frontend Application)
- **`package.json`**: Frontend package configuration including `react`, `react-dom`, `vite`, and `lucide-react`.
- **`vite.config.js`**: Vite configuration enabling React and setting up a development proxy (`/api` -> `http://localhost:5000`) so the frontend can seamlessly call the backend without CORS issues.
- **`index.html`**: The HTML shell for the single-page application where React mounts into `#root`.
- **`src/main.jsx`**: Initializes React and renders the root component into the DOM.
- **`src/index.css`**: Base CSS styles, color palette, and layout styling.
- **`src/App.jsx`**: The root dashboard component that actively pings the backend `/api/v1/health` endpoint and displays live status for the frontend, Express backend, and MySQL database.

---

## 3. Database Schema Overview (46 Tables Migrated)

The initial Prisma migration has established all tables and foreign key relationships according to the SRS:

1. **Staff & RBAC**: `users`, `staff_profiles`, `departments`, `roles`, `permissions`, `user_roles`, `role_permissions`, `user_departments`.
2. **Reception & Visits**: `patients`, `patient_contacts`, `visits`, `appointments`, `admissions`.
3. **Nursing & Doctors**: `observations` (vitals), `consultations`, `diagnoses`, `care_plans`, `record_amendments`.
4. **Laboratory**: `lab_test_catalogue`, `lab_orders`, `lab_order_items`, `lab_samples`, `lab_results`.
5. **Pharmacy & Inventory**: `medicines`, `stock_batches`, `stock_transactions`, `prescriptions`, `prescription_items`, `dispensing_records`.
6. **Cashier & Billing**: `service_catalogue`, `invoices`, `invoice_items`, `payments`, `financial_adjustments`.
7. **Labour Room & Maternity**: `pregnancy_episodes`, `antenatal_records`, `obstetric_histories`, `labour_episodes`, `labour_observations`, `deliveries`, `newborns` (supports multiple births), `postnatal_observations`, `maternity_discharges`.
8. **Audit & Settings**: `audit_logs`, `system_settings`.

---

## 4. How to Run Locally

### Start Backend:
```bash
cd server
npm run dev
# Server will listen on http://localhost:5000
```

### Start Frontend:
```bash
cd client
npm run dev
# Frontend will listen on http://localhost:5173
```
