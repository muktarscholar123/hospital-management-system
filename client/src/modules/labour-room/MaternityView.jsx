import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { Baby, PlusCircle, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function MaternityView() {
  const [isNewEpisodeOpen, setIsNewEpisodeOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const episodes = [
    {
      id: 1,
      episodeNo: 'PREG-2026-0001',
      patient: 'Blessing Udoh',
      patientNo: 'PAT-2026-0005',
      gravida: 2,
      para: 1,
      gaBooking: '16 weeks',
      edd: '2026-12-14',
      status: 'ACTIVE',
    },
    {
      id: 2,
      episodeNo: 'PREG-2026-0002',
      patient: 'Halima Sadiq',
      patientNo: 'PAT-2026-0006',
      gravida: 1,
      para: 0,
      gaBooking: '20 weeks',
      edd: '2026-11-20',
      status: 'DELIVERED',
    },
  ];

  const columns = [
    { header: 'Episode No', accessor: 'episodeNo' },
    { header: 'Maternal Patient', accessor: 'patient' },
    { header: 'Patient No', accessor: 'patientNo' },
    { header: 'Obstetric History', render: (row) => `G${row.gravida} P${row.para}` },
    { header: 'Est. Delivery (EDD)', accessor: 'edd' },
    {
      header: 'Episode Status',
      render: (row) => (
        <Badge variant={row.status === 'ACTIVE' ? 'purple' : 'success'}>{row.status}</Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="outline" onClick={() => setIsDeliveryOpen(true)}>
            Record Delivery
          </Button>
          <Button size="sm" variant="secondary">
            Antenatal Chart
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Labour Room & Maternity</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Antenatal care tracking, distinct pregnancy episodes, labour monitoring, and multiple-birth deliveries.
          </p>
        </div>
        <Button variant="primary" icon={PlusCircle} onClick={() => setIsNewEpisodeOpen(true)}>
          New Pregnancy Episode
        </Button>
      </div>

      <Alert
        type="info"
        title="SRS Rule MAT-01 & MAT-02 Compliance"
        message="Each pregnancy is tracked as a distinct episode. Previous pregnancies remain permanently archived in the patient's obstetric history and are never overwritten."
      />

      <Card title="Active Maternity Episodes" subtitle="Currently registered antenatal and labour cases">
        <Table columns={columns} data={episodes} />
      </Card>

      {/* Record Delivery Modal (Supporting Multiple Newborns) */}
      <Modal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        title="Record Delivery & Newborns (SRS MAT-08 & MAT-09)"
        maxWidth="650px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeliveryOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={Baby} onClick={() => setIsDeliveryOpen(false)}>
              Save Delivery Record
            </Button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Mode of Delivery
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
              <option value="SPONTANEOUS_VAGINAL">Spontaneous Vaginal Delivery (SVD)</option>
              <option value="CAESAREAN_SECTION">Caesarean Section</option>
              <option value="VACUUM_EXTRACTION">Vacuum Extraction</option>
              <option value="BREECH_DELIVERY">Breech Delivery</option>
            </select>
          </div>

          <Input label="Est. Blood Loss (mL)" placeholder="e.g. 250" type="number" />
          <Input label="Placenta Delivered Time" type="time" defaultValue="11:45" />
          <Input label="Delivery Date & Time" type="datetime-local" defaultValue="2026-11-03T11:30" />
        </div>

        <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#166534', marginBottom: '4px' }}>
            Newborn Registration (Twin / Multiple Birth Support)
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#15803d', marginBottom: '10px' }}>
            A delivery supports one or multiple baby records (Baby A, Baby B).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <Input label="Baby Order" defaultValue="Single / Baby A" />
            <Input label="Birth Weight (kg)" placeholder="e.g. 3.4" step="0.1" type="number" />
            <Input label="Apgar (1 min / 5 min)" placeholder="e.g. 8 / 10" defaultValue="8 / 10" />
          </div>
        </div>
      </Modal>

      {/* New Pregnancy Episode Modal */}
      <Modal
        isOpen={isNewEpisodeOpen}
        onClose={() => setIsNewEpisodeOpen(false)}
        title="Open Distinct Pregnancy Episode"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsNewEpisodeOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsNewEpisodeOpen(false)}>
              Create Maternity Episode
            </Button>
          </>
        }
      >
        <Input label="Patient Number" placeholder="PAT-2026-XXXX" required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input label="Last Menstrual Period (LMP)" type="date" />
          <Input label="Expected Delivery Date (EDD)" type="date" />
          <Input label="Gravida (Total Pregnancies)" type="number" defaultValue="1" />
          <Input label="Para (Viable Births)" type="number" defaultValue="0" />
        </div>
      </Modal>
    </div>
  );
}

