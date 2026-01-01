import { useEffect, useRef } from "react";

export default function Clientes({ setView }) {
  const textareaRef = useRef(null);

  // focus textarea automatically
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="page-container">
      <div className="modal-panel glass" style={{ position: 'relative' }}>
        <button className="close-btn" onClick={() => setView?.('home')}>✖</button>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>Sua Opinião</h2>

        <textarea
          ref={textareaRef}
          className="textarea-feedback"
          placeholder="Escreva seu feedback..."
        />

        <div className="form-actions">
          <button
            onClick={() => alert('Feedback enviado (simulado)')}
            className="home-card-btn primary"
          >
            Enviar Feedback
          </button>

          <button onClick={() => setView?.('home')} className="home-card-btn secondary">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}