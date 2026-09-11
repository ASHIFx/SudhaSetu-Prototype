import React from 'react';
import { X, Check, User, ShieldCheck } from 'lucide-react';

export const DEMO_USERS = [
  {
    id: 'patient-1',
    name: 'Rahul Sharma',
    role: 'patient',
    label: 'Rahul Sharma (Patient)',
    details: '28 yrs · Delhi · Registered Patient',
  },
  {
    id: 'doctor-1',
    name: 'Dr. Ananya Vaidya',
    role: 'doctor',
    label: 'Dr. Ananya Vaidya (Doctor)',
    details: 'BAMS, MD · Senior Ayurvedic Consultant',
  },
  {
    id: 'guest',
    name: 'Guest User',
    role: 'guest',
    label: 'Guest / Public User',
    details: 'Anonymous Access',
  },
];

export default function LoginModal({ isOpen, onClose, currentUser, onSelectUser }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Prototype Login</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <span className="prototype-badge">
          ⚡ Hardcoded Prototype Mode: Select any demo role to switch user context instantly.
        </span>

        <div className="demo-account-list">
          {DEMO_USERS.map((u) => {
            const isSelected = currentUser.id === u.id;
            return (
              <div
                key={u.id}
                className={`demo-account-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectUser(u);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {u.role === 'doctor' ? (
                    <ShieldCheck size={20} color="#0f5132" />
                  ) : (
                    <User size={20} color="#0f5132" />
                  )}
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{u.label}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{u.details}</p>
                  </div>
                </div>
                {isSelected && <Check size={18} color="#0f5132" />}
              </div>
            );
          })}
        </div>

        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
          Continue as {currentUser.name}
        </button>
      </div>
    </div>
  );
}
