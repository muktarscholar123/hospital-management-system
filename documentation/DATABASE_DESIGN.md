# HMS Logical Database Design

**Version:** 1.0  
**Status:** Conceptual baseline — not yet a final Prisma schema.

This document proposes the main data entities and relationships. Confirm the hospital's forms, terminology and workflows before creating production migrations.

---

## 1. Database design principles

- Use a relational MySQL database.
- Use primary keys for all entities; UUIDs or carefully designed numeric IDs may be selected consistently.
- Use unique constraints for patient numbers, staff usernames and receipt/reference numbers.
- Use foreign keys to preserve relationships.
- Store money using fixed-precision decimal types.
- Store timestamps consistently and display them in the hospital's configured timezone.
- Use status and history records for workflows.
- Avoid hard deletion of clinical, financial and audit records.
- Keep clinical, demographic and financial access separated through backend permissions.
- Use transactions for multi-step operations such as payment posting and stock deduction.

## 2. Core entities

### 2.1 Staff and access control
- `users`: staff login identity, password hash, account status, timestamps.
- `staff_profiles`: staff name, staff number and contact details.
- `departments`: hospital departments.
- `roles`: role definitions.
- `permissions`: individual permission definitions.
- `user_roles`: staff-to-role assignments.
- `role_permissions`: role-to-permission assignments.
- `user_departments`: staff department assignments, if staff may work across departments.
- `sessions` or equivalent: active/revocable session metadata if server-side sessions are used.

### 2.2 Patient and visit
- `patients`: unique patient number and approved demographic fields.
- `patient_contacts`: contact and next-of-kin details, where required.
- `visits`: encounter identifier, patient, visit type, department, status, arrival and closure timestamps.
- `appointments`: patient, schedule, service, status and booking staff.
- `admissions`: admission episode, patient, location/ward if applicable, admission and discharge timestamps.

### 2.3 Clinical records
- `observations`: patient, visit, observation type, value, unit, recorded by and timestamp.
- `consultations`: patient, visit, clinician, note and status.
- `diagnoses`: coded or free-text diagnosis linked to consultation/visit, according to approved terminology.
- `care_plans`: plan and follow-up details.
- `clinical_documents`: metadata for approved attachments; files should be stored securely outside the public web root.
- `record_amendments`: original record reference, amendment reason, author and timestamp where a generic amendment structure is appropriate.

### 2.4 Laboratory
- `lab_test_catalogue`: approved test names and configuration.
- `lab_orders`: patient, visit, ordering clinician, status and timestamps.
- `lab_order_items`: one or more tests within an order.
- `lab_samples`: sample type, collection time, collector and sample status.
- `lab_results`: result values/text, units, reference range and status.
- `lab_result_verifications`: verifier, verification time and release details.
- `lab_result_amendments`: prior result reference, new result, reason, author and timestamp.

### 2.5 Pharmacy and inventory
- `medicines`: medicine catalogue, strength, dosage form and active status.
- `prescriptions`: patient, visit, prescriber and status.
- `prescription_items`: medicine, instructions, quantity and duration.
- `dispensing_records`: prescription item, quantity dispensed, pharmacist and timestamp.
- `inventory_locations`: stock location, if needed.
- `stock_batches`: medicine batch, expiry date and batch quantity metadata.
- `stock_transactions`: receipt, dispensing, adjustment, return or reversal, quantity, reason, actor and timestamp.
- `suppliers`: supplier details, if procurement is in scope.

### 2.6 Billing and cashier
- `service_catalogue`: approved billable services.
- `invoices`: patient, visit, invoice number, status and totals.
- `invoice_items`: service/item, quantity, unit price and line total.
- `payments`: receipt number, invoice/account, amount, method, cashier and timestamp.
- `payment_allocations`: allocation of a payment across one or more invoices/items if required.
- `financial_adjustments`: approved discount, waiver, reversal or refund, with reason and approver.

