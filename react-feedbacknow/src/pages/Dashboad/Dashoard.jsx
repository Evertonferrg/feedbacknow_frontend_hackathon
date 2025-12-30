import React, { useState } from 'react';

export default function Dashoard({ setView, user, sampleFeedbacks = [], setFilter }) {
  const [collapsed, setCollapsed] = useState(false);
  const posCount = (sampleFeedbacks || []).filter(f => f.sentiment === 'pos').length;
  const negCount = (sampleFeedbacks || []).filter(f => f.sentiment === 'neg').length;
  const total = posCount + negCount;

  const series = [5, 8, 3, -2, -5, 2, 7, 4, -1, 6, 9, -3];

  return (
    <div className={`admin-root ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem' }}>
          <div className="sidebar-brand">FeedbackNow</div>
          {/* small hamburger aligned to brand in the sidebar */}
          <button className="sidebar-toggle aside-toggle" onClick={() => setCollapsed(s => !s)} aria-label="Toggle sidebar">≡</button>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-link" onClick={() => setView?.('dashboard')}>Visão Geral</button>
          <button className="sidebar-link" onClick={() => setView?.('reports')}>Relatórios</button>
          <button className="sidebar-link" onClick={() => setView?.('home')}>Sair</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-main-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div>
              <h2 style={{ margin: 0 }}>Bem-vindo{user?.name ? `, ${user.name}` : ''}</h2>
              <p className="muted"><span>Visão geral do sistema</span> <span style={{ marginLeft: '0.5rem' }}>Estatísticas rápidas para as caixas</span></p>
            </div>
          </div>
        </header>

        <section className="stat-grid">
          <button className="stat-card" onClick={() => { setFilter?.('pos'); setView?.('feedbacks'); }}>
            <div className="stat-value">{posCount}</div>
            <div className="stat-label">Feedbacks positivos</div>
          </button>
          <button className="stat-card" onClick={() => { setFilter?.('neg'); setView?.('feedbacks'); }}>
            <div className="stat-value">{negCount}</div>
            <div className="stat-label">Feedbacks negativos</div>
          </button>
          <button className="stat-card" onClick={() => { setFilter?.('mixed'); setView?.('feedbacks'); }}>
            <div className="stat-value">{total}</div>
            <div className="stat-label">Acessos</div>
          </button>
        </section>

        {/* Charts: line + donut side-by-side (dynamic SVG, shows positive + negative) */}
        <section className="charts">
          <div className="chart-card">
            <h4>Feedbacks ao longo do tempo</h4>
            {/* Inline dynamic SVG line chart built from sample data */}
            {(() => {
              const labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
              const width = 600;
              const height = 180;
              const padding = 20;
              const innerW = width - padding * 2;
              const innerH = height - padding * 2;
              const max = Math.max(...series, 0);
              const min = Math.min(...series, 0);
              const range = max - min || 1;

              const points = series.map((v, i) => {
                const x = padding + (i / (series.length - 1)) * innerW;
                const y = padding + ((max - v) / range) * innerH;
                return [x, y, v];
              });

              // separate positive and negative series
              const posPoints = points.map(([x,y,v]) => [x, v > 0 ? y : null]);
              const negPoints = points.map(([x,y,v]) => [x, v < 0 ? y : null]);

              const posPath = posPoints.filter(p=>p[1]!=null).map(p=>p.join(',')).join(' ');
              const negPath = negPoints.filter(p=>p[1]!=null).map(p=>p.join(',')).join(' ');

              const zeroY = padding + ((max - 0) / range) * innerH;

              return (
                <svg viewBox={`0 0 ${width} ${height}`} className="chart-line" preserveAspectRatio="none">
                  <line x1={padding} x2={width-padding} y1={padding} y2={padding} strokeOpacity="0.06" stroke="#fff"/>
                  <line x1={padding} x2={width-padding} y1={zeroY} y2={zeroY} strokeOpacity="0.12" stroke="#fff"/>
                  <line x1={padding} x2={width-padding} y1={height-padding} y2={height-padding} strokeOpacity="0.06" stroke="#fff"/>

                  {/* positive area */}
                  <path d={`M ${points[0][0]},${zeroY} L ${points.map((p,i)=> (series[i]>0 ? `${p[0]},${Math.min(p[1], zeroY)}` : `${p[0]},${zeroY}`)).join(' ')} L ${points[points.length-1][0]},${zeroY} Z`} fill="rgba(34,197,94,0.12)" stroke="none" />
                  {/* negative area */}
                  <path d={`M ${points[0][0]},${zeroY} L ${points.map((p,i)=> (series[i]<0 ? `${p[0]},${Math.max(p[1], zeroY)}` : `${p[0]},${zeroY}`)).join(' ')} L ${points[points.length-1][0]},${zeroY} Z`} fill="rgba(239,68,68,0.12)" stroke="none" />

                  {/* positive polyline */}
                  {posPath && <polyline fill="none" stroke="#10b981" strokeWidth="2" points={posPath} />}
                  {/* negative polyline */}
                  {negPath && <polyline fill="none" stroke="#ef4444" strokeWidth="2" points={negPath} />}

                  {/* points */}
                  {points.map((p, i) => (
                    <circle key={i} cx={p[0]} cy={p[1]} r={3} fill={series[i] >= 0 ? '#10b981' : '#ef4444'} />
                  ))}

                  {/* labels */}
                  {labels.map((lab, i) => {
                    const x = padding + (i / (labels.length - 1)) * innerW;
                    return <text key={i} x={x} y={height - 4} fontSize="10" fill="#9ca3af" textAnchor="middle">{lab}</text>;
                  })}
                </svg>
              );
            })()}
          </div>

          <div className="chart-card">
            <h4>Distribuição</h4>
            {/* donut showing positive vs negative proportions using sampleFeedbacks */}
            {(() => {
              const seriesLocal = (sampleFeedbacks || []).map(f => f.sentiment === 'pos' ? 1 : -1);
              const pos = seriesLocal.filter(v=>v>0).reduce((s,v)=>s+v,0);
              const neg = Math.abs(seriesLocal.filter(v=>v<0).reduce((s,v)=>s+v,0));
              const totalLocal = pos + neg || 1;
              const posPct = pos / totalLocal;
              const negPct = neg / totalLocal;
              const circumference = 2 * Math.PI * 15.9; // r=15.9155
              const posLen = (circumference * posPct);
              const negLen = (circumference * negPct);

              return (
                <div style={{ textAlign: 'center' }}>
                  <svg viewBox="0 0 42 42" className="chart-donut" width="160" height="160">
                    {/* draw negative first */}
                    <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${negLen.toFixed(2)} ${(circumference-negLen).toFixed(2)}`} transform="rotate(-90 21 21)" />
                    {/* draw positive offset by negative length */}
                    <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray={`${posLen.toFixed(2)} ${(circumference-posLen).toFixed(2)}`} strokeDashoffset={`${(-negLen).toFixed(2)}`} transform="rotate(-90 21 21)" />
                    <circle cx="21" cy="21" r="10" fill="#0b1220" />
                  </svg>
                  <div style={{ marginTop: '0.5rem', color: '#e6eefc' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem' }}>Pos: {Math.round(posPct*100)}%</span>
                    <span style={{ color: '#ef4444' }}>Neg: {Math.round(negPct*100)}%</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        <section className="recent-feedback">
          <h3>Últimos feedbacks</h3>
          <ul>
            {(sampleFeedbacks || []).slice().sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,6).map(f => (
              <li key={f.id}>{f.text}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
