# Software Requirements Specification (SRS)
## Hospital Management System (HMS)

**Document version:** 1.0  
**Status:** Initial project baseline  
**System type:** Internal, staff-only web application  
**Initial deployment target:** One private hospital location  
**Technology stack:** React.js, Vite, Node.js, Express.js, MySQL, Prisma ORM

---

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for the Hospital Management System (HMS). It is the baseline reference for requirements analysis, design, implementation, testing and acceptance.

The HMS will support the hospital's daily administrative and clinical operations through a shared patient and visit record, departmental workspaces, controlled access, and auditable transactions.

### 1.2 Scope
The initial release is for authorised hospital employees and approved contractors. It is not a public patient portal. Patients will not sign in to the system in the initial release.

The system will initially support:
1. Administration and system dashboard
2. Reception and patient records
3. Doctors' workspace
4. Nurses' station
5. Laboratory
6. Labour room and maternity
7. Pharmacy
8. Payment and cashier

Supporting capabilities include staff accounts, role-based access control, appointments, notifications, audit logs, reports, system settings and database backup procedures.

### 1.3 Goals
- Maintain a reliable, searchable central patient record.
- Reduce repeated manual entry and avoid duplicate patient records.
- Coordinate patient visits and requests between departments.
- Improve visibility of outstanding tasks, orders, results, prescriptions and payments.
- Restrict clinical and financial information to authorised staff.
- Maintain traceable records of important actions and corrections.
- Provide useful operational reports without exposing unnecessary patient details.

### 1.4 Out of scope for the initial release
The following are not included in the first release unless formally approved as a change:
- Patient-facing portal or patient mobile application.
- Telemedicine and video consultations.
- Multi-hospital or multi-branch operation.
- Full accounting, payroll and human-resources systems.
- Radiology/PACS integration.
- HMO/insurance claims integration.
- Ambulance fleet management.
- Automated diagnosis, treatment recommendations or autonomous clinical decisions.
- Direct integration with external government or health-information systems.

These may be considered in later releases.

### 1.5 Definitions
- **HMS:** Hospital Management System.
- **Patient:** A person receiving or seeking care.
- **Visit/Encounter:** A specific outpatient or emergency interaction with the hospital.
- **Admission:** A period in which a patient is formally admitted for care.
- **RBAC:** Role-Based Access Control.
- **Audit log:** A protected record of who performed an action, when, and what record was affected.
- **Clinical order:** A request for a service such as a laboratory test.
- **Verified result:** A laboratory result reviewed and authorised by an appropriately authorised staff member.
- **Maternity episode/pregnancy:** A distinct pregnancy record associated with a patient; previous pregnancies must remain preserved.

---

## 2. Users and roles

The system shall support role-based permissions. A user's role, department and any additional approved permission determine what they can view or do. Permissions must be enforced by the backend API, not merely by hiding frontend controls.

| Role | Main responsibilities | Typical access |
|---|---|---|
| Super Administrator | Technical configuration and platform administration | User and system administration; access subject to audit and least privilege |
| Hospital Administrator | Hospital operations and oversight | Operational dashboards, staff administration and approved reports |
| Receptionist / Records Officer | Patient search, registration, visits and appointments | Demographic and administrative information; limited clinical visibility |
| Doctor | Consultation, diagnosis, care plan, orders and review | Clinical records for patients under their care or otherwise authorised |
| Nurse | Triage, vital signs, nursing notes and care tasks | Nursing and relevant clinical records |
| Midwife / Maternity Staff | Antenatal, labour, delivery and postnatal records | Authorised maternity records |
| Laboratory Scientist | Receive requests, record and verify laboratory results | Laboratory orders and relevant patient identifiers/clinical details |
| Pharmacist | Review prescriptions, dispense and manage medicine stock | Prescriptions, dispensing and pharmacy inventory |
| Cashier | Charges, payments, receipts and balances | Financial records and minimum identifying information |
| Auditor / Read-only Reviewer (optional) | Review approved records and audit activity | Read-only access explicitly granted by administration |

A single staff member may have more than one role only when approved by hospital management. The system must record role assignments and changes.

---

## 3. Overall system description

### 3.1 Product perspective
The HMS is a browser-based web application with:
- A React frontend used by staff.
- A Node.js/Express backend that exposes authenticated APIs.
- A MySQL relational database.
- A Prisma data-access layer.
- Central authentication, authorisation and audit services.

The frontend must not connect directly to MySQL. All data access must pass through the backend.

