import React from 'react';
import { Leaf, ArrowRight, Stethoscope, HeartPulse, Pill, MessageSquare, ShieldCheck, Activity, Search } from 'lucide-react';

export default function HomeScreen({ setView }) {
  const features = [
    {
      id: 'chat',
      title: 'Charak Vaani',
      desc: 'AI-assisted symptom checker with classical Ayurvedic care and voice consultation.',
      icon: <Leaf size={22} />,
    },
    {
      id: 'hospitals',
      title: 'Ayurveda Hospitals',
      desc: 'Find verified government institutes, Panchakarma centers, and OPD timings.',
      icon: <Stethoscope size={22} />,
    },
    {
      id: 'diseases',
      title: 'Diseases & Symptoms',
      desc: 'Detailed dosha assessment, clinical overviews, home remedies, and threat alerts.',
      icon: <HeartPulse size={22} />,
    },
    {
      id: 'medicines',
      title: 'Medicines Directory',
      desc: 'Searchable database of compositions, dosage recommendations, and safety warnings.',
      icon: <Pill size={22} />,
    },
  ];

  const snapshotItems = [
    { value: '24/7', label: 'Self-serve guidance', icon: <Activity size={17} /> },
    { value: '12+', label: 'Ayurvedic topics', icon: <Search size={17} /> },
    { value: '100%', label: 'Prototype data', icon: <ShieldCheck size={17} /> },
  ];

  return (
    <div className="home-screen">
      <section className="home-hero">
        <span className="hero-tag">
          <Leaf size={14} /> Thoughtful care, rooted in Ayurveda
        </span>
        <h1 className="hero-title">Sudha Setu</h1>
        <p className="hero-desc">
          Ayurvedic wisdom, made easier to explore. Find trusted hospitals, understand your symptoms,
          and connect with guidance for your next step.
        </p>
        <div className="hero-cta-row">
          <button className="btn-primary" onClick={() => setView('chat')}>
            <MessageSquare size={18} />
            <span>Consult Charak Vaani</span>
            <ArrowRight size={16} />
          </button>
          <button className="btn-outline" onClick={() => setView('hospitals')}>
            <Stethoscope size={18} />
            <span>Explore Hospitals</span>
          </button>
        </div>
      </section>

      <section className="care-snapshot" aria-label="Sudha Setu care snapshot">
        <div className="snapshot-intro">
          <span className="snapshot-kicker">Care snapshot</span>
          <h2>A calmer way to find your next step.</h2>
          <p>Start with a symptom, a trusted facility, or a medicine you want to understand.</p>
        </div>
        <div className="snapshot-items">
          {snapshotItems.map((item) => (
            <div className="snapshot-item" key={item.label}>
              <span className="snapshot-icon">{item.icon}</span>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="features-grid">
        {features.map((f) => (
          <button key={f.id} className="feature-card" onClick={() => setView(f.id)}>
            <div className="feature-icon-wrap">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-text">{f.desc}</p>
            <span className="feature-link">Open guide <ArrowRight size={14} /></span>
          </button>
        ))}
      </section>

      <p className="prototype-note">
        <ShieldCheck size={15} /> Prototype guidance is educational and does not replace a qualified clinician.
      </p>
    </div>
  );
}
