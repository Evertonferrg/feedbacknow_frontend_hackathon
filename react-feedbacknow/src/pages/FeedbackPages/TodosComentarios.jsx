// import React, { useState } from 'react';

// export default function TodosComentarios({ sampleFeedbacks = [], renderLineChart }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [page, setPage] = useState(0);

//   // 1. Lógica de Filtragem e Métricas
//   const posFeedbacks = sampleFeedbacks.filter(f => f.sentiment === 'pos');
//   const negFeedbacks = sampleFeedbacks.filter(f => f.sentiment === 'neg');
  
//   // 2. Paginação (Fatiamento de 10 em 10)
//   const itemsPerPage = 10;
//   const currentPos = posFeedbacks.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
//   const currentNeg = negFeedbacks.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
//   const totalPages = Math.ceil(Math.max(posFeedbacks.length, negFeedbacks.length) / itemsPerPage);

//   return (
//     <div className={`admin-root ${collapsed ? 'collapsed' : ''}`}>
      
//       {/* SIDEBAR CORRIGIDA: Hamburger fixo à esquerda */}
//       <aside className="admin-sidebar">
//         <div className="sidebar-header-box" style={{ display: 'flex', alignItems: 'center', height: '60px', padding: '0 15px' }}>
//           <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>≡</button>
//           {!collapsed && <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>FeedbackNow</span>}
//         </div>
//         <nav className="sidebar-nav">
//           <button className="sidebar-link">Dashboard</button>
//           <button className="sidebar-link active">Feedbacks</button>
//           <button className="sidebar-link">Relatórios</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         {/* HEADER COM ÍCONES SOCIAIS */}
//         <header className="admin-main-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
//           <h2 style={{ margin: 0 }}>Gestão de Mensagens</h2>
//           <div style={{ display: 'flex', gap: '20px' }}>
//              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Instagram</a>
//              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a>
//           </div>
//         </header>

//         {/* --- CONTEÚDO CENTRAL --- */}
//         <div className="feedbacks-container" style={{ padding: '0 20px' }}>
          
//           {/* PARTE SUPERIOR: GRÁFICO (ESQ) E QUANTIDADES (DIR) */}
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px', marginBottom: '30px' }}>
            
//             {/* Box do Gráfico */}
//             <div style={{ background: '#1e2235', padding: '20px', borderRadius: '12px' }}>
//               <h4 style={{ margin: '0 0 15px 0' }}>Evolução dos Feedbacks</h4>
//               <div style={{ height: '220px', border: '1px border-color: rgba(255,255,255,0.1)' }}>
//                 {/* Aqui você renderiza o gráfico de linha */}
//                 {renderLineChart ? renderLineChart() : <div style={{textAlign:'center', color:'#555'}}>Gráfico de Linha</div>}
//               </div>
//             </div>

//             {/* Boxes de Quantidade Empilhados (Um embaixo do outro) */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//               <div style={{ background: '#1e2235', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #10b981', textAlign: 'center' }}>
//                 <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Feedbacks Positivos</span>
//                 <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>{posFeedbacks.length}</div>
//               </div>
//               <div style={{ background: '#1e2235', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #ef4444', textAlign: 'center' }}>
//                 <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Feedbacks Negativos</span>
//                 <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>{negFeedbacks.length}</div>
//               </div>
//             </div>
//           </div>

//           {/* PARTE INFERIOR: MENSAGENS (10 POSITIVAS | 10 NEGATIVAS) */}
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//             {/* Coluna Positiva */}
//             <div className="msg-column">
//               <h5 style={{ color: '#10b981', borderBottom: '1px solid #333', paddingBottom: '10px' }}>✔ Positivas</h5>
//               {currentPos.map(f => (
//                 <div key={f.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', marginBottom: '10px', borderRadius: '8px', borderRight: '4px solid #10b981', fontSize: '0.85rem' }}>
//                   {f.text}
//                 </div>
//               ))}
//             </div>

