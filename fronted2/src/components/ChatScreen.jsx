import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Mic, Send, Square, RotateCcw, Copy, Check } from 'lucide-react';
import { findAnswer, NOT_TRAINED } from '../data/charak-knowledge';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: 'Namaste! 🙏 Main Charak Vaani hoon. Apni takleef bolkar ya likhkar bataiye (e.g. pet me dard, bukhar, sar dard).',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat' | 'talk'
  const [copiedId, setCopiedId] = useState(null);

  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages]);

  const quickQuestions = [
    'Pet me dard',
    'Sar dard',
    'Bukhar 102°F',
    'Chakkar aana',
    'Dil me dard',
    'Hath me jalan',
  ];

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), role: 'user', text, time };
    const match = findAnswer(text);

    const aiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      text: match ? null : NOT_TRAINED,
      answer: match || null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    if (!textToSend) setInput('');
  };

  const clearConversation = () => {
    setMessages([
      {
        id: Date.now(),
        role: 'ai',
        text: 'Namaste! Main Charak Vaani hoon. Apni takleef bolkar ya likhkar bataiye.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInput('');
  };

  const copyGuidance = async (message) => {
    const answer = message.answer;
    const content = [
      'Charak Vaani guidance',
      `What to check: ${answer.doctor}`,
      `Possible causes: ${answer.causes}`,
      `${answer.cureTitle}: ${answer.cure.join('; ')}`,
      `Warning signs: ${answer.redFlags || 'None listed.'}`,
      `Severity: ${answer.threat}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(message.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  const toggleListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setListening(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">
            <Leaf size={18} />
          </div>
          <div>
            <div className="chat-header-title">Charak Vaani</div>
            <div className="chat-header-sub">Ayurvedic AI & Voice Consultation</div>
          </div>
        </div>

        <div className="chat-header-actions">
          <div className="chat-mode-tabs">
            <button
              className={`chat-tab-btn ${mode === 'chat' ? 'active' : ''}`}
              onClick={() => setMode('chat')}
            >
              Chat
            </button>
            <button
              className={`chat-tab-btn ${mode === 'talk' ? 'active' : ''}`}
              onClick={() => setMode('talk')}
            >
              <Mic size={12} /> Talk
            </button>
          </div>
          <button className="chat-reset-btn" onClick={clearConversation} title="Start a new consultation">
            <RotateCcw size={14} />
            <span>New</span>
          </button>
        </div>
      </div>

      <div className="messages-stream" ref={streamRef}>
        {messages.map((m) => (
          <div key={m.id} className={`msg-row ${m.role}`}>
            <div className="msg-bubble">
              {m.text && <p>{m.text}</p>}
              {m.answer && (
                <div className="ai-answer-block">
                  <div className="ai-answer-heading">
                    <div>
                      <span className="ai-eyebrow">Charak guidance</span>
                      <strong>Here is a clear starting point</strong>
                    </div>
                    <button
                      className="answer-copy-btn"
                      onClick={() => copyGuidance(m)}
                      title="Copy this guidance"
                    >
                      {copiedId === m.id ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="ai-answer-section">
                    <span className="ai-section-label">What to check</span>
                    <p>{m.answer.doctor}</p>
                  </div>

                  <div className="ai-answer-section">
                    <span className="ai-section-label">Possible causes</span>
                    <p>{m.answer.causes}</p>
                  </div>

                  <div className="ai-answer-section">
                    <span className="ai-section-label">{m.answer.cureTitle}</span>
                    <ul>
                      {m.answer.cure.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  {m.answer.redFlags && (
                    <div className="ai-answer-section ai-warning-section">
                      <span className="ai-section-label">Watch for</span>
                      <p>{m.answer.redFlags}</p>
                    </div>
                  )}

                  <div className="ai-threat-box">
                    <span className="ai-section-label">Severity guide</span>
                    <strong>{m.answer.threat}</strong>
                  </div>
                </div>
              )}
              <span className="msg-time">{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-chips">
        <span style={{ fontSize: '0.72rem', color: '#6b7280', alignSelf: 'center', marginRight: '0.25rem' }}>
          Suggested:
        </span>
        {quickQuestions.map((q) => (
          <button key={q} className="chip-btn" onClick={() => handleSend(q)}>
            {q}
          </button>
        ))}
      </div>

      <form
        className="chat-composer"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <button
          type="button"
          className={`btn-icon ${listening ? 'active' : ''}`}
          onClick={toggleListening}
          title={listening ? 'Stop voice recording' : 'Speak your symptoms'}
        >
          {listening ? <Square size={16} /> : <Mic size={16} />}
        </button>

        <input
          type="text"
          className="chat-input"
          placeholder={listening ? 'Listening... speak now' : 'Ask Charak Vaani about symptoms, remedies...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" className="btn-icon primary" title="Send message">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
