# Hospital Management System (HMS)

This repository contains the project documentation and source code for a staff-only Hospital Management System for one private hospital location.

## Technology stack
- React.js + Vite
- Node.js + Express.js
- MySQL
- Prisma ORM

## Initial departments
1. Reception and patient records
2. Doctors
3. Nurses
4. Laboratory
5. Labour room and maternity
6. Pharmacy
7. Payment and cashier
8. Administration and dashboard

The initial release does not include patient login or a public patient portal.

## Documentation
- `documentation/SRS.md` — Software Requirements Specification.
- `documentation/SYSTEM_DESIGN.md` — Architecture and technical design.
- `documentation/WORKFLOWS.md` — Departmental and cross-department workflows.
- `documentation/DATABASE_DESIGN.md` — Conceptual data model.
- `documentation/DEVELOPMENT_ROADMAP.md` — Phased development plan.
- `AGENTS.md` — Instructions for AI coding assistants.

## Important
This documentation is an initial baseline, not a substitute for hospital approval. Confirm workflows, clinical forms, clinical protocols, roles, privacy requirements and record-retention rules with the hospital before operational use.

Use fictional data during development. Do not use real patient records in prompts, screenshots, sample databases or demonstrations.

## Suggested first step
Open this folder in Antigravity IDE. Ask the coding assistant to read `AGENTS.md` and the documentation files, then help you verify the local development environment. Do not ask it to build the entire HMS at once.