### 3.2 Operating environment
- Ubuntu or another supported Linux server environment.
- Current supported desktop browsers on staff computers.
- Hospital local network for on-site use.
- Remote access only through an approved secure method such as VPN, with HTTPS.
- MySQL must not be exposed directly to the public internet.

### 3.3 Design constraints
- Initial release supports one hospital location.
- The application must be modular so new departments can be added.
- Clinical and financial records require strict access controls.
- The system must support traceability of important changes.
- The interface must remain usable on common desktop and laptop screens.
- Development and testing must use fictional or properly de-identified data, not live patient data.

### 3.4 Assumptions and dependencies
- Hospital management will nominate authorised users and approve role definitions.
- The hospital will provide its official workflows, forms, service catalogue, medicine list and clinical protocols.
- Clinical staff will validate clinical forms and workflow before operational use.
- The hospital will provide a secured server, network, backup storage and operational support before deployment.
- Legal, privacy and records-retention requirements will be reviewed with appropriate Nigerian advisers and hospital management.

---

## 4. Functional requirements

Requirements are assigned IDs so they can be traced into implementation and testing.

### 4.1 Authentication and staff management
- **AUTH-01:** The system shall require staff authentication before access to protected functions.
- **AUTH-02:** Administrators shall be able to create, activate, deactivate and update staff accounts.
- **AUTH-03:** Each staff account shall have an assigned role and, where applicable, department.
- **AUTH-04:** The system shall support secure password change and administrator-assisted reset.
- **AUTH-05:** The system shall enforce session expiry and logout.
- **AUTH-06:** The system shall rate-limit or otherwise protect login endpoints against repeated attempts.
- **AUTH-07:** The system shall record successful and failed authentication events.
- **AUTH-08:** Deactivated staff shall no longer be able to authenticate.
- **AUTH-09:** The system shall not store plaintext passwords.

### 4.2 Patient records and reception
- **REC-01:** Authorised reception staff shall be able to register a patient.
- **REC-02:** The system shall generate a unique patient identifier.
- **REC-03:** Staff shall be able to search for an existing patient using approved identifiers and demographic search fields.
- **REC-04:** The system shall warn about possible duplicate records before creating a new patient.
- **REC-05:** Authorised staff shall be able to update patient demographics, with changes audited.
- **REC-06:** Reception shall be able to create an outpatient visit or initiate an approved emergency/direct-admission workflow.
- **REC-07:** Reception shall be able to record appointment date, time, service/department and status.
- **REC-08:** A patient may have multiple visits over time; prior visits must remain available according to permissions.
- **REC-09:** Reception shall see only the minimum clinical information required for its duties.
- **REC-10:** The system shall support patient contact and next-of-kin details where collected and approved.

### 4.3 Visit and patient flow management
- **VIS-01:** The system shall create a unique visit/encounter record for each care episode.
- **VIS-02:** A visit shall be linked to the correct patient.
- **VIS-03:** The system shall support configurable visit statuses, such as registered, awaiting triage, awaiting consultation, awaiting investigation, awaiting payment, completed and cancelled.
- **VIS-04:** The workflow shall not force every patient through the same sequence.
- **VIS-05:** The system shall support emergency attendance and direct admission without requiring a normal appointment workflow.
- **VIS-06:** A patient may interact with multiple departments during one visit.
- **VIS-07:** Staff shall be able to see relevant work queues based on their role and department.
- **VIS-08:** A visit shall be closed only by an authorised role and according to hospital policy.

### 4.4 Nurses' station
- **NUR-01:** Authorised nurses shall be able to record triage information and vital signs.
- **NUR-02:** The system shall record the staff member, date and time for each observation.
- **NUR-03:** The system shall support configurable observation fields approved by the hospital.
- **NUR-04:** Nurses shall be able to record nursing notes and relevant care activities.
- **NUR-05:** Corrections to signed or finalised nursing entries shall preserve the original entry and record the correction author, time and reason.
- **NUR-06:** The system shall display relevant alerts or due tasks only when configured and clinically approved.
- **NUR-07:** The system shall not independently diagnose, prescribe or make clinical decisions.

### 4.5 Doctors' workspace
- **DOC-01:** Authorised doctors shall be able to view patients and visits they are permitted to access.
- **DOC-02:** Doctors shall be able to record consultation notes.
- **DOC-03:** Doctors shall be able to record diagnosis and assessment using hospital-approved terminology or free text as configured.
- **DOC-04:** Doctors shall be able to record a treatment or care plan.
- **DOC-05:** Doctors shall be able to request laboratory tests.
- **DOC-06:** Doctors shall be able to create prescriptions.
- **DOC-07:** Doctors shall be able to review verified laboratory results linked to their orders or authorised patient care.
- **DOC-08:** The system shall retain authorship and timestamps for clinical entries.
- **DOC-09:** Finalised clinical entries shall not be silently overwritten or deleted.
- **DOC-10:** Doctors shall be able to document follow-up instructions and referrals.

