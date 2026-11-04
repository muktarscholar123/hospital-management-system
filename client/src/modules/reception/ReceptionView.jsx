import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';
import { UserPlus, Search, Calendar, AlertCircle } from 'lucide-react';

export default function ReceptionView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Fictional sample patients for Phase 2 prototype
  const samplePatients = [
    { id: 1, patientNo: 'PAT-2026-0001', name: 'Zainab Kabir', gender: 'FEMALE', dob: '1994-05-12', phone: '08031234567', visits: 3 },
    { id: 2, patientNo: 'PAT-2026-0002', name: 'Oluwaseun Adeleke', gender: 'MALE', dob: '1988-11-23', phone: '08029876543', visits: 1 },
    { id: 3, patientNo: 'PAT-2026-0003', name: 'Hauwa Mohammed', gender: 'FEMALE', dob: '2001-08-30', phone: '08051112233', visits: 5 },
    { id: 4, patientNo: 'PAT-2026-0004', name: 'Emmanuel Chukwu', gender: 'MALE', dob: '1975-02-14', phone: '08074445566', visits: 2 },
  ];

  const filteredPatients = samplePatients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
  );

  const columns = [
    { header: 'Patient No', accessor: 'patientNo' },
    { header: 'Full Name', accessor: 'name' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Date of Birth', accessor: 'dob' },
    { header: 'Phone Number', accessor: 'phone' },
    {
      header: 'Total Visits',
      render: (row) => <Badge variant="info">{row.visits} Visits</Badge>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="outline">
            New Visit
          </Button>
          <Button size="sm" variant="secondary">
            View Profile
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Reception & Patient Records</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Patient search, new registration, appointment check-ins, and visit triage queues.
          </p>
        </div>
        <Button variant="primary" icon={UserPlus} onClick={() => setIsRegisterOpen(true)}>
          Register New Patient
        </Button>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Search by Patient Number, Name, or Phone (e.g. PAT-2026-0001 or Zainab)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 0 }}
            />
          </div>
          <Button variant="secondary" icon={Search}>
            Search
          </Button>
        </div>

        <Table columns={columns} data={filteredPatients} emptyMessage="No matching patient records found." />
      </Card>

      {/* Register Patient Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Register New Patient"
        maxWidth="650px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsRegisterOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsRegisterOpen(false)}>
              Save Patient & Create Visit
            </Button>
          </>
        }
      >
        <Alert
          type="info"
          title="Duplicate Prevention Protocol (SRS REC-04)"
          message="The system automatically checks for duplicate phone numbers and similar names before finalizing registration."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input label="First Name" placeholder="e.g. Fatima" required />
          <Input label="Last Name" placeholder="e.g. Abdullahi" required />
          <Input label="Other Names" placeholder="e.g. Kemi" />
          <Input label="Date of Birth" type="date" required />
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Gender <span style={{ color: '#dc2626' }}>*</span>
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
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <Input label="Phone Number" placeholder="e.g. 08012345678" required />
          <Input label="Blood Group" placeholder="e.g. O+ or A+" />
          <Input label="Genotype" placeholder="e.g. AA or AS" />
        </div>

        <div style={{ marginTop: '12px' }}>
          <Input label="Residential Address" placeholder="Street name, City, State" />
        </div>

        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginTop: '16px', marginBottom: '8px' }}>
          Next of Kin / Emergency Contact
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input label="Contact Name" placeholder="Full name of next of kin" />
          <Input label="Relationship" placeholder="e.g. Spouse, Brother, Mother" />
          <Input label="Emergency Phone" placeholder="e.g. 08098765432" />
        </div>
      </Modal>
    </div>
  );
}

