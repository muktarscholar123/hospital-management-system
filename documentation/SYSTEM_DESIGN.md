# HMS System Design and Technical Documentation

**Version:** 1.0  
**Architecture:** Modular monolith  
**Frontend:** React.js + Vite  
**Backend:** Node.js + Express.js  
**Database:** MySQL  
**ORM:** Prisma

---

## 1. Architecture overview

The HMS will use a three-layer architecture:

```text
Staff browser
    |
    | HTTPS / JSON API
    v
React application (client)
    |
    | Authenticated API requests
    v
Node.js + Express API (server)
    |
    | Prisma ORM
    v
MySQL database
```

The browser must never connect directly to MySQL. The Express backend is responsible for authentication, authorisation, validation, business rules, audit logging and database access.

### 1.1 Why a modular monolith?
For one hospital and an early-stage development project, a modular monolith is easier to build, test, deploy and maintain than microservices. Each department will have its own code module while sharing common services and a central database.

### 1.2 Main application modules
- Authentication and staff
- Patient records and reception
- Visits and appointments
- Nursing
- Doctors
- Laboratory
- Pharmacy and inventory
- Billing and cashier
- Labour room and maternity
- Administration and reporting
- Notifications
- Audit and system settings

---

## 2. Recommended technology

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React.js | Staff interface |
| Build tool | Vite | Frontend development/build |
| Routing | React Router | Page navigation |
| Styling | Tailwind CSS | UI styling |
| HTTP client | Axios or Fetch | API requests |
| Backend | Node.js + Express.js | API and business logic |
| Validation | Zod | Validate incoming data |
| ORM | Prisma | Database access and migrations |
| Database | MySQL | Persistent relational data |
| Authentication | Secure server-side session or carefully implemented token flow | Staff identity |
| Password hashing | Argon2id or bcrypt | Password protection |
| Charts | Recharts | Operational dashboard charts |
| Real-time updates | Socket.IO (later phase) | Live work-queue notifications |
| Testing | Vitest, Supertest and a suitable browser test tool | Automated testing |
| Version control | Git | Source history |

Do not add every dependency at the beginning. Add packages when the corresponding feature is ready.

---

## 3. Suggested repository structure

```text
hospital-management-system/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── modules/
│   │   │   ├── dashboard/
│   │   │   ├── reception/
│   │   │   ├── doctors/
│   │   │   ├── nurses/
│   │   │   ├── laboratory/
│   │   │   ├── labour-room/
│   │   │   ├── pharmacy/
│   │   │   └── cashier/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── patients/
│   │   │   ├── visits/
│   │   │   ├── appointments/
│   │   │   ├── nursing/
│   │   │   ├── consultations/
│   │   │   ├── laboratory/
│   │   │   ├── pharmacy/
│   │   │   ├── billing/
│   │   │   ├── maternity/
│   │   │   ├── reports/
│   │   │   └── audit/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── documentation/
│   ├── SRS.md
│   ├── SYSTEM_DESIGN.md
│   ├── WORKFLOWS.md
│   ├── DATABASE_DESIGN.md
│   └── DEVELOPMENT_ROADMAP.md
├── .gitignore
└── README.md
```

A module should normally contain its route definitions, controller, service/business logic and validation schema. Keep shared middleware and configuration separate.

---

## 4. Backend request lifecycle

A typical API request should follow this sequence:

1. Browser sends an HTTP request.
2. Express receives the request.
3. Security middleware applies request-size limits, CORS policy and other protections.
4. Authentication middleware identifies the staff member.
5. Authorisation middleware checks role, department and resource access.
6. Zod validates request parameters and body.
7. Controller calls the relevant service.
8. Service applies business rules and uses Prisma to access MySQL.
9. Important actions are written to the audit log.
10. Express returns a consistent JSON response.

Controllers should not contain large amounts of business logic. Put business rules in services so they can be tested independently.

### 4.1 Example API response convention

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed"
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please review the submitted information"
  }
}
```

Do not expose stack traces, SQL details, secrets or internal server information to the browser in production.

---

## 5. API design conventions

Use a versioned API prefix:

```text
/api/v1
```

Suggested resource endpoints (illustrative; implement only after the data model and permissions are approved):

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/v1/auth/login | Staff login |
| POST | /api/v1/auth/logout | Staff logout |
| GET | /api/v1/auth/me | Current staff profile |
| GET | /api/v1/patients | Search/list patients |
| POST | /api/v1/patients | Register patient |
| GET | /api/v1/patients/:id | Retrieve permitted patient record |
| POST | /api/v1/visits | Create visit |
| GET | /api/v1/visits/:id | Retrieve permitted visit |
| POST | /api/v1/visits/:id/observations | Record an observation |
| POST | /api/v1/visits/:id/consultations | Record consultation |
| POST | /api/v1/lab-orders | Create laboratory order |
| PATCH | /api/v1/lab-orders/:id/status | Update laboratory workflow status |
| POST | /api/v1/lab-orders/:id/results | Enter result |
| POST | /api/v1/prescriptions | Create prescription |
| POST | /api/v1/dispensing | Record dispensing |
| POST | /api/v1/payments | Record payment |
| POST | /api/v1/maternity/episodes | Create pregnancy episode |

Use pagination for list endpoints. Validate IDs, filters, sorting and page sizes. Avoid returning entire patient records when a screen only needs a few fields.

---

## 6. Authentication and authorisation

### 6.1 Authentication
Use a secure, established session approach. For a browser-based staff application, a server-managed session in a secure, HttpOnly, SameSite cookie is a suitable option. If a token approach is selected, refresh-token rotation, revocation and secure storage must be designed deliberately.

- Never store passwords in plaintext.
- Do not put secrets in React environment variables.
- Do not store long-lived authentication tokens in localStorage.
- Use HTTPS in production.
- Apply session expiry and logout.
- Consider multi-factor authentication for privileged accounts.

### 6.2 Role-based access control
Create a permission model rather than scattering role-name checks throughout the code.

Example permission names:
- `patients.read`
- `patients.create`
- `patients.update`
- `visits.create`
- `clinical_notes.read`
- `clinical_notes.create`
- `lab_orders.read`
- `lab_results.enter`
- `lab_results.verify`
- `prescriptions.create`
- `pharmacy.dispense`
- `inventory.adjust`
- `payments.create`
- `reports.financial.read`
- `users.manage`
- `audit.read`

A permission check must also consider context where necessary, such as department, treatment relationship or assigned visit. A receptionist must not gain access to detailed clinical notes simply because they can open a patient record.

### 6.3 Backend enforcement
Every protected API route must be protected on the server. Hiding a menu item or button in React is not a security control.

---

## 7. Data protection and audit

The HMS will contain sensitive personal and health information. Treat privacy and security as core requirements, not later enhancements.

- Collect only data needed for an approved hospital purpose.
- Define who may view each category of information.
- Use HTTPS and suitable encryption at rest for servers and backups.
- Protect environment files and database credentials.
- Record important reads and changes where appropriate, especially sensitive access and privileged actions.
- Do not permit ordinary users to edit or delete audit logs.
- Keep clinical and financial correction histories.
- Establish retention, backup, restore and incident-response procedures with hospital management.
- Review the Nigeria Data Protection Act 2023 and applicable regulatory guidance with qualified advisers before live deployment.
- Do not use identifiable patient information in development, demonstrations or AI coding prompts.

---

## 8. Database and transaction principles

- Use MySQL foreign keys and appropriate indexes.
- Use Prisma migrations; do not manually alter a production database without a controlled migration.
- Use database transactions when multiple changes must be atomic.
- Use unique constraints for patient numbers, staff usernames and receipt/reference numbers.
- Use decimal database types for money, not floating-point types.
- Store timestamps consistently; display them in the hospital's configured local timezone.
- Use status fields and history records for workflows.
- Avoid hard deletion of clinical, financial or audit records.
- Use pagination and indexes for patient search and departmental queues.

---

## 9. Frontend design principles

- Build reusable form controls, tables, status labels, dialogs and page layouts.
- Use a protected application layout after login.
- Render navigation according to the current user's permissions, while still enforcing permissions on the backend.
- Use route-level access checks for user experience, not as the sole security control.
- Provide loading, empty, error and success states.
- Prevent accidental double submission of payments, orders and other important transactions.
- Confirm high-impact actions and explain why an action is unavailable.
- Keep department screens focused on the tasks staff perform most often.

Suggested main navigation:
- Dashboard
- Reception / Patient Records
- Doctors
- Nurses
- Laboratory
- Labour Room / Maternity
- Pharmacy
- Cashier
- Administration (only for authorised users)

---

## 10. Deployment overview

Production deployment is a separate controlled phase.

Recommended arrangement:
- A dedicated, secured hospital server or managed hosting environment approved by the hospital.
- Reverse proxy in front of the application.
- HTTPS certificate.
- Application service managed by a process manager or service manager.
- MySQL bound to a private interface and not publicly exposed.
- Firewall rules allowing only required traffic.
- Restricted administrator access.
- Scheduled encrypted backups with a separate protected copy.
- Regular restore tests and security updates.
- Remote staff access through an approved VPN or equivalent secure access gateway.

Do not expose the development server or MySQL port to the public internet. Do not deploy the first working prototype directly into live clinical operations.

---

## 11. Development quality standards

- Use Git commits for small, understandable changes.
- Keep secrets out of Git.
- Use `.env.example` with placeholder values only.
- Add tests for permissions and high-risk business rules.
- Review database migrations before applying them.
- Require code review or a second-person review for security-sensitive changes where possible.
- Document API changes and update the SRS when requirements change.
- Use fictional seed data for development.