### 4.6 Laboratory
- **LAB-01:** Laboratory staff shall see incoming laboratory requests in a departmental queue.
- **LAB-02:** Each request shall be linked to a patient, visit, ordering clinician and requested test.
- **LAB-03:** Laboratory staff shall be able to update request status, such as received, sample collected, processing, awaiting verification, verified, released or cancelled.
- **LAB-04:** Authorised staff shall be able to record sample details and test results.
- **LAB-05:** The system shall support test-specific result fields, units and reference ranges configured and approved by the laboratory.
- **LAB-06:** Only authorised personnel shall verify and release results.
- **LAB-07:** The ordering doctor and other authorised clinicians shall be able to view released results.
- **LAB-08:** Changes to a verified or released result shall require a correction workflow and audit trail.
- **LAB-09:** The system shall record who entered, verified and released each result.
- **LAB-10:** The system shall not interpret results or make diagnoses automatically in the initial release.

### 4.7 Pharmacy
- **PHARM-01:** Pharmacy staff shall see prescriptions in a dispensing queue.
- **PHARM-02:** Each prescription shall be linked to the patient, visit and prescribing clinician.
- **PHARM-03:** The system shall capture medicine, strength, dosage instructions, route, frequency, duration and quantity where applicable.
- **PHARM-04:** Authorised pharmacists shall record dispensing status and quantity dispensed.
- **PHARM-05:** The system shall maintain medicine stock balances.
- **PHARM-06:** Dispensing shall update stock through a traceable stock transaction.
- **PHARM-07:** The system shall support stock receipts, adjustments, returns, expiry dates and low-stock indicators where configured.
- **PHARM-08:** Stock adjustments shall require an authorised user and a reason.
- **PHARM-09:** The system shall not allow unauthorised users to change prescriptions or stock balances.

### 4.8 Payment and cashier
- **PAY-01:** The system shall record charges associated with a patient and, where applicable, a visit.
- **PAY-02:** The system shall support payments, partial payments and outstanding balances.
- **PAY-03:** The system shall generate a unique receipt/reference number for each payment.
- **PAY-04:** The system shall record payment method, amount, date/time and cashier.
- **PAY-05:** The system shall support configurable service prices and charge items.
- **PAY-06:** The system shall support approved discounts, waivers or adjustments with authorisation and reasons.
- **PAY-07:** The system shall not silently delete or rewrite financial transactions; reversals and corrections shall be traceable.
- **PAY-08:** Cashiers shall not have unrestricted access to clinical notes.
- **PAY-09:** The system shall provide patient account statements and daily cashier summaries to authorised users.
- **PAY-10:** Insurance/HMO workflows are deferred unless added through an approved change.

### 4.9 Labour room and maternity
- **MAT-01:** Authorised maternity staff shall be able to create a distinct pregnancy/maternity episode for a patient.
- **MAT-02:** The system shall preserve previous pregnancy episodes and shall never overwrite them when a new pregnancy is created.
- **MAT-03:** The system shall record antenatal history and relevant pregnancy/obstetric history.
- **MAT-04:** The system shall support maternity admission and discharge records.
- **MAT-05:** The system shall support labour progress observations and hospital-approved labour charts.
- **MAT-06:** The system shall record maternal vital signs.
- **MAT-07:** The system shall record fetal heart rate observations where required by the hospital's protocol.
- **MAT-08:** The system shall record delivery details and birth outcome.
- **MAT-09:** The system shall support more than one newborn linked to a single delivery, including twins or higher-order multiple births.
- **MAT-10:** The system shall record newborn details and post-delivery observations as approved by the hospital.
- **MAT-11:** The system shall support post-delivery maternal monitoring and discharge documentation.
- **MAT-12:** Access shall be restricted to authorised maternity staff and treating clinicians.
- **MAT-13:** Reception and cashier users shall see only minimum necessary administrative or billing information.
- **MAT-14:** Observation schedules, warning thresholds and escalation procedures shall be configurable only from hospital-approved protocols.
- **MAT-15:** The system shall not independently diagnose, recommend treatment or make clinical decisions.

