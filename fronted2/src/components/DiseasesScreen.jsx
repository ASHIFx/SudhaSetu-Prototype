import React, { useState } from 'react';
import { HeartPulse, Search, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { diseases } from '../data/medical-data';

function getConditionThreat(name) {
  const n = (name || '').toLowerCase();

  const highKeywords = [
    'asthma', 'poisoning', 'dehydration', 'uti', 'stomach infection', 'wound infection', 'migraine'
  ];
  if (highKeywords.some((k) => n.includes(k))) {
    return {
      level: 'High',
      className: 'threat-high',
      icon: <AlertTriangle size={12} />,
      summary: 'High Severity — Immediate medical attention recommended if persistent or escalating.'
    };
  }

  const mediumKeywords = [
    'vomit', 'diarrhea', 'burn', 'tooth', 'ear pain', 'gastritis', 'sinus', 'body pain',
    'cough', 'fever', 'ringworm', 'scabies', 'worm', 'throat infection', 'joint pain', 'back pain', 'deficiency', 'anxiety'
  ];
  if (mediumKeywords.some((k) => n.includes(k))) {
    return {
      level: 'Medium',
      className: 'threat-medium',
      icon: <AlertCircle size={12} />,
      summary: 'Moderate Severity — Monitor symptoms closely. Consult a doctor if not improved in 48-72 hrs.'
    };
  }

  return {
    level: 'Low',
    className: 'threat-low',
    icon: <CheckCircle2 size={12} />,
    summary: 'Low Severity — Mild condition typically manageable with rest, hydration, and home care.'
  };
}

export default function DiseasesScreen() {
  const [query, setQuery] = useState('');
  const [expandedName, setExpandedName] = useState(null);

  const filteredDiseases = diseases.filter((d) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      (d.name || '').toLowerCase().includes(q) ||
      (d.symptoms || '').toLowerCase().includes(q) ||
      (d.description || '').toLowerCase().includes(q)
    );
  });

  const toggleExpand = (name) => {
    setExpandedName(expandedName === name ? null : name);
  };

  return (
    <div className="diseases-screen">
      <div className="section-header">
        <h2 className="section-title">
          <HeartPulse size={24} /> Diseases & Ayurvedic Care
        </h2>
        <p className="section-subtitle">
          Authentic clinical guidance, dosha imbalances, home remedies, and emergency red flags.
        </p>

        <div className="search-controls">
          <div className="search-input-wrap">
            <Search size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search condition, dosha, or symptom (e.g. fever, cough, acidity)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="items-list">
        {filteredDiseases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: '#6b7280' }}>
            No health conditions found matching "{query}".
          </div>
        ) : (
          filteredDiseases.map((d, index) => {
            const isExpanded = expandedName === d.name;
            const threat = getConditionThreat(d.name);

            return (
              <div key={d.name} className={`card-item ${isExpanded ? 'expanded' : ''}`}>
                <div className="card-header" onClick={() => toggleExpand(d.name)}>
                  <div className="card-header-main">
                    <span className="card-badge-num">{index + 1}</span>
                    <div className="card-title-group">
                      <h3>{d.name}</h3>
                      <p>{d.symptoms.slice(0, 100)}{d.symptoms.length > 100 ? '...' : ''}</p>
                    </div>
                  </div>

                  <div className="card-meta">
                    <span className={`threat-tag ${threat.className}`}>
                      {threat.icon} {threat.level}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="card-body">
                    <div className="detail-row" style={{ gridColumn: '1 / -1' }}>
                      <strong>Threat Level Assessment</strong>
                      <p style={{ fontWeight: 600, color: threat.level === 'High' ? '#b91c1c' : threat.level === 'Medium' ? '#b45309' : '#15803d' }}>
                        {threat.summary}
                      </p>
                    </div>

                    <div className="detail-row" style={{ gridColumn: '1 / -1' }}>
                      <strong>Clinical & Ayurvedic Overview</strong>
                      <p>{d.description}</p>
                    </div>

                    <div className="detail-row">
                      <strong>Key Symptoms</strong>
                      <p>{d.symptoms}</p>
                    </div>

                    <div className="detail-row">
                      <strong>Ayurvedic Care & Remedies</strong>
                      <p>{d.care}</p>
                    </div>

                    <div className="detail-row">
                      <strong>When to See a Doctor (Red Flags)</strong>
                      <p style={{ color: '#b91c1c' }}>{d.doctor}</p>
                    </div>

                    <div className="detail-row">
                      <strong>What to Avoid (Apathya)</strong>
                      <p>{d.avoid}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
