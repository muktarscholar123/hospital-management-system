# HMS Project & Code Architecture Guide

This document is an ongoing guide for developers and contributors, explaining the project structure, what each file and folder does, and how the codebase works together.

---

## 1. Project Overview & Technology Stack

The Hospital Management System (HMS) is a staff-only web application designed for a private hospital location. It coordinates clinical, administrative, and financial activities across 8 initial hospital departments.

- **Frontend**: React.js bundled with Vite for fast local development and modern UI rendering.
- **Backend**: Node.js with Express.js providing secure, RESTful API endpoints.
- **Database**: MySQL relational database managed via Prisma ORM for structured migrations and queries.
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

---

## 3. Development Roadmap Status

- [x] **Phase 1 (In Progress): Requirements & Project Foundation**
  - [x] Development environment verified (Node.js LTS, npm, MySQL, Git).
  - [x] Git repository initialized and specification baseline organized.
  - [ ] GitHub remote repository connected.
  - [ ] Minimal Express backend skeleton (`server/`) with health check.
  - [ ] Minimal React frontend skeleton (`client/`) with Vite.
  - [ ] Local end-to-end connectivity verified.
- [ ] **Phase 2**: UI/UX Foundation (Login, Layout, Role-aware Navigation).
- [ ] **Phase 3**: Database & Backend Foundation (Prisma schema & migrations).
- [ ] **Phase 4**: Authentication & RBAC.
- [ ] **Phase 5**: Reception & Patient Records.
- [ ] **Phase 6**: Nursing & Doctors.
- [ ] **Phase 7**: Laboratory.
- [ ] **Phase 8**: Pharmacy & Inventory.
- [ ] **Phase 9**: Cashier & Billing.
- [ ] **Phase 10**: Labour Room & Maternity.
- [ ] **Phase 11**: Administration, Dashboards & Reports.
- [ ] **Phase 12**: Automated Testing & Security Review.
- [ ] **Phase 13**: Controlled Pilot Rollout.