### 4.10 Administration and dashboard
- **ADM-01:** Authorised administrators shall see operational summaries appropriate to their permissions.
- **ADM-02:** Dashboard figures shall be derived from recorded system data and clearly identify their date range.
- **ADM-03:** Administrators shall manage approved service lists, departments, staff and selected system settings.
- **ADM-04:** Access to sensitive reports shall be permission-controlled.
- **ADM-05:** The system shall provide audit-log search to authorised reviewers.
- **ADM-06:** Administrative access to clinical records shall be limited to legitimate, approved purposes and audited.

### 4.11 Notifications and work queues
- **NOT-01:** The system shall show relevant pending tasks to authorised departmental users.
- **NOT-02:** A new laboratory request shall appear in the laboratory queue.
- **NOT-03:** A verified/released laboratory result shall become available to authorised ordering clinicians.
- **NOT-04:** A new prescription shall appear in the pharmacy queue.
- **NOT-05:** A dispensing transaction shall update pharmacy stock.
- **NOT-06:** Notifications shall not expose sensitive patient details unnecessarily.
- **NOT-07:** The initial release may use in-app notifications; real-time push updates may be added after core workflows are stable.

### 4.12 Audit and record integrity
- **AUD-01:** The system shall record important create, update, view, verify, release, dispense, payment, reversal and permission-change events as appropriate.
- **AUD-02:** Audit records shall include actor, action, record type/identifier, timestamp and relevant change metadata.
- **AUD-03:** Audit records shall be protected against ordinary user modification.
- **AUD-04:** The system shall preserve prior values or version history for high-impact clinical and financial changes.
- **AUD-05:** The system shall record the reason for corrections, reversals and authorised overrides.
- **AUD-06:** Audit-log access shall be restricted.

### 4.13 Reports
- **REP-01:** Authorised users shall be able to generate operational reports within their permissions.
- **REP-02:** Reports shall support date-range filtering where appropriate.
- **REP-03:** Reports may include patient attendance, appointments, laboratory workload, pharmacy stock, revenue and outstanding balances.
- **REP-04:** Reports shall minimise patient-identifiable information unless that information is required for the user's role.
- **REP-05:** Export functions shall be permission-controlled and audited.

---

## 5. External interface requirements

### 5.1 User interface
- The application shall provide a staff login screen.
- The interface shall present navigation according to the user's permissions.
- Departmental pages shall show relevant queues and actions.
- Forms shall use clear labels, validation messages and confirmation for high-impact actions.
- The interface shall display loading, empty, success and error states.
- Destructive or irreversible actions shall require appropriate confirmation and authorisation.

### 5.2 Software interfaces
- React frontend communicates with Express APIs over HTTPS in production.
- Express communicates with MySQL through Prisma.
- API requests and responses shall use JSON unless a specific file/export format is required.
- API errors shall use consistent response structures and appropriate HTTP status codes.

### 5.3 Hardware interfaces
The initial release requires ordinary staff computers and a secured server. Printers or barcode scanners may be integrated later after requirements are confirmed.

---

## 6. Non-functional requirements

### 6.1 Security and privacy
- **NFR-SEC-01:** All protected endpoints shall require authentication.
- **NFR-SEC-02:** The backend shall enforce role and resource-level authorisation.
- **NFR-SEC-03:** Production traffic shall use HTTPS.
- **NFR-SEC-04:** Passwords shall be stored using a modern password-hashing algorithm such as Argon2id or bcrypt with appropriate parameters.
- **NFR-SEC-05:** Secrets and database credentials shall be stored outside source code in protected environment configuration.
- **NFR-SEC-06:** The system shall validate and sanitise input and use parameterised database access through Prisma.
- **NFR-SEC-07:** Sessions/cookies or tokens shall be implemented with secure expiry, rotation and storage practices.
- **NFR-SEC-08:** The system shall protect against common web vulnerabilities, including injection, cross-site scripting, cross-site request forgery where applicable, broken access control and insecure file uploads.
- **NFR-SEC-09:** Sensitive data shall be encrypted in transit and protected at rest through appropriate server, disk and backup controls.
- **NFR-SEC-10:** Staff shall only access information needed for their duties.
- **NFR-SEC-11:** The system shall automatically log out or require re-authentication after a configurable period of inactivity.
- **NFR-SEC-12:** Production database ports shall not be publicly exposed.

### 6.2 Reliability and availability
- The system shall handle expected departmental concurrent use without corrupting records.
- Database transactions shall be used for operations that must succeed or fail together, such as payment posting and stock deduction.
- The system shall provide documented backup and restore procedures.
- The hospital shall define acceptable recovery-point and recovery-time objectives before production deployment.

