import React, { useState } from 'react';
import { Pill, Search, ChevronDown, ChevronUp, AlertCircle, ShieldAlert } from 'lucide-react';
import { medicines } from '../data/medical-data';

export default function MedicinesScreen() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'otc' | 'prescription'
  const [expandedName, setExpandedName] = useState(null);

  const filteredMedicines = medicines.filter((m) => {
    const matchesQuery =
      query.trim() === '' ||
      (m.name + ' ' + m.composition + ' ' + m.uses)
        .toLowerCase()
        .includes(query.toLowerCase());

    const isRx = (m.prescription || '').toLowerCase().startsWith('y');
    let matchesType = true;
    if (filterType === 'otc') matchesType = !isRx;
    if (filterType === 'prescription') matchesType = isRx;

    return matchesQuery && matchesType;
  });

  const toggleExpand = (name) => {
    setExpandedName(expandedName === name ? null : name);
  };

  return (
    <div className="medicines-screen">
      <div className="section-header">
        <h2 className="section-title">
          <Pill size={24} /> Medicines Directory
        </h2>
        <p className="section-subtitle">
          Search over-the-counter and prescription medicines, compositions, dosages, and safety warnings.
        </p>

        <div className="search-controls">
          <div className="search-input-wrap">
            <Search size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by medicine name, salt composition, or symptom use..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="select-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="otc">Over the Counter (OTC)</option>
            <option value="prescription">Prescription Required (Rx)</option>
          </select>
        </div>
      </div>

      <div className="items-list">
        {filteredMedicines.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: '#6b7280' }}>
            No medicines found matching "{query}".
          </div>
        ) : (
          filteredMedicines.slice(0, 50).map((m, index) => {
            const isExpanded = expandedName === m.name;
            const isRx = (m.prescription || '').toLowerCase().startsWith('y');

            return (
              <div key={m.name} className={`card-item ${isExpanded ? 'expanded' : ''}`}>
                <div className="card-header" onClick={() => toggleExpand(m.name)}>
                  <div className="card-header-main">
                    <span className="card-badge-num">{index + 1}</span>
                    <div className="card-title-group">
                      <h3>{m.name}</h3>
                      <p>{m.composition}</p>
                    </div>
                  </div>

                  <div className="card-meta">
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        background: isRx ? '#fef2f2' : '#f0fdf4',
                        color: isRx ? '#b91c1c' : '#15803d',
                        border: `1px solid ${isRx ? '#fecaca' : '#bbf7d0'}`,
                      }}
                    >
                      {isRx ? 'Rx Required' : 'OTC'}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="card-body">
                    <div className="detail-row">
                      <strong>Indications & Uses</strong>
                      <p>{m.uses}</p>
                    </div>

                    <div className="detail-row">
                      <strong>Standard Dosage</strong>
                      <p>{m.dosage}</p>
                    </div>

                    <div className="detail-row">
                      <strong>Possible Side Effects</strong>
                      <p>{m.sideEffects}</p>
                    </div>

                    <div className="detail-row">
                      <strong>Warnings & Precautions</strong>
                      <p style={{ color: '#b45309' }}>{m.warnings}</p>
                    </div>

                    {m.alternatives && m.alternatives !== 'None listed in source data' && (
                      <div className="detail-row">
                        <strong>Generic Alternatives</strong>
                        <p>{m.alternatives}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {filteredMedicines.length > 50 && (
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
          Showing first 50 results of {filteredMedicines.length}. Use the search bar to refine your query.
        </p>
      )}
    </div>
  );
}
