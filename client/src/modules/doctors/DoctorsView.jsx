import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Alert from '../../components/common/Alert';
import Input from '../../components/common/Input';
import { Stethoscope, FlaskConical, Pill, CheckCircle2 } from 'lucide-react';

export default function DoctorsView() {
  const [selectedPatient, setSelectedPatient] = useState({
    name: 'Amina Sani',
    visitNo: 'VIS-2026-0012',
    patientNo: 'PAT-2026-0001',
    age: '30 yrs',
    gender: 'Female',
    vitals: { temp: '38.2 °C', bp: '120/80 mmHg', pulse: '88 bpm', resp: '20 bpm', spo2: '98%' },
  });

  const waitingPatients = [
    { id: 1, visitNo: 'VIS-2026-0012', name: 'Amina Sani', time: '10:15 AM', triage: 'Urgent', vitals: 'Recorded' },
    { id: 2, visitNo: 'VIS-2026-0016', name: 'Kabiru Aliyu', time: '10:40 AM', triage: 'Routine', vitals: 'Recorded' },
    { id: 3, visitNo: 'VIS-2026-0017', name: 'Chinedu Eze', time: '11:10 AM', triage: 'Routine', vitals: 'Recorded' },
  ];

  const columns = [
    { header: 'Visit No', accessor: 'visitNo' },
    { header: 'Patient Name', accessor: 'name' },
    { header: 'Arrival Time', accessor: 'time' },
    {
      header: 'Triage Priority',
      render: (row) => (
        <Badge variant={row.triage === 'Urgent' ? 'danger' : 'neutral'}>{row.triage}</Badge>
      ),
    },
    {
      header: 'Action',
      render: (row) => (
        <Button size="sm" variant="primary" onClick={() => setSelectedPatient({ ...selectedPatient, name: row.name, visitNo: row.visitNo })}>
          Attend to Patient
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Doctors' Workspace</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Consultation notes, clinical assessment, lab investigation orders, and digital prescriptions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Waiting Queue */}
        <div>
          <Card title="Awaiting Consultation" subtitle="Patients triaged by nursing">
            <Table columns={columns} data={waitingPatients} />
          </Card>
        </div>

        {/* Active Consultation Encounter */}
        <div>
          <Card
            title={`Active Encounter: ${selectedPatient.name}`}
            subtitle={`${selectedPatient.visitNo} • ${selectedPatient.patientNo} (${selectedPatient.age}, ${selectedPatient.gender})`}
            action={<Badge variant="info">In Consultation</Badge>}
          >
            {/* Vitals Summary from Nurses */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Temp</span>
                <strong style={{ fontSize: '0.9rem', color: '#dc2626' }}>{selectedPatient.vitals.temp}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Blood Pressure</span>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{selectedPatient.vitals.bp}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Pulse Rate</span>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{selectedPatient.vitals.pulse}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Resp Rate</span>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{selectedPatient.vitals.resp}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>SpO2</span>
                <strong style={{ fontSize: '0.9rem', color: '#16a34a' }}>{selectedPatient.vitals.spo2}</strong>
              </div>
            </div>

            {/* Clinical Documentation Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Chief Complaint & History of Presenting Illness
                </label>
                <textarea
                  rows={3}
                  placeholder="Document patient symptoms, duration, and clinical history..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                  }}
                  defaultValue="Patient presents with high grade fever of 3 days duration, chills, headaches, and general body weakness."
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Physical Examination Findings
                </label>
                <textarea
                  rows={2}
                  placeholder="Physical exam observations..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                  }}
                  defaultValue="Febrile to touch, pallor absent, anicteric, chest clear."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <Input label="Provisional Diagnosis" defaultValue="Suspected Acute Uncomplicated Malaria" required />
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Type
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="PROVISIONAL">Provisional</option>
                    <option value="FINAL">Final</option>
                  </select>
                </div>
              </div>

              {/* Departmental Orders */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="outline" icon={FlaskConical}>
                  + Order Lab Investigation
                </Button>
                <Button variant="outline" icon={Pill}>
                  + Write Digital Prescription
                </Button>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary">Save Draft</Button>
                <Button variant="primary" icon={CheckCircle2}>
                  Sign & Finalize Consultation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
