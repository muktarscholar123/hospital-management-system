import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';
import { Pill, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function PharmacyView() {
  const [selectedRx, setSelectedRx] = useState(null);
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false);

  const prescriptions = [
    {
      id: 1,
      rxNo: 'RX-2026-0001',
      patient: 'Amina Sani',
      doctor: 'Dr. Amina Yusuf',
      drug: 'Artemether-Lumefantrine (Coartem) 80/480mg',
      dosage: '1 tab BD for 3 days',
      qty: 6,
      status: 'PENDING',
    },
    {
      id: 2,
      rxNo: 'RX-2026-0002',
      patient: 'Chukwuma Eze',
      doctor: 'Dr. Abubakar Bello',
      drug: 'Paracetamol 500mg tablets',
      dosage: '2 tabs TDS for 3 days',
      qty: 18,
      status: 'PENDING',
    },
    {
      id: 3,
      rxNo: 'RX-2026-0003',
      patient: 'Hauwa Mohammed',
      doctor: 'Dr. Amina Yusuf',
      drug: 'Amoxicillin/Clavulanate 625mg',
      dosage: '1 tab BD for 5 days',
      qty: 10,
      status: 'FULLY_DISPENSED',
    },
  ];

  const inventory = [
    { code: 'MED-001', name: 'Artemether/Lumefantrine 80/480mg', stock: 120, min: 20, expiry: '2027-05-15', status: 'IN_STOCK' },
    { code: 'MED-002', name: 'Paracetamol 500mg (1000s pack)', stock: 450, min: 50, expiry: '2027-11-20', status: 'IN_STOCK' },
    { code: 'MED-003', name: 'Ceftriaxone 1g Injection', stock: 8, min: 15, expiry: '2026-12-01', status: 'LOW_STOCK' },
  ];

  const rxColumns = [
    { header: 'Rx Number', accessor: 'rxNo' },
    { header: 'Patient Name', accessor: 'patient' },
    { header: 'Prescribed Medicine', accessor: 'drug' },
    { header: 'Dosage Instructions', accessor: 'dosage' },
    { header: 'Qty', accessor: 'qty' },
    {
      header: 'Dispense Status',
      render: (row) => (
        <Badge variant={row.status === 'FULLY_DISPENSED' ? 'success' : 'warning'}>
          {row.status.replace(/_/g, ' ')}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          variant={row.status === 'FULLY_DISPENSED' ? 'secondary' : 'primary'}
          onClick={() => {
            setSelectedRx(row);
            setIsDispenseModalOpen(true);
          }}
        >
          {row.status === 'FULLY_DISPENSED' ? 'View Details' : 'Dispense'}
        </Button>
      ),
    },
  ];

  const invColumns = [
    { header: 'Drug Code', accessor: 'code' },
    { header: 'Generic / Brand Name', accessor: 'name' },
    { header: 'Current Balance', accessor: 'stock' },
    { header: 'Batch Expiry', accessor: 'expiry' },
    {
      header: 'Stock Level',
      render: (row) => (
        <Badge variant={row.status === 'LOW_STOCK' ? 'danger' : 'success'}>
          {row.status.replace(/_/g, ' ')}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Pharmacy & Dispensary</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Digital prescription queue, atomic stock deduction, batch expiry alerts, and dispensary audits.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <Card title="Prescriptions Dispensing Queue" subtitle="Digital orders from outpatient and inpatient clinicians">
          <Table columns={rxColumns} data={prescriptions} />
        </Card>

        <Card title="Inventory & Stock Balances" subtitle="Tracked via immutable stock transactions">
          <Table columns={invColumns} data={inventory} />
        </Card>
      </div>

      {/* Dispense Modal */}
      <Modal
        isOpen={isDispenseModalOpen}
        onClose={() => setIsDispenseModalOpen(false)}
        title={`Dispense Prescription: ${selectedRx?.rxNo}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDispenseModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle2} onClick={() => setIsDispenseModalOpen(false)}>
              Post Stock Transaction & Dispense
            </Button>
          </>
        }
      >
        <p style={{ fontSize: '0.875rem', marginBottom: '12px' }}>
          Patient: <strong>{selectedRx?.patient}</strong> • Medicine: <strong>{selectedRx?.drug}</strong>
        </p>
        <Alert
          type="info"
          title="Stock Transaction Rule (SRS PHARM-06)"
          message="Dispensing automatically deducts inventory using an atomic database transaction. Direct manual balance overrides are strictly audited."
        />
        <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '0.8125rem', color: '#475569' }}>
            Allocated Batch: <strong>BAT-2026-08 (Exp: 2027-05-15)</strong>
          </p>
          <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '4px' }}>
            Quantity to deduct: <strong>{selectedRx?.qty} units</strong>
          </p>
        </div>
      </Modal>
    </div>
  );
}

