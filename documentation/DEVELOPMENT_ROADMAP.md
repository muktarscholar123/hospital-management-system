# HMS Development Roadmap

**Version:** 1.0  
**Approach:** Build and verify one foundation at a time.

---

## Phase 1 — Requirements and project foundation
- Review SRS with hospital representatives.
- Confirm departments, roles, patient journey and forms.
- Confirm clinical and financial approval owners.
- Set up Git repository and project folders.
- Install Node.js, npm, MySQL and required development tools.
- Create a development database using fictional data.

**Exit condition:** Project runs locally and the approved requirements baseline is available.

## Phase 2 — UI/UX foundation
- Create a staff login screen.
- Create a protected application layout.
- Create role-aware navigation.
- Build reusable buttons, form fields, tables, dialogs and status indicators.
- Create initial dashboard layout with sample data only.

**Exit condition:** Staff can navigate a prototype; no real patient information is used.

## Phase 3 — Database and backend foundation
- Confirm conceptual data model.
- Create Prisma schema and first migration.
- Add environment configuration.
- Build Express application structure.
- Add request validation, error handling and API conventions.
- Add health-check endpoint.

**Exit condition:** Backend connects to development MySQL and migrations work.

## Phase 4 — Authentication and permissions
- Implement staff login/logout.
- Implement password hashing and secure session management.
- Implement users, roles and permissions.
- Add backend permission middleware.
- Test that forbidden API requests are rejected.

**Exit condition:** Role and permission tests pass.

## Phase 5 — Reception and patient records
- Patient registration and search.
- Duplicate warning process.
- Patient profile and contact information.
- Visit creation and appointment scheduling.
- Basic work queue.

**Exit condition:** Reception workflow passes test scenarios.

## Phase 6 — Nursing and doctors
- Triage and observations.
- Nursing notes.
- Consultation notes and diagnosis/assessment.
- Care plan and follow-up.
- Clinical record amendment workflow.

**Exit condition:** Clinical entries are linked to the correct patient and visit and are access-controlled.

## Phase 7 — Laboratory
- Test catalogue.
- Laboratory order queue.
- Sample and processing status.
- Result entry, verification and release.
- Result visibility to authorised clinicians.

**Exit condition:** End-to-end lab request and result workflow passes.

## Phase 8 — Pharmacy and inventory
- Medicine catalogue.
- Prescription queue.
- Dispensing.
- Stock batches and stock transactions.
- Low-stock and expiry reports.

**Exit condition:** Dispensing and inventory reconciliation tests pass.

## Phase 9 — Cashier and billing
- Service catalogue and pricing.
- Invoices and invoice items.
- Full and partial payments.
- Receipts and balances.
- Reversals, refunds and approval rules.
- Daily cashier summary.

**Exit condition:** Payment and balance tests pass, including duplicate-submit and network-retry scenarios.

## Phase 10 — Labour room and maternity
- Pregnancy episodes.
- Antenatal and obstetric history.
- Labour records and approved chart fields.
- Maternal and fetal observations.
- Delivery and multiple newborns.
- Postnatal monitoring and discharge.
- Strict maternity permissions.

**Exit condition:** Maternity staff validate the forms and workflow using fictional scenarios.

## Phase 11 — Administration, reports and notifications
- Staff and department administration.
- Approved system settings.
- Operational dashboards.
- Departmental notifications.
- Audit review and reports.

**Exit condition:** Reports are permission-controlled and reconciled with source records.

## Phase 12 — Testing, security and deployment preparation
- Unit and integration tests.
- Permission and privacy tests.
- User acceptance testing with departmental representatives.
- Performance testing with representative test data.
- Backup and restore test.
- Security review.
- Staff training materials.
- Deployment and incident-response plan.

**Exit condition:** Written approval for a limited pilot.

## Phase 13 — Controlled pilot and rollout
- Deploy to a secured environment.
- Start with a limited group of trained users.
- Monitor errors, access logs and feedback.
- Fix issues and retest.
- Expand only after management approval.

Do not use the prototype for live clinical decisions or official patient records until the hospital has completed security, privacy, clinical workflow and operational approvals.

---

## Recommended implementation order

Even though maternity is an important first-release module, build the shared patient, visit, authentication and audit foundations first. Maternity depends on those shared records and permissions.

Recommended order:
1. Project foundation
2. Authentication and RBAC
3. Patients and visits
4. Reception
5. Nurses
6. Doctors
7. Laboratory
8. Pharmacy
9. Cashier
10. Labour room and maternity
11. Administration and reports
12. Security, testing and deployment

## Working method for each feature

For every feature:
1. Read the relevant SRS requirement.
2. Confirm the workflow.
3. Design the database change.
4. Create a Prisma migration.
5. Build backend validation, service and API.
6. Add backend permission checks.
7. Write tests.
8. Build the React interface.
9. Test with fictional data.
10. Update documentation.

Avoid asking an AI coding assistant to generate the entire HMS in one prompt. Build one small, testable feature at a time.
