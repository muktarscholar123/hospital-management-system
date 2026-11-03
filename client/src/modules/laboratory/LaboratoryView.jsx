import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { FlaskConical, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LaboratoryView() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const labOrders = [
    { id: 1, orderNo: 'LAB-2026-0001', patient: 'Amina Sani', test: 'Malaria Parasite (MP)', doctor: 'Dr. Amina Yusuf', priority: 'URGENT', status: 'SAMPLE_COLLECTED' },
    { id: 2, orderNo: 'LAB-2026-0002', patient: 'Oluwaseun Adeleke', test: 'Fasting Blood Sugar (FBS)', doctor: 'Dr. Abubakar Bello', priority: 'ROUTINE', status: 'ORDERED' },
    { id: 3, orderNo: 'LAB-2026-0003', patient: 'Hauwa Mohammed', test: 'Packed Cell Volume (PCV)', doctor: 'Dr. Amina Yusuf', priority: 'ROUTINE', status: 'VERIFIED' },
  ];

  const columns = [
    { header: 'Order No', accessor: 'orderNo' },
    { header: 'Patient Name', accessor: 'patient' },
    { header: 'Investigation Requested', accessor: 'test' },
    { header: 'Ordering Clinician', accessor: 'doctor' },
    {
      header: 'Priority',
      render: (row) => <Badge variant={row.priority === 'URGENT' ? 'danger' : 'neutral'}>{row.priority}</Badge>,
    },
    {
      header: 'Status',
      render: (row) => {
        const variants = {
          ORDERED: 'warning',
          SAMPLE_COLLECTED: 'info',
          VERIFIED: 'success',
          RELEASED: 'success',
        };
        return <Badge variant={variants[row.status] || 'neutral'}>{row.status.replace(/_/g, ' ')}</Badge>;
      },
    },
    {
      header: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setSelectedOrder(row);
            setIsResultModalOpen(true);
          }}
        >
          {row.status === 'VERIFIED' ? 'View Result' : 'Enter / Verify Result'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Laboratory Workstation</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Process diagnostic requests, track sample collections, and verify laboratory results.
          </p>
        </div>
      </div>

      <Card title="Laboratory Test Orders Queue" subtitle="Incoming requests from OPD, Emergency, and Wards">
        <Table columns={columns} data={labOrders} />
      </Card>

      {/* Result Entry & Verification Modal */}
      <Modal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        title={`Enter Laboratory Result: ${selectedOrder?.test}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsResultModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={ShieldCheck} onClick={() => setIsResultModalOpen(false)}>
              Verify & Release to Doctor
            </Button>
          </>
        }
      >
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '0.875rem', color: '#475569' }}>
            Patient: <strong>{selectedOrder?.patient}</strong> • Order: <strong>{selectedOrder?.orderNo}</strong>
          </p>
          <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>
            Ordering Doctor: {selectedOrder?.doctor}
          </p>
        </div>

        <Alert
          type="info"
          title="Clinical Safety Rule (SRS LAB-06)"
          message="Results become immediately visible in the treating doctor's workspace upon verification and release."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <Input label="Observed Result Value" placeholder="e.g. ++ (2 pluses) or 42%" defaultValue="++ (Trophozoites seen)" required />
          <Input label="Units" placeholder="e.g. % or mg/dL" defaultValue="-" />
        </div>

        <Input label="Reference / Normal Range" placeholder="e.g. Negative or 70 - 100 mg/dL" defaultValue="Negative" />

        <div style={{ marginTop: '8px' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
            Lab Scientist Remarks / Clinical Notes
          </label>
          <textarea
            rows={2}
            placeholder="Additional observations, staining notes or sample remarks..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
            }}
            defaultValue="Giemsa stained thick film reveals presence of Plasmodium falciparum ring forms."
          />
        </div>
      </Modal>
    </div>
  );
}
