import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

export default function Navbar({ currentView, setView, currentUser, onOpenLogin }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'chat', label: 'Charak Vaani' },
    { id: 'hospitals', label: 'Hospitals' },
    { id: 'diseases', label: 'Diseases' },
    { id: 'medicines', label: 'Medicines' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button className="brand-link" onClick={() => setView('home')} aria-label="Go to home">
          <div>
            <span className="brand-name">SUDHA SETU</span>
            <span className="brand-subtitle">~ by RELIC</span>
          </div>
        </button>

        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div>
          <button className="nav-user-badge" onClick={onOpenLogin} title="Prototype Demo User">
            {currentUser.role === 'doctor' ? (
              <ShieldCheck size={14} color="#0f5132" />
            ) : (
              <User size={14} color="#0f5132" />
            )}
            <span>{currentUser.name}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
