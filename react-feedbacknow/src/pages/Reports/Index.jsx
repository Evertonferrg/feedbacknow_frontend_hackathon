import React from 'react';

export default function Reports({ setView, user }) {
  return (
    <div className="page-container">
      <div className="modal-panel glass">
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>Relatórios</h2>

        <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>
          Relatórios de {user?.name ?? 'usuário'}. Aqui estão alguns relatórios de exemplo.
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <button className="home-card-btn primary" onClick={() => alert('Abrir relatório 1 (simulado)')}>Relatório 1</button>
          <button className="home-card-btn primary" onClick={() => alert('Abrir relatório 2 (simulado)')}>Relatório 2</button>
          <button onClick={() => setView?.('dashboard')} className="home-card-btn secondary">Voltar ao Painel</button>
        </div>
      </div>
    </div>
  );
}
