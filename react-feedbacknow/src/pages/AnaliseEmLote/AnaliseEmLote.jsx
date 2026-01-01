// import React, { useState } from 'react';

// // --- COMPONENTE ANALISE DE FICHEIRO ---
// const AnaliseEmLote = ({ setView, onDataProcessed }) => {
//   const [fileContent, setFileContent] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setFileContent(event.target.result);
//     };
//     reader.readAsText(file);
//   };

//   const processFile = () => {
//     if (!fileContent) return;
//     setIsProcessing(true);

//     // Simulação de processamento de texto/CSV
//     setTimeout(() => {
//       const lines = fileContent.split('\n').filter(line => line.trim() !== '');
//       const newFeedbacks = lines.map((line, index) => ({
//         id: Date.now() + index,
//         text: line,
//         sentiment: line.length > 30 ? 'pos' : 'neg' // Lógica simples para exemplo
//       }));

//       onDataProcessed(newFeedbacks);
//       setIsProcessing(false);
//       setView('todos');
//     }, 1500);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a', color: 'white', padding: '40px', alignItems: 'center' }}>
//       <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Análise de Ficheiro</h1>
//       <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Carregue um ficheiro .txt ou .csv para analisar os sentimentos automaticamente.</p>
      
//       <div style={{ background: '#1e293b', padding: '40px', borderRadius: '12px', border: '2px dashed #475569', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
//         <input 
//           type="file" 
//           accept=".txt,.csv" 
//           onChange={handleFileUpload} 
//           style={{ marginBottom: '20px' }}
//         />
//         {fileContent && (
//           <div style={{ textAlign: 'left', background: '#0f172a', padding: '15px', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', marginBottom: '20px', fontSize: '0.8rem' }}>
//             <pre>{fileContent}</pre>
//           </div>
//         )}
//         <button 
//           onClick={processFile}
//           disabled={!fileContent || isProcessing}
//           style={{ width: '100%', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', opacity: isProcessing ? 0.6 : 1 }}
//         >
//           {isProcessing ? 'A processar...' : 'Começar Análise'}
//         </button>
//       </div>
//       <button onClick={() => setView('dashboard')} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Voltar</button>
//     </div>
//   );
// };

// // --- COMPONENTE TODOS COMENTARIOS ---
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
//           <button className="sidebar-link" onClick={() => handleNavigation('analise')}>Análise de Ficheiro</button>
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
//   const [feedbacks, setFeedbacks] = useState([
//     { id: 1, text: "Excelente atendimento!", sentiment: "pos" },
//     { id: 2, text: "A entrega demorou muito.", sentiment: "neg" }
//   ]);

//   const addDataFromAnalise = (newData) => {
//     setFeedbacks(prev => [...prev, ...newData]);
//   };

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
//             <div style={{ display: 'flex', gap: '15px' }}>
//               <button 
//                 onClick={() => setView('todos')}
//                 style={{ padding: '12px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
//               >
//                 Ver Feedbacks
//               </button>
//               <button 
//                 onClick={() => setView('analise')}
//                 style={{ padding: '12px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
//               >
//                 Nova Análise de Ficheiro
//               </button>
//             </div>
//           </div>
//         );

//       case 'analise':
//         return (
//           <AnaliseFicheiro 
//             setView={setView} 
//             onDataProcessed={addDataFromAnalise} 
//           />
//         );

//       case 'todos':
//         return (
//           <TodosComentarios 
//             sampleFeedbacks={feedbacks} 
//             renderLineChart={renderLineChart}
//             setView={setView} 
//           />
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



import React, { useState, useRef } from "react";
import { Send, UploadCloud, FileText, X } from "lucide-react";

const AnaliseEmLote = () => {
  const [texto, setTexto] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Função para ler o conteúdo do arquivo
  const processarArquivo = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setTexto(e.target.result); // Coloca o conteúdo do CSV/Texto no campo
      setArquivo(file);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processarArquivo(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processarArquivo(file);
  };

  const handleEnviar = () => {
    if (!texto.trim()) return alert("Adicione conteúdo ou um arquivo!");
    alert("Enviado para análise com sucesso!");
    setTexto("");
    setArquivo(null);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "white", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <UploadCloud /> Análise em Lote
        </h2>

        {/* ÁREA DE DRAG & DROP / TEXTAREA */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            ...dropZoneStyle,
            borderColor: isDragging ? "#3b82f6" : "#334155",
            backgroundColor: isDragging ? "#1e293b" : "#0f172a"
          }}
        >
          {arquivo && (
            <div style={fileInfoStyle}>
              <FileText size={16} />
              <span>{arquivo.name}</span>
              <X size={16} cursor="pointer" onClick={() => { setArquivo(null); setTexto(""); }} />
            </div>
          )}

          <textarea
            style={textAreaStyle}
            placeholder="Cole os dados aqui ou arraste um arquivo CSV/TXT..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: "none" }} 
            accept=".csv,.txt"
          />
          <button onClick={() => fileInputRef.current.click()} style={secondaryBtn}>
            Selecionar Arquivo
          </button>

          <button onClick={handleEnviar} style={primaryBtn}>
            <Send size={18} /> Enviar Processamento
          </button>
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS ---
const containerStyle = { padding: "40px", display: "flex", justifyContent: "center", backgroundColor: "#0f172a", minHeight: "100vh" };
const cardStyle = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "15px", width: "100%", maxWidth: "800px", border: "1px solid #334155" };
const dropZoneStyle = { border: "2px dashed", borderRadius: "10px", padding: "10px", transition: "0.3s", position: "relative" };
const textAreaStyle = { width: "100%", height: "250px", background: "transparent", color: "#e2e8f0", border: "none", outline: "none", resize: "none", fontSize: "0.9rem" };
const primaryBtn = { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#3b82f6", color: "white", border: "none", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const secondaryBtn = { backgroundColor: "transparent", color: "#94a3b8", border: "1px solid #334155", padding: "12px 20px", borderRadius: "8px", cursor: "pointer" };
const fileInfoStyle = { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#3b82f6", color: "white", padding: "5px 12px", borderRadius: "20px", fontSize: "0.8rem", width: "fit-content", marginBottom: "10px" };

export default AnaliseEmLote;