//             {/* Coluna Negativa */}
//             <div className="msg-column">
//               <h5 style={{ color: '#ef4444', borderBottom: '1px solid #333', paddingBottom: '10px' }}>✖ Negativas</h5>
//               {currentNeg.map(f => (
//                 <div key={f.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', marginBottom: '10px', borderRadius: '8px', borderRight: '4px solid #ef4444', fontSize: '0.85rem' }}>
//                   {f.text}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CONTROLES DE PAGINAÇÃO (SETAS) */}
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', margin: '40px 0' }}>
//             <button 
//               onClick={() => setPage(p => p - 1)} 
//               disabled={page === 0}
//               style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', background: '#2a2f45', color: 'white', border: 'none' }}
//             >
//               ← Voltar
//             </button>
//             <span style={{ color: '#9ca3af' }}>Página {page + 1} de {totalPages || 1}</span>
//             <button 
//               onClick={() => setPage(p => p + 1)} 
//               disabled={page >= totalPages - 1}
//               style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', background: '#2a2f45', color: 'white', border: 'none' }}
//             >
//               Próximas →
//             </button>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useState } from 'react';

// // --- COMPONENTE TODOS COMENTARIOS (Integrado para evitar erros de importação) ---
// const TodosComentarios = ({ sampleFeedbacks = [], renderLineChart, setView }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [page, setPage] = useState(0);

//   const feedbacks = Array.isArray(sampleFeedbacks) ? sampleFeedbacks : [];
//   const posFeedbacks = feedbacks.filter(f => f.sentiment === 'pos');
//   const negFeedbacks = feedbacks.filter(f => f.sentiment === 'neg');
  
//   const itemsPerPage = 10;
//   const currentPos = posFeedbacks.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
//   const currentNeg = negFeedbacks.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
//   const totalPages = Math.ceil(Math.max(posFeedbacks.length, negFeedbacks.length) / itemsPerPage);

//   const handleNavigation = (viewName) => {
//     if (setView) setView(viewName);
//   };

//   return (
//     <div className={`admin-root ${collapsed ? 'collapsed' : ''}`}>
//       <style>{`
//         .admin-root { display: flex; min-height: 100vh; background: #0f172a; color: white; font-family: sans-serif; width: 100%; }
//         .admin-sidebar { 
//           width: ${collapsed ? '70px' : '240px'}; 
//           background: #020617; border-right: 1px solid #1e293b; 
//           transition: width 0.3s; display: flex; flex-direction: column;
//           position: sticky; top: 0; height: 100vh;
//         }
//         .admin-main { flex: 1; display: flex; flex-direction: column; overflow-x: hidden; }
//         .sidebar-nav { display: flex; flex-direction: column; padding: 10px; gap: 5px; }
//         .sidebar-link { 
//           background: none; border: none; color: #94a3b8; padding: 12px; 
//           text-align: left; cursor: pointer; border-radius: 6px; font-size: 0.9rem;
//         }
//         .sidebar-link:hover { background: #1e293b; color: white; }
//         .sidebar-link.active { background: #6366f1; color: white; }
//         .sidebar-toggle { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 10px; }
//       `}</style>

//       <aside className="admin-sidebar">
//         <div className="sidebar-header-box" style={{ display: 'flex', alignItems: 'center', height: '60px', padding: '0 15px' }}>
//           <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>≡</button>
//           {!collapsed && <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#6366f1' }}>FeedbackNow</span>}
//         </div>
//         <nav className="sidebar-nav">
//           <button className="sidebar-link" onClick={() => handleNavigation('dashboard')}>Dashboard</button>
//           <button className="sidebar-link active" onClick={() => handleNavigation('todos')}>Feedbacks</button>
//           <button className="sidebar-link" onClick={() => handleNavigation('relatorios')}>Relatórios</button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-main-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
//           <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Gestão de Mensagens</h2>
//           <button 
//             onClick={() => handleNavigation('dashboard')} 
//             style={{ background: '#334155', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
//           >
//             Voltar ao Dashboard
//           </button>
//         </header>

//         <div className="feedbacks-container" style={{ padding: '20px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px', marginBottom: '30px' }}>
//             <div style={{ background: '#1e2235', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
//               <h4 style={{ margin: '0 0 15px 0' }}>Evolução dos Feedbacks</h4>
//               <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
//                 {renderLineChart ? renderLineChart() : <div style={{textAlign:'center', color:'#4b5563'}}>Gráfico indisponível</div>}
//               </div>
//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//               <div style={{ background: '#1e2235', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #10b981' }}>
//                 <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>Positivos</span>
//                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{posFeedbacks.length}</div>
//               </div>
//               <div style={{ background: '#1e2235', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #ef4444' }}>
//                 <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>Negativos</span>
//                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{negFeedbacks.length}</div>
//               </div>
//             </div>
//           </div>

//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//             <div className="msg-column">
//               <h5 style={{ color: '#10b981', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '15px' }}>✔ Positivas</h5>
//               {currentPos.map(f => (
//                 <div key={f.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', marginBottom: '10px', borderRadius: '8px', borderRight: '4px solid #10b981', fontSize: '0.85rem' }}>
//                   {f.text}
//                 </div>
//               ))}
//             </div>
//             <div className="msg-column">
//               <h5 style={{ color: '#ef4444', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '15px' }}>✖ Negativas</h5>
//               {currentNeg.map(f => (
//                 <div key={f.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', marginBottom: '10px', borderRadius: '8px', borderRight: '4px solid #ef4444', fontSize: '0.85rem' }}>
//                   {f.text}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', margin: '40px 0' }}>
//             <button 
//               onClick={() => setPage(p => p - 1)} 
//               disabled={page === 0} 
//               style={{ padding: '10px 20px', cursor: 'pointer', background: '#334155', color: 'white', border: 'none', borderRadius: '5px', opacity: page === 0 ? 0.5 : 1 }}
//             >
//               ← Anterior
//             </button>
//             <span style={{ color: '#9ca3af' }}>Página {page + 1} de {totalPages || 1}</span>
//             <button 
//               onClick={() => setPage(p => p + 1)} 
//               disabled={page >= totalPages - 1} 
//               style={{ padding: '10px 20px', cursor: 'pointer', background: '#334155', color: 'white', border: 'none', borderRadius: '5px', opacity: page >= totalPages - 1 ? 0.5 : 1 }}
//             >
//               Próxima →
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// // --- COMPONENTE PRINCIPAL APP ---
// export default function App() {
//   const [view, setView] = useState('dashboard');

//   const sampleFeedbacks = [
//     { id: 1, text: "Excelente atendimento!", sentiment: "pos" },
//     { id: 2, text: "A entrega demorou muito.", sentiment: "neg" },
//     { id: 3, text: "Produto de alta qualidade.", sentiment: "pos" },
//     { id: 4, text: "O suporte não responde.", sentiment: "neg" },
//     { id: 5, text: "Muito satisfeito com a compra.", sentiment: "pos" }
//   ];

//   const renderLineChart = () => (
//     <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
//       [Simulação de Gráfico de Linha]
//     </div>
//   );

//   const renderView = () => {
//     switch (view) {
//       case 'dashboard':
//         return (
//           <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'white' }}>
//             <h1 style={{ fontSize: '2rem' }}>Bem-vindo ao Dashboard</h1>
//             <p style={{ color: '#94a3b8' }}>Clique abaixo para gerir os seus comentários.</p>
//             <button 
//               onClick={() => setView('todos')}
//               style={{ padding: '12px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
//             >
//               Ver Todos os Feedbacks
//             </button>
//           </div>
//         );

//       case 'todos':
//         return (
//           <TodosComentarios 
//             sampleFeedbacks={sampleFeedbacks} 
//             renderLineChart={renderLineChart}
//             setView={setView} 
//           />
//         );

//       case 'relatorios':
//         return (
//           <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
//             <h2>Módulo de Relatórios</h2>
//             <button onClick={() => setView('dashboard')} style={{ marginLeft: '20px' }}>Voltar</button>
//           </div>
//         );

//       default:
//         return (
//           <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
//             <h1>Página Inicial</h1>
//             <button onClick={() => setView('dashboard')}>Entrar no Sistema</button>
//           </div>
//         );
//     }
//   };

