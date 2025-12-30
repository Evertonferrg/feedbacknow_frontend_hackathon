import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home/Index';
import Clientes from './pages/Clientes/Index';
import Login from './pages/Login/Login';
import Dashoard from './pages/Dashboad/Dashoard';
import Feedbacks from './pages/Feedbacks/Index';
import Reports from './pages/Reports/Index';
import './styles/global.css';

function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [filter, setFilter] = useState(null);

  // sample feedbacks data (would normally come from an API)
  const sampleFeedbacks = [
    { id: 1, text: 'Excelente atendimento', sentiment: 'pos', author: 'João', date: '2025-12-28' },
    { id: 2, text: 'Tempo de espera longo', sentiment: 'neg', author: 'Maria', date: '2025-12-27' },
    { id: 3, text: 'Ótima interface', sentiment: 'pos', author: 'Carlos', date: '2025-12-26' },
    { id: 4, text: 'Não gostei do produto', sentiment: 'neg', author: 'Ana', date: '2025-12-25' },
    { id: 5, text: 'Suporte rápido', sentiment: 'pos', author: 'Pedro', date: '2025-12-24' },
    { id: 6, text: 'Erro ao processar pagamento', sentiment: 'neg', author: 'Luiza', date: '2025-12-23' },
    { id: 7, text: 'Recomendo a plataforma', sentiment: 'pos', author: 'Marcos', date: '2025-12-22' },
    { id: 8, text: 'Informações confusas', sentiment: 'neg', author: 'Fernanda', date: '2025-12-21' },
    { id: 9, text: 'Muito intuitivo', sentiment: 'pos', author: 'Rafael', date: '2025-12-20' },
    { id: 10, text: 'Falta de funcionalidades', sentiment: 'neg', author: 'Beatriz', date: '2025-12-19' },
    { id: 11, text: 'Boa experiência', sentiment: 'pos', author: 'Mateus', date: '2025-12-18' },
    { id: 12, text: 'Demora no carregamento', sentiment: 'neg', author: 'Paula', date: '2025-12-17' }
  ];

  switch (view) {
    case 'clientes':
      return <Clientes setView={setView} />;
    case 'empresa':
      return <Login setView={setView} setUser={setCurrentUser} />;
    case 'dashboard':
      return <Dashoard setView={setView} user={currentUser} sampleFeedbacks={sampleFeedbacks} setFilter={setFilter} />;
    case 'reports':
      return <Reports setView={setView} user={currentUser} />;
    case 'feedbacks':
      return <Feedbacks setView={setView} filter={filter} feedbacks={sampleFeedbacks} />;
    default:
      return <Home setView={setView} />;
  }
}

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
