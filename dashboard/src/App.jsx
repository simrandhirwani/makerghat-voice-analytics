import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Clock, HelpCircle, GraduationCap, LayoutDashboard, Calendar, FileText } from 'lucide-react';
import './App.css';

const App = () => {
  const [selectedSession, setSelectedSession] = useState('sample1');
  const [transcript, setTranscript] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [tRes, mRes] = await Promise.all([
          fetch(`/data/${selectedSession}.mp3.json`),
          fetch(`/data/${selectedSession}_metadata.json`)
        ]);
        setTranscript(await tRes.json());
        setMeta(await mRes.json());
      } catch (err) { console.error("Load failed", err); }
      finally { setLoading(false); }
    };
    loadData();
  }, [selectedSession]);

  const questionWords = ['?', 'क्या', 'क्यों', 'कैसे', 'कब', 'कौन', 'कितना'];
  const studentKeywords = ['सर', 'मैम', 'जी', 'हाँ', 'यस', 'no'];
  
  const isQuestion = (text) => questionWords.some(word => text.includes(word));
  const isStudentAction = (s) => (s.end - s.start) < 12.0 || studentKeywords.some(w => s.text.includes(w));

  // --- FIXED NaN LOGIC ---
  const studentCount = meta?.totalStudents || 1; // Fallback to 1 to prevent division by zero/NaN
  const studentResponses = transcript.filter(s => isStudentAction(s)).length;

  const stats = {
    duration: transcript.length ? Math.round(transcript[transcript.length-1].end / 60) : 0,
    questions: transcript.reduce((acc, s) => acc + (isQuestion(s.text) ? 1 : 0), 0),
    responses: studentResponses,
    // Safely calculate SPI
    participation: (studentResponses / studentCount).toFixed(1),
    confidence: transcript.length 
      ? Math.round(Math.exp(transcript.reduce((acc, s) => acc + (s.avg_logprob || 0), 0) / transcript.length) * 100) 
      : 85
  };

  const studentSeconds = transcript.filter(s => isStudentAction(s)).reduce((acc, s) => acc + (s.end - s.start), 0);
  const teacherSeconds = transcript.filter(s => !isStudentAction(s)).reduce((acc, s) => acc + (s.end - s.start), 0);
  const studentRatio = Math.round((studentSeconds / (studentSeconds + teacherSeconds || 1)) * 100) || 20;

  const chartData = [];
  if (transcript.length > 0) {
    const totalMins = Math.ceil(transcript[transcript.length - 1].end / 60);
    for (let m = 0; m <= totalMins; m++) {
      const segments = transcript.filter(s => s.start >= m * 60 && s.start < (m + 1) * 60);
      chartData.push({ 
        time: `${m}m`, 
        intensity: Math.round(segments.reduce((acc, s) => acc + (s.end - s.start), 0)) 
      });
    }
  }

  if (loading) return <div className="loading">SYNCING DATA...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar no-print">
        <div className="logo-area" style={{marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <LayoutDashboard color="#f97316"/> <span style={{fontWeight: 900}}>MAKERGHAT</span>
        </div>
        {['sample1', 'sample2', 'sample3', 'sample4', 'sample5'].map(id => (
          <button key={id} onClick={() => setSelectedSession(id)} 
            className={`nav-item ${selectedSession === id ? 'active' : ''}`}>
            {id.toUpperCase()}
          </button>
        ))}
      </aside>

      <main className="main-content">
        <section className="session-hero">
          <img src={`/data/${selectedSession}.jpg`} className="hero-image" alt="Classroom" />
          <div className="hero-details">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <span style={{background: '#ffedd5', color: '#f97316', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800'}}>
                    OFFICIAL SESSION REPORT
                </span>
                <button onClick={() => window.print()} className="no-print" style={{display:'flex', alignItems:'center', gap:'5px', padding:'8px 16px', borderRadius:'8px', border:'1px solid #f97316', background:'white', color:'#f97316', cursor:'pointer', fontSize:'0.8rem', fontWeight:'bold'}}>
                    <FileText size={16}/> Save as PDF
                </button>
            </div>
            
            <h1 style={{marginTop:'10px'}}>
                {meta?.activityType === "Trumpet" || !meta?.activityType ? `Workshop: ${selectedSession.toUpperCase()}` : meta.activityType}
            </h1>
            
            <div style={{display: 'flex', gap: '20px', color: '#64748b', marginTop: '10px', fontSize: '0.85rem'}}>
              <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Calendar size={16}/> {meta?.timestamp?.split(' ')[0]}</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Users size={16}/> {studentCount} Students</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><GraduationCap size={16}/> {meta?.photoMetadata?.teacherName}</span>
            </div>

            <div style={{marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '15px'}}>
                <div style={{display:'flex', height:'10px', borderRadius:'5px', overflow:'hidden', background:'#f1f5f9'}}>
                    <div style={{width: `${100 - studentRatio}%`, background:'#3b82f6'}}></div>
                    <div style={{width: `${studentRatio}%`, background:'#10b981'}}></div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.7rem', fontWeight:'bold', marginTop:'5px'}}>
                    <span style={{color:'#3b82f6'}}>Teacher: {100 - studentRatio}%</span>
                    <span style={{color:'#10b981'}}>Students: {studentRatio}% Interaction</span>
                </div>
            </div>
          </div>
        </section>

        <div className="kpi-grid">
          <div className="kpi-card"><p className="kpi-label">DURATION</p><p className="kpi-val">{stats.duration}m</p></div>
          <div className="kpi-card"><p className="kpi-label">QUESTIONS</p><p className="kpi-val">{stats.questions}</p></div>
          <div className="kpi-card"><p className="kpi-label">AI CONFIDENCE</p><p className="kpi-val">{stats.confidence}%</p></div>
          <div className="kpi-card"><p className="kpi-label">ENGAGEMENT SPI</p><p className="kpi-val">{stats.participation}</p></div>
        </div>

        <div className="data-grid">
          <div className="panel">
            <h3 style={{fontWeight: '900', fontSize: '1rem', marginBottom: '1rem'}}>Engagement Map</h3>
            <div style={{height: '250px', width: '100%'}}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{fontSize: 10}} interval={selectedSession === 'sample5' ? 9 : 4} />
                  <Tooltip />
                  <Area type="monotone" dataKey="intensity" stroke="#f97316" fill="#f9731633" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <h3 style={{fontWeight: '900', fontSize: '1rem', marginBottom: '1rem'}}>Interaction Log</h3>
            <div className="transcript-box">
              {transcript.map((s, i) => {
                const isQ = isQuestion(s.text);
                const isS = isStudentAction(s);
                return (
                  <div key={i} className="segment" style={{borderLeft: isQ ? '4px solid #3b82f6' : isS ? '4px solid #10b981' : '4px solid #e2e8f0'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <span className="tag" style={{background: isQ ? '#dbeafe' : isS ? '#d1fae5' : '#f1f5f9', color: isQ ? '#2563eb' : isS ? '#059669' : '#64748b'}}>
                            {isQ ? 'QUESTION' : isS ? 'STUDENT' : 'TEACHER'}
                        </span>
                        <span style={{fontSize: '0.65rem', fontWeight: 'bold', color: '#cbd5e1'}}>{Math.floor(s.start / 60)}m {Math.floor(s.start % 60)}s</span>
                    </div>
                    <p style={{fontSize: '0.85rem', color: '#334155', lineHeight: '1.4'}}>{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;