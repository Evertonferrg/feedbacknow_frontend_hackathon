

import React from 'react';

// Recebemos o setView aqui para poder trocar de página
export default function Home({ setView }) {
  return (
    <div className="home-root">
      <h1 className="home-title">FeedbackNow</h1>
      <p className="home-subtitle">Escolha como deseja prosseguir</p>

      <div className="home-cards">
        <div className="home-card glass">
          <h2>Sou Cliente</h2>
          <p>Deseja enviar um feedback sobre um serviço?</p>
          <button
            onClick={() => setView?.("clientes")}
            className="home-card-btn primary"
          >
            Enviar feedback
          </button>
        </div>

        <div className="home-card glass">
          <h2>Menu Empresa</h2>
          <p>Entre para acessar o painel administrativo e relatórios.</p>
          <button
            onClick={() => setView?.("empresa")}
            className="home-card-btn secondary"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}