### 6.3 Performance
- Common screens should load within an agreed target under normal hospital network conditions.
- Search and list endpoints shall use pagination and appropriate database indexes.
- Large reports shall not block ordinary clinical workflows.
- Performance targets shall be measured with realistic test data before acceptance.

### 6.4 Usability and accessibility
- Forms shall be understandable to staff with basic computer skills.
- Common tasks shall require as few steps as practical without sacrificing safety.
- Date, time, currency and measurement formats shall be consistent and configurable.
- The interface should support keyboard navigation and readable contrast.

### 6.5 Maintainability
- Code shall be separated into modules by business domain.
- API routes, controllers, services, validation schemas and database models shall have clear responsibilities.
- The project shall use version control.
- Changes to the database schema shall be made through Prisma migrations.
- Automated tests shall cover critical business rules and permissions.

### 6.6 Scalability
The first release is for one hospital location. The architecture should allow future departments and additional locations without requiring a complete rewrite, but multi-branch functionality is not a first-release requirement.

---

## 7. Core business rules

1. Every patient must have one unique patient identifier.
2. A patient may have many visits, admissions, prescriptions, laboratory requests and payments.
3. Every visit must belong to one patient.
4. Clinical orders and results must be linked to the correct patient and visit.
5. Only authorised staff may create, verify or release laboratory results.
6. A prescription must identify the prescribing clinician and patient.
7. Pharmacy stock changes must be represented by stock transactions.
8. A payment must be traceable to the patient and, where applicable, the visit or invoice.
9. Partial payments must not erase the outstanding balance.
10. Corrections to finalised clinical or financial records must preserve the original information and record the correction.
11. Each pregnancy is a separate maternity episode; earlier pregnancies remain unchanged and accessible according to permissions.
12. One delivery may have multiple newborn records.
13. Emergency and direct-admission workflows must not be blocked by routine appointment or payment steps.
14. The system supports staff workflows; it does not replace clinical judgement or hospital-approved protocols.

---

## 8. Acceptance criteria for the initial release

The initial release may be considered ready for controlled pilot testing when:
- Staff can sign in and are restricted to their assigned permissions.
- Administrators can create and deactivate staff accounts.
- Reception can find/register patients and create visits without routinely duplicating records.
- Nurses can record and retrieve observations.
- Doctors can document consultations and create laboratory requests and prescriptions.
- Laboratory staff can process, verify and release results, which become visible to authorised clinicians.
- Pharmacy staff can dispense prescriptions and stock transactions update inventory correctly.
- Cashiers can post full and partial payments, issue receipts and view balances.
- Maternity staff can create separate pregnancy episodes, record labour and delivery, and register multiple newborns.
- Important changes and transactions appear in audit records.
- Backup and restore have been tested.
- Security and workflow tests have been completed using fictional test data.
- Hospital representatives have reviewed and approved the workflows and clinical forms.

---

## 9. Risks and controls

| Risk | Control |
|---|---|
| Unauthorised access to patient information | RBAC, least privilege, secure authentication, audit logs |
| Duplicate patient records | Search-before-create, duplicate warning and authorised merge process |
| Incorrect clinical data | Validation, clear authorship, correction history and clinical review |
| Incorrect billing or stock balances | Database transactions, immutable transaction history and reconciliation |
| Data loss | Scheduled backups, off-site/isolated backup copy and restore testing |
| Unsafe clinical automation | No autonomous diagnosis or treatment decisions; hospital-approved protocols |
| Unapproved changes in scope | Change request and approval process |
| Staff resistance or workflow mismatch | Staff consultation, pilot testing, training and feedback |

---

## 10. Change control
Any change to scope, workflows, roles, clinical forms, data fields or integrations should be documented with:
- Change description and reason.
- Affected requirements and modules.
- Privacy, security and clinical-safety impact.
- Approval by the appropriate hospital representative.
- Updated documentation and tests.

---

## 11. Open questions requiring hospital confirmation
These questions must be answered before the relevant modules are finalised:
1. What patient identifier format is already used by the hospital?
2. What exact departments and service points operate at the hospital?
3. What are the hospital's approved outpatient, emergency and admission workflows?
4. Which vital signs and nursing observations are required?
5. Which maternity forms, labour charts and escalation protocols are officially used?
6. What laboratory tests, result fields, units and reference ranges are required?
7. What medicine catalogue, stock units and dispensing rules are used?
8. What payment methods, receipt formats, service prices and approval limits apply?
9. What staff roles and permission boundaries does management approve?
10. What data-retention, backup, recovery and incident-response policies apply?
11. What local network and remote-access arrangements will be provided?
12. Who will approve clinical forms and sign off each department's acceptance tests?