//   return (
//     <div style={{ background: '#0f172a', minHeight: '100vh' }}>
//       {renderView()}
//     </div>
//   );
// }

import React, { useState, useMemo } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const TodosComentarios = ({ sampleFeedbacks = [] }) => {
  const [pagina, setPagina] = useState(0);
  const itensPorPagina = 20;

  // 1. Extrair todas as mensagens dos dados do gráfico
  const todasMensagens = useMemo(() => {
    return sampleFeedbacks.flatMap(f => f.mensagens || []);
  }, [sampleFeedbacks]);

  // 2. Cálculos para os Cards (Totais de todas as mensagens)
  const totalPos = todasMensagens.filter(m => m.sentiment === "pos").length;
  const totalNeg = todasMensagens.filter(m => m.sentiment === "neg").length;

  // 3. Paginação (20 em 20)
  const inicio = pagina * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const mensagensExibidas = todasMensagens.slice(inicio, fim);
  const totalPaginas = Math.ceil(todasMensagens.length / itensPorPagina);

  return (
    <div style={{ padding: "20px", color: "#f8fafc" }}>
      
      {/* SEÇÃO SUPERIOR: Gráfico + Cards Empilhados */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", marginBottom: "25px" }}>
        
        {/* Gráfico de Linhas */}
        <div style={panelStyle}>
          <h4 style={panelTitle}>Tendência de Sentimentos</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sampleFeedbacks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "none" }} />
              <Line type="monotone" dataKey="positivos" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="negativos" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cards um acima do outro */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ ...cardStyle, borderLeft: "6px solid #10b981" }}>
            <small style={{ color: "#94a3b8" }}>Total Positivos</small>
            <h2 style={{ margin: "5px 0", color: "#10b981" }}>{totalPos}</h2>
          </div>
          <div style={{ ...cardStyle, borderLeft: "6px solid #ef4444" }}>
            <small style={{ color: "#94a3b8" }}>Total Negativos</small>
            <h2 style={{ margin: "5px 0", color: "#ef4444" }}>{totalNeg}</h2>
          </div>
        </div>
      </div>

      {/* LISTA DE MENSAGENS (Abaixo) */}
      <div style={panelStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h4 style={{ margin: 0 }}>Lista de Feedbacks ({inicio + 1} - {Math.min(fim, todasMensagens.length)} de {todasMensagens.length})</h4>
          
          {/* Controles de Paginação */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              disabled={pagina === 0}
              onClick={() => setPagina(p => p - 1)}
              style={pagina === 0 ? btnDisabled : btnActive}
            >
              ◀ Anterior
            </button>
            <button 
              disabled={fim >= todasMensagens.length}
              onClick={() => setPagina(p => p + 1)}
              style={fim >= todasMensagens.length ? btnDisabled : btnActive}
            >
              Próxima 20 ▶
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {mensagensExibidas.map((msg, index) => (
            <div key={index} style={msgItemStyle}>
              <span style={{ 
                backgroundColor: msg.sentiment === "pos" ? "#10b981" : "#ef4444",
                width: "10px", height: "10px", borderRadius: "50%", display: "inline-block", marginRight: "15px"
              }}></span>
              <span style={{ flex: 1 }}>{msg.text}</span>
              <small style={{ color: "#64748b" }}>{msg.date || "Hoje"}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS ---
const panelStyle = { backgroundColor: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" };
const panelTitle = { marginTop: 0, marginBottom: "15px", fontSize: "16px", color: "#f8fafc" };
const cardStyle = { backgroundColor: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" };
const msgItemStyle = { display: "flex", alignItems: "center", padding: "12px 15px", backgroundColor: "#0f172a", borderRadius: "8px", fontSize: "14px" };

const btnActive = { backgroundColor: "#334155", color: "#60a5fa", border: "1px solid #60a5fa", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };
const btnDisabled = { backgroundColor: "#1e293b", color: "#475569", border: "1px solid #334155", padding: "8px 16px", borderRadius: "6px", cursor: "not-allowed" };

export default TodosComentarios;