### 2.7 Maternity
- `pregnancy_episodes`: patient, pregnancy sequence/identifier, dates and episode status.
- `antenatal_records`: pregnancy episode, visit/date, history and approved antenatal fields.
- `obstetric_histories`: structured history associated with patient or pregnancy episode.
- `labour_episodes`: pregnancy episode, admission and labour status.
- `labour_observations`: time-stamped observations and approved chart fields.
- `deliveries`: pregnancy/labour episode, delivery date/time, mode and outcome fields approved by the hospital.
- `newborns`: one record per newborn, linked to a delivery; supports multiple babies.
- `postnatal_observations`: maternal or newborn post-delivery observations, linked to the relevant subject and episode.
- `maternity_discharges`: maternal/newborn discharge information and authorisation.

Previous pregnancy episodes must remain separate. Do not use one mutable patient-level set of fields as a substitute for historical pregnancy records.

### 2.8 Audit and configuration
- `audit_logs`: actor, action, entity type, entity ID, timestamp, request/correlation ID and limited change metadata.
- `system_settings`: approved configurable settings.
- `notification_events`: recipient, event type, status and timestamp.
- `file_metadata`: secure file reference, owner, type, size and access metadata.

## 3. High-level relationships

```text
Patient 1 ---- many Visits
Patient 1 ---- many Appointments
Patient 1 ---- many Admissions
Patient 1 ---- many PregnancyEpisodes

Visit 1 ---- many Observations
Visit 1 ---- many Consultations
Visit 1 ---- many LabOrders
Visit 1 ---- many Prescriptions
Visit 1 ---- many Invoices

LabOrder 1 ---- many LabOrderItems
LabOrderItem 1 ---- many LabResults (if repeat/corrected results are modelled)
Prescription 1 ---- many PrescriptionItems
PrescriptionItem 1 ---- many DispensingRecords
Invoice 1 ---- many InvoiceItems
Invoice 1 ---- many Payments / PaymentAllocations

PregnancyEpisode 1 ---- many AntenatalRecords
PregnancyEpisode 1 ---- many LabourEpisodes
LabourEpisode 1 ---- many LabourObservations
LabourEpisode 1 ---- one or more Deliveries as defined by approved workflow
Delivery 1 ---- many Newborns
PregnancyEpisode 1 ---- many PostnatalObservations

User many ---- many Roles
Role many ---- many Permissions
User many ---- many Departments (if required)
User 1 ---- many AuditLogs
```

## 4. Important modelling decisions

### Patient identity
Do not assume name or phone number is unique. Generate a hospital patient number and support duplicate review. A merge operation, if required, must be controlled, authorised and audited.

### Visits and admissions
Keep patient identity separate from visits and admissions. A patient can have many visits and more than one admission over time.

### Clinical notes
Store author, creation time, finalisation status and amendment history. Do not silently replace signed notes.

### Laboratory results
Separate the order from individual tests and results. Capture who entered, verified and released a result.

### Medicines and stock
Do not treat stock as a single editable number. Calculate or reconcile balances from traceable stock transactions and batches as the hospital's inventory policy requires.

### Payments
A payment must have a unique receipt/reference and be posted atomically. Support partial payments and reversals without deleting the original transaction.

### Maternity
A patient can have many pregnancy episodes. Each pregnancy has its own antenatal, labour and delivery records. A delivery may have multiple newborns.

### Audit logs
Audit data should not contain unnecessary copies of sensitive clinical content. Store enough metadata to establish accountability and reconstruct authorised changes.

## 5. Data dictionary work still required

Before finalising Prisma models, confirm:
- Patient number format and required demographic fields.
- Hospital department and service catalogue.
- Exact vital-sign fields and units.
- Approved diagnosis terminology, if any.
- Laboratory test catalogue, result types, units and reference ranges.
- Medicine catalogue, stock units, batch and expiry rules.
- Currency and financial rounding rules.
- Payment methods and receipt numbering.
- Maternity forms and pregnancy/delivery fields.
- Record-retention and amendment policies.

## 6. Migration policy

1. Update this design before implementing major entity changes.
2. Make schema changes through Prisma migrations.
3. Review each migration before applying it.
4. Back up data before production migrations.
5. Test migrations and rollback/recovery procedures in a non-production environment.
6. Never experiment directly on live patient data.
