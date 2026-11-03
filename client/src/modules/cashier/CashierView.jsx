import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { CreditCard, Receipt, CheckCircle } from 'lucide-react';

export default function CashierView() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const invoices = [
    { id: 1, invNo: 'INV-2026-0001', patient: 'Amina Sani', total: '₦12,500.00', paid: '₦0.00', balance: '₦12,500.00', status: 'UNPAID' },
    { id: 2, invNo: 'INV-2026-0002', patient: 'Chukwuma Eze', total: '₦28,000.00', paid: '₦15,000.00', balance: '₦13,000.00', status: 'PARTIALLY_PAID' },
    { id: 3, invNo: 'INV-2026-0003', patient: 'Blessing Udoh', total: '₦45,000.00', paid: '₦45,000.00', balance: '₦0.00', status: 'PAID' },
  ];

  const columns = [
    { header: 'Invoice No', accessor: 'invNo' },
    { header: 'Patient Name', accessor: 'patient' },
    { header: 'Total Charge', accessor: 'total' },
    { header: 'Amount Paid', accessor: 'paid' },
    { header: 'Outstanding Balance', accessor: 'balance' },
    {
      header: 'Status',
      render: (row) => {
        const variants = {
          UNPAID: 'danger',
          PARTIALLY_PAID: 'warning',
          PAID: 'success',
        };
        return <Badge variant={variants[row.status] || 'neutral'}>{row.status.replace(/_/g, ' ')}</Badge>;
      },
    },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {row.status !== 'PAID' ? (
            <Button
              size="sm"
              variant="primary"
              icon={CreditCard}
              onClick={() => {
                setSelectedInvoice(row);
                setIsPaymentModalOpen(true);
              }}
            >
              Post Payment
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              icon={Receipt}
              onClick={() => {
                setSelectedInvoice(row);
                setIsReceiptModalOpen(true);
              }}
            >
              Print Receipt
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Billing & Cashier Point</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Charge reconciliation, payment posting, partial payment tracking, and receipt generation.
        </p>
      </div>

      <Card title="Patient Billing & Invoice Register" subtitle="Departmental service fees, investigations, and dispensary charges">
        <Table columns={columns} data={invoices} />
      </Card>

      {/* Payment Posting Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={`Receive Payment: ${selectedInvoice?.invNo}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle} onClick={() => setIsPaymentModalOpen(false)}>
              Post Payment & Generate Receipt
            </Button>
          </>
        }
      >
        <p style={{ fontSize: '0.875rem', marginBottom: '12px' }}>
          Patient: <strong>{selectedInvoice?.patient}</strong> • Outstanding: <strong>{selectedInvoice?.balance}</strong>
        </p>

        <Alert
          type="info"
          title="Financial Integrity Rule (SRS PAY-02 & PAY-07)"
          message="Supports both full and partial payments. Financial records are never deleted; adjustments or reversals require recorded reasons."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input label="Amount to Pay (₦)" defaultValue="12500.00" type="number" step="0.01" required />
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Payment Method <span style={{ color: '#dc2626' }}>*</span>
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
              <option value="POS">POS (Debit Card)</option>
              <option value="CASH">Cash</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
          </div>
        </div>

        <Input label="POS / Bank Transaction Reference (if applicable)" placeholder="e.g. STANBIC-TRX-948291" />
      </Modal>

      {/* Receipt Preview Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Official Payment Receipt"
        footer={
          <Button variant="primary" onClick={() => setIsReceiptModalOpen(false)}>
            Done
          </Button>
        }
      >
        <div style={{ padding: '16px', border: '1px dashed #cbd5e1', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>City Care Hospital</h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Receipt #: REC-2026-0042</p>
          </div>

          <div style={{ fontSize: '0.8125rem', lineHeight: '1.8' }}>
            <div>Patient: <strong>{selectedInvoice?.patient}</strong></div>
            <div>Invoice Ref: <strong>{selectedInvoice?.invNo}</strong></div>
            <div>Payment Method: <strong>POS</strong></div>
            <div>Amount Paid: <strong>{selectedInvoice?.total}</strong></div>
            <div>Cashier: <strong>Zainab Danladi</strong></div>
            <div>Status: <span style={{ color: '#16a34a', fontWeight: 600 }}>COMPLETED</span></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
