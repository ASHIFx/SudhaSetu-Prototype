import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import HospitalsScreen from './components/HospitalsScreen';
import DiseasesScreen from './components/DiseasesScreen';
import MedicinesScreen from './components/MedicinesScreen';
import LoginModal, { DEMO_USERS } from './components/LoginModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(DEMO_USERS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync state with URL hash
  const setView = (view) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view === 'home' ? '' : view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'chat', 'hospitals', 'diseases', 'medicines'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      } else if (!hash) {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="app-shell">
      <Navbar
        currentView={currentView}
        setView={setView}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      <main className="main-content">
        {currentView === 'home' && <HomeScreen setView={setView} />}
        {currentView === 'chat' && <ChatScreen />}
        {currentView === 'hospitals' && <HospitalsScreen />}
        {currentView === 'diseases' && <DiseasesScreen />}
        {currentView === 'medicines' && <MedicinesScreen />}
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1.25rem 1rem', textAlign: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
        <p>Sudha Setu © 2026 — Ancient Wisdom, Modern Technology · Prototype by RELIC</p>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={setCurrentUser}
      />
    </div>
  );
}
