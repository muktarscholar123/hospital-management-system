# HMS Departmental Workflows

**Version:** 1.0  
**Purpose:** Describe how departments exchange work through the shared patient and visit record.

These workflows are an initial model. Hospital management and departmental staff must review and approve them before implementation.

---

## 1. General patient journey

Typical outpatient journey:

1. Reception searches for the patient.
2. If the patient is new, reception registers them and the system generates a patient number.
3. Reception creates a visit/encounter.
4. Depending on hospital policy, the patient may proceed to cashier, triage or another service point.
5. Nurse records triage and vital signs.
6. Doctor reviews the patient and records consultation notes and plan.
7. Doctor may create laboratory requests, prescriptions, referrals or follow-up instructions.
8. Laboratory processes requested tests and releases verified results.
9. Doctor reviews results and updates the care plan if required.
10. Pharmacy dispenses authorised prescriptions and records stock movement.
11. Cashier records applicable charges and payments, including partial payments.
12. Reception or the relevant department schedules follow-up where needed.
13. An authorised user completes the visit according to hospital policy.

This is not a rigid sequence. Emergency patients, direct admissions, patients with pre-paid services, patients with partial payments and patients who visit several departments must be supported.

## 2. Reception and records

**Inputs:** Patient identity/demographic details, appointment or walk-in request.

**Process:**
1. Search existing patient records.
2. Review possible duplicate matches.
3. Register a new patient only when appropriate.
4. Confirm/update permitted demographic details.
5. Create a visit or appointment.
6. Assign the appropriate service/department or queue.
7. Record arrival and status changes.

**Outputs:** Patient record, patient number, visit/encounter, appointment or queue item.

**Controls:** Reception must not have unrestricted access to diagnoses, clinical notes, maternity details or laboratory result interpretation.

## 3. Nursing workflow

**Inputs:** Patient and visit details, triage request or care task.

**Process:**
1. Open the permitted patient visit.
2. Confirm patient identity using hospital procedure.
3. Record triage information and required vital signs.
4. Add nursing notes and care activities.
5. Save and sign/finalise entries according to the approved workflow.
6. Make relevant information available to the treating clinician.

**Outputs:** Time-stamped observations and nursing documentation.

**Controls:** Corrections to finalised entries must preserve the original and record the reason and author. Any alerts must follow hospital-approved clinical protocols.

## 4. Doctor workflow

**Inputs:** Patient visit, nursing observations and available clinical history.

**Process:**
1. Review the patient and relevant authorised history.
2. Record consultation notes.
3. Record assessment/diagnosis and care plan.
4. Create laboratory orders or prescriptions as required.
5. Review verified results when available.
6. Update the plan and document follow-up/referral.
7. Complete or hand over the visit according to hospital procedure.

**Outputs:** Clinical note, diagnosis/assessment, orders, prescription, follow-up plan.

**Controls:** The system records clinician identity and timestamps. It does not independently diagnose or prescribe.

## 5. Laboratory workflow

**Inputs:** Laboratory request created by an authorised clinician.

**Process:**
1. Request appears in laboratory work queue.
2. Laboratory staff review request and patient identifiers.
3. Record sample collection and sample details.
4. Update processing status.
5. Enter test results.
6. Authorised staff verify results.
7. Release results to authorised clinicians.
8. Record amendments through a controlled correction process.

**Outputs:** Verified and released laboratory result linked to the original order, patient and visit.

**Controls:** Only authorised staff may verify/release. A result must not be silently changed after release.

## 6. Pharmacy workflow

**Inputs:** Prescription created by an authorised prescriber.

**Process:**
1. Prescription appears in pharmacy queue.
2. Pharmacist reviews prescription and relevant details.
3. Record items and quantities dispensed.
4. Record partial or unavailable dispensing where supported by hospital policy.
5. Post stock transaction.
6. Provide dispensing status to authorised staff.

**Outputs:** Dispensing record and updated stock balance.

**Controls:** Stock is changed through transactions, not by silently editing a balance. Stock adjustments require permission and a reason.

## 7. Cashier workflow

**Inputs:** Service charge, invoice or payment request.

**Process:**
1. Find the correct patient and related visit/account.
2. Review outstanding charges.
3. Record full or partial payment.
4. Generate receipt/reference.
5. Update outstanding balance.
6. Process approved reversal/refund through a traceable workflow.

**Outputs:** Payment record, receipt, updated balance and cashier summary.

**Controls:** A payment must not be posted twice because of repeated clicks or network retries. Cashiers see only the information necessary for payment.

## 8. Labour room and maternity workflow

**Inputs:** Antenatal presentation, labour admission or maternity referral.

**Process:**
1. Find or register the patient.
2. Create a new pregnancy/maternity episode; do not overwrite a previous pregnancy.
3. Record approved antenatal and obstetric history.
4. Record maternity admission.
5. Enter labour observations and progress according to the hospital-approved chart and protocol.
6. Record maternal vital signs and fetal heart observations where applicable.
7. Record delivery details and birth outcome.
8. Create one newborn record per baby; support twins and multiple births.
9. Record post-delivery maternal and newborn observations.
10. Complete maternal and newborn discharge documentation when authorised.

**Outputs:** Pregnancy episode, labour record, delivery record, newborn record(s), postnatal observations and discharge record.

**Controls:** Access is restricted to authorised maternity staff and treating clinicians. Clinical thresholds, observation frequency and escalation procedures must be approved by the hospital. The application must not make independent clinical decisions.

## 9. Administration workflow

1. Create and deactivate staff accounts.
2. Assign approved roles and departments.
3. Configure approved departments, services, prices and other master data.
4. Review operational dashboards and reports.
5. Review audit events where authorised.
6. Ensure backup, restore and security procedures are followed.

Administrative privileges do not justify casual alteration of clinical records. Any exceptional access or correction must be authorised and audited.

## 10. Cross-department hand-offs

| Event | Source | Destination | Expected result |
|---|---|---|---|
| Patient visit created | Reception | Relevant department | Visit appears in the correct queue |
| Vital signs recorded | Nurses | Treating doctor | Observations available to authorised clinician |
| Lab request created | Doctor | Laboratory | Order appears in lab queue |
| Lab result released | Laboratory | Doctor | Verified result available to authorised clinician |
| Prescription created | Doctor | Pharmacy | Prescription appears in dispensing queue |
| Medicine dispensed | Pharmacy | Inventory / billing as configured | Stock transaction and dispensing status recorded |
| Charge created | Department/service | Cashier | Charge appears on patient account |
| Payment posted | Cashier | Patient account | Receipt and balance updated |
| Maternity episode opened | Maternity staff | Maternity module | New pregnancy record created without overwriting history |

## 11. Exception workflows to design and test

- Emergency patient with incomplete demographic information.
- Patient cannot provide an identifier.
- Possible duplicate patient record.
- Patient transferred between departments.
- Patient leaves before completing the visit.
- Laboratory sample rejected or recollection required.
- Laboratory result corrected after release.
- Prescription partially dispensed or unavailable.
- Payment partially paid, reversed or refunded.
- Network interruption during a payment or stock transaction.
- Maternity patient with multiple newborns.
- Staff member attempts an action outside their permission.
- Patient record correction requested after finalisation.

Every exception must have an accountable owner and a documented status; avoid silent deletion or unexplained data changes.
