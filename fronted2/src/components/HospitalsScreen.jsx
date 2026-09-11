import React, { useState } from 'react';
import { Stethoscope, Search, MapPin, ChevronDown, ChevronUp, Phone, Clock } from 'lucide-react';
import { hospitals } from '../data/hospitals-data';

export default function HospitalsScreen() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All Cities');
  const [expandedId, setExpandedId] = useState(null);

  const filteredHospitals = hospitals.filter((h) => {
    const matchesQuery =
      query.trim() === '' ||
      (h.name + ' ' + h.location + ' ' + h.type + ' ' + h.specialties.join(' '))
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesCity =
      city === 'All Cities' || h.location.toLowerCase().includes(city.toLowerCase());

    return matchesQuery && matchesCity;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="hospitals-screen">
      <div className="section-header">
        <h2 className="section-title">
          <Stethoscope size={24} /> Verified Ayurveda Hospitals
        </h2>
        <p className="section-subtitle">
          Find premier government institutes, Panchakarma centers, and OPD schedules.
        </p>

        <div className="search-controls">
          <div className="search-input-wrap">
            <Search size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by hospital name, specialty, or area..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="select-filter"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="All Cities">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Kerala">Kerala</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
        </div>
      </div>

      <div className="items-list">
        {filteredHospitals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', color: '#6b7280' }}>
            No hospitals found matching your search.
          </div>
        ) : (
          filteredHospitals.map((h, index) => {
            const isExpanded = expandedId === h.id;
            return (
              <div key={h.id} className={`card-item ${isExpanded ? 'expanded' : ''}`}>
                <div className="card-header" onClick={() => toggleExpand(h.id)}>
                  <div className="card-header-main">
                    <span className="card-badge-num">{index + 1}</span>
                    <div className="card-title-group">
                      <h3>{h.name}</h3>
                      <p>
                        <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                        {h.location} · <span style={{ color: '#0f5132', fontWeight: 600 }}>{h.type}</span>
                      </p>
                    </div>
                  </div>

                  <div className="card-meta">
                    <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>
                      {h.distance}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="card-body">
                    <div className="detail-row">
                      <strong>Address</strong>
                      <p>{h.address}</p>
                    </div>

                    <div className="detail-row">
                      <strong>Contact Phone</strong>
                      <p>
                        <Phone size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {h.contact}
                      </p>
                    </div>

                    <div className="detail-row">
                      <strong>OPD & Operating Timings</strong>
                      <p>
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {h.timings}
                      </p>
                    </div>

                    <div className="detail-row">
                      <strong>Specialties & Treatments</strong>
                      <p>{h.specialties.join(' · ')}</p>
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
