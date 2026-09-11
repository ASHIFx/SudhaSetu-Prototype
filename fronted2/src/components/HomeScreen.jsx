import React from 'react';
import { Leaf, ArrowRight, Stethoscope, HeartPulse, Pill, MessageSquare } from 'lucide-react';

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

      <section className="features-grid">
        {features.map((f) => (
          <div key={f.id} className="feature-card" onClick={() => setView(f.id)}>
            <div className="feature-icon-wrap">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-text">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
