import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import { HeartPulse, Check, AlertTriangle } from 'lucide-react';

export default function NursesView() {
  const [selectedPatient, setSelectedPatient] = useState({
    name: 'Chukwuma Eze',
    visitNo: 'VIS-2026-0013',
    patientNo: 'PAT-2026-0002',
    gender: 'Male',
    age: '38 yrs',
  });

  const triageQueue = [
    { id: 1, visitNo: 'VIS-2026-0013', name: 'Chukwuma Eze', time: '10:30 AM', priority: 'ROUTINE', dept: 'General OPD' },
    { id: 2, visitNo: 'VIS-2026-0018', name: 'Suleiman Bala', time: '10:50 AM', priority: 'URGENT', dept: 'Emergency' },
    { id: 3, visitNo: 'VIS-2026-0019', name: 'Mary Johnson', time: '11:15 AM', priority: 'ROUTINE', dept: 'General OPD' },
  ];

  const columns = [
    { header: 'Visit No', accessor: 'visitNo' },
    { header: 'Patient Name', accessor: 'name' },
    { header: 'Arrival Time', accessor: 'time' },
    {
      header: 'Priority',
      render: (row) => (
        <Badge variant={row.priority === 'URGENT' ? 'danger' : 'neutral'}>{row.priority}</Badge>
      ),
    },
    {
      header: 'Action',
      render: (row) => (
        <Button size="sm" variant="primary" onClick={() => setSelectedPatient({ ...selectedPatient, name: row.name, visitNo: row.visitNo })}>
          Record Vitals
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Nurses' Station & Triage</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Triage patient intake, record baseline vital signs, and document nursing care plans.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Waiting Triage Queue */}
        <Card title="Awaiting Triage" subtitle="Patients registered at reception">
          <Table columns={columns} data={triageQueue} />
        </Card>

        {/* Vital Signs Form */}
        <Card
          title={`Record Vitals: ${selectedPatient.name}`}
          subtitle={`${selectedPatient.visitNo} • ${selectedPatient.patientNo}`}
          action={<Badge variant="warning">Triage Intake</Badge>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <Input label="Body Temperature (°C)" placeholder="e.g. 36.8" type="number" step="0.1" required />
            <Input label="Systolic BP (mmHg)" placeholder="e.g. 120" type="number" required />
            <Input label="Diastolic BP (mmHg)" placeholder="e.g. 80" type="number" required />
            <Input label="Pulse Rate (bpm)" placeholder="e.g. 72" type="number" required />
            <Input label="Respiratory Rate (bpm)" placeholder="e.g. 18" type="number" />
            <Input label="Oxygen Saturation SpO2 (%)" placeholder="e.g. 98" type="number" />
            <Input label="Weight (kg)" placeholder="e.g. 70.5" type="number" step="0.1" />
            <Input label="Height (cm)" placeholder="e.g. 175" type="number" />
          </div>

          <div style={{ marginTop: '12px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Nursing Triage Notes & Observations
            </label>
            <textarea
              rows={3}
              placeholder="Record visible symptoms, patient comfort, allergies or nursing notes..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button variant="secondary">Reset</Button>
            <Button variant="primary" icon={Check}>
              Save Vitals & Send to Doctor Queue
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

