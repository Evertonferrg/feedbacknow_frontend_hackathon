

// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";
// import { X, TrendingUp, PieChart, MessageCircle } from "lucide-react";

// // 1. REGISTRO OBRIGATÓRIO DOS COMPONENTES DO CHART.JS
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = ({ sampleFeedbacks = [] }) => {
//   const [modalAberto, setModalAberto] = useState(false);
//   const [tipoFiltro, setTipoFiltro] = useState(null); // 'pos' ou 'neg'
//   const [pagina, setPagina] = useState(0);
//   const itensPorPagina = 20;

//   // --- PROCESSAMENTO DE DADOS ---
//   const labels = sampleFeedbacks.map((f) => f.date || "");
//   const dadosPositivos = sampleFeedbacks.map((f) => f.positivos || 0);
//   const dadosNegativos = sampleFeedbacks.map((f) => f.negativos || 0);

//   const totalPos = dadosPositivos.reduce((a, b) => a + b, 0);
//   const totalNeg = dadosNegativos.reduce((a, b) => a + b, 0);

//   // Lógica para capturar mensagens de todos os dias e filtrar
//   const todasMensagens = sampleFeedbacks.flatMap((dia) => dia.mensagens || []);
//   const mensagensFiltradas = todasMensagens.filter(m => m.sentiment === tipoFiltro);
//   const totalPaginas = Math.ceil(mensagensFiltradas.length / itensPorPagina);
//   const mensagensExibidas = mensagensFiltradas.slice(pagina * itensPorPagina, (pagina + 1) * itensPorPagina);

//   const abrirModal = (tipo) => {
//     setTipoFiltro(tipo);
//     setPagina(0);
//     setModalAberto(true);
//   };

//   // --- CONFIGURAÇÃO DOS GRÁFICOS ---
//   const lineData = {
//     labels,
//     datasets: [
//       { label: "Positivos", data: dadosPositivos, borderColor: "#10b981", backgroundColor: "#10b981", tension: 0.3 },
//       { label: "Negativos", data: dadosNegativos, borderColor: "#ef4444", backgroundColor: "#ef4444", tension: 0.3 },
//     ],
//   };

//   const doughnutData = {
//     labels: ["Positivos", "Negativos"],
//     datasets: [
//       {
//         data: [totalPos, totalNeg],
//         backgroundColor: ["#10b981", "#ef4444"],
//         hoverOffset: 4,
//         borderWidth: 0,
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100%" }}>
//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Visão Geral</h2>

//       {/* 1. CARDS DE RESUMO (CLICÁVEIS) */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div onClick={() => abrirModal('pos')} style={{ ...cardResumo, borderLeft: "5px solid #10b981" }}>
//           <div style={labelCard}>Feedbacks Positivos</div>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{totalPos}</div>
//           <div style={hintStyle}>Clique para ver mensagens</div>
//         </div>

//         <div onClick={() => abrirModal('neg')} style={{ ...cardResumo, borderLeft: "5px solid #ef4444" }}>
//           <div style={labelCard}>Feedbacks Negativos</div>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{totalNeg}</div>
//           <div style={hintStyle}>Clique para ver mensagens</div>
//         </div>
//       </div>

//       {/* 2. GRÁFICOS LADO A LADO */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <div style={cardGrafico}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Evolução de Sentimentos</div>
//           <div style={{ height: "300px" }}>
//             <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: 'white' } } } }} />
//           </div>
//         </div>

//         <div style={cardGrafico}>
//           <div style={tituloGrafico}><PieChart size={18} /> Distribuição Total</div>
//           <div style={{ height: "300px" }}>
//             <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: 'white' } } } }} />
//           </div>
//         </div>
//       </div>

//       {/* 3. MODAL DE MENSAGENS (SOBREPOSTO) */}
//       {modalAberto && (
//         <div style={overlayModal}>
//           <div style={conteudoModal}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
//               <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                 <MessageCircle color={tipoFiltro === 'pos' ? "#10b981" : "#ef4444"} />
//                 Lista de Mensagens {tipoFiltro === 'pos' ? 'Positivas' : 'Negativas'}
//               </h3>
//               <button onClick={() => setModalAberto(false)} style={btnFechar}><X size={24} /></button>
//             </div>

//             <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
//               {mensagensExibidas.length > 0 ? mensagensExibidas.map((msg, i) => (
//                 <div key={i} style={itemMsg}>
//                   <span style={{ color: tipoFiltro === 'pos' ? "#10b981" : "#ef4444", marginRight: "10px" }}>●</span>
//                   {msg.text}
//                 </div>
//               )) : <p style={{ textAlign: "center", color: "#64748b" }}>Nenhuma mensagem encontrada.</p>}
//             </div>

//             {/* Navegação da Paginação */}
//             <div style={paginacaoContainer}>
//               <button disabled={pagina === 0} onClick={() => setPagina(p => p - 1)} style={btnSeta}>Anterior</button>
//               <span style={{ fontSize: "0.9rem" }}>Página {pagina + 1} de {totalPaginas || 1}</span>
//               <button disabled={pagina >= totalPaginas - 1} onClick={() => setPagina(p => p + 1)} style={btnSeta}>Próxima</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // --- ESTILOS AUXILIARES ---
// const cardResumo = { flex: 1, background: "#1e293b", padding: "25px", borderRadius: "12px", cursor: "pointer", transition: "transform 0.2s", border: "1px solid #334155" };
// const labelCard = { fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" };
// const hintStyle = { fontSize: "0.75rem", color: "#64748b", marginTop: "10px" };
// const cardGrafico = { flex: 1, background: "#1e293b", padding: "25px", borderRadius: "15px", minWidth: "350px", border: "1px solid #334155" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1", fontSize: "1rem" };
// const itemMsg = { padding: "15px 0", borderBottom: "1px solid #334155", fontSize: "0.95rem", color: "#e2e8f0", lineHeight: "1.5" };

// const overlayModal = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 };
// const conteudoModal = { background: "#1e293b", width: "90%", maxWidth: "650px", maxHeight: "85vh", borderRadius: "20px", padding: "35px", display: "flex", flexDirection: "column", border: "1px solid #475569", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" };
// const btnFechar = { background: "none", border: "none", color: "#94a3b8", cursor: "pointer" };
// const paginacaoContainer = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "25px", paddingTop: "20px", borderTop: "1px solid #334155" };
// const btnSeta = { background: "#3b82f6", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", opacity: "1", disabled: { opacity: 0.5 } };

// export default Dashboard;


import React, { useState } from "react";
import { 
  Instagram, Facebook, TrendingUp, PieChart, 
  MessageCircle, X, ArrowLeft, ChevronRight, ChevronLeft 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, ArcElement, Title, Tooltip, Legend 
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = ({ sampleFeedbacks = [] }) => {
  const [viewRedeSocial, setViewRedeSocial] = useState(null);
  const [viewTipoFiltro, setViewTipoFiltro] = useState(null); // 'pos' ou 'neg'
  const [pagina, setPagina] = useState(0);
  const itensPorPagina = 10;

  // --- PROCESSAMENTO DE DADOS ---
  const dadosPos = sampleFeedbacks.map(f => f.positivos || 0);
  const dadosNeg = sampleFeedbacks.map(f => f.negativos || 0);
  const totalPos = dadosPos.reduce((a, b) => a + b, 0);
  const totalNeg = dadosNeg.reduce((a, b) => a + b, 0);

  // Captura todas as mensagens de todos os dias
  const todasAsMensagens = sampleFeedbacks.flatMap(dia => dia.mensagens || []);
  
  // Filtra as mensagens pelo tipo selecionado (positivo ou negativo)
  const mensagensFiltradas = todasAsMensagens.filter(m => 
    viewTipoFiltro === 'pos' ? m.sentiment === 'pos' : m.sentiment === 'neg'
  );

  // Paginação
  const totalPaginas = Math.ceil(mensagensFiltradas.length / itensPorPagina);
  const mensagensExibidas = mensagensFiltradas.slice(pagina * itensPorPagina, (pagina + 1) * itensPorPagina);

  const handleAbrirFiltro = (tipo) => {
    setViewTipoFiltro(tipo);
    setPagina(0);
    setViewRedeSocial(null); // Fecha a vista de redes sociais se estiver aberta
  };

  return (
    <div style={{ padding: "30px", color: "white", minHeight: "100%" }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ margin: 0 }}>Visão Geral</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <div onClick={() => setViewRedeSocial('instagram')} style={socialIconContainer}>
            <Instagram size={22} color="#E4405F" />
          </div>
          <div onClick={() => setViewRedeSocial('facebook')} style={socialIconContainer}>
            <Facebook size={22} color="#1877F2" />
          </div>
        </div>
      </div>

      {/* 1. BOTOES DE RESUMO (CLICÁVEIS) */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div onClick={() => handleAbrirFiltro('pos')} style={{ ...cardResumo, borderLeft: "5px solid #10b981", boxShadow: viewTipoFiltro === 'pos' ? "0 0 15px rgba(16,185,129,0.3)" : "none" }}>
          <div style={labelCard}>Mensagens Positivas</div>
          <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#10b981" }}>{totalPos}</div>
          <small style={{ color: "#64748b" }}>Clique para listar</small>
        </div>
        
        <div onClick={() => handleAbrirFiltro('neg')} style={{ ...cardResumo, borderLeft: "5px solid #ef4444", boxShadow: viewTipoFiltro === 'neg' ? "0 0 15px rgba(239,68,68,0.3)" : "none" }}>
          <div style={labelCard}>Mensagens Negativas</div>
          <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#ef4444" }}>{totalNeg}</div>
          <small style={{ color: "#64748b" }}>Clique para listar</small>
        </div>
      </div>

      {/* SEÇÃO DE LISTAGEM (APARECE AO CLICAR NOS BOTOES) */}
      {viewTipoFiltro && (
        <div style={containerLista}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, color: viewTipoFiltro === 'pos' ? "#10b981" : "#ef4444" }}>
              Listando: {viewTipoFiltro === 'pos' ? "Positivas" : "Negativas"}
            </h3>
            <button onClick={() => setViewTipoFiltro(null)} style={btnFechar}>Fechar Lista ✕</button>
          </div>

          <div style={{ minHeight: "200px" }}>
            {mensagensExibidas.length > 0 ? mensagensExibidas.map((m, i) => (
              <div key={i} style={itemMensagem}>{m.text}</div>
            )) : <p>Nenhuma mensagem nesta categoria.</p>}
          </div>

          {/* PAGINAÇÃO */}
          <div style={paginacaoStyle}>
            <button disabled={pagina === 0} onClick={() => setPagina(p => p - 1)} style={btnSeta}>
              <ChevronLeft size={20} /> Anterior
            </button>
            <span>Página {pagina + 1} de {totalPaginas || 1}</span>
            <button disabled={pagina >= totalPaginas - 1} onClick={() => setPagina(p => p + 1)} style={btnSeta}>
              Próxima <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 2. GRÁFICOS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", opacity: viewTipoFiltro ? 0.5 : 1 }}>
        <div style={cardGrafico}>
          <div style={tituloGrafico}><TrendingUp size={18} /> Evolução</div>
          <div style={{ height: "250px" }}>
            <Line 
              data={{ labels: sampleFeedbacks.map(f => f.date), datasets: [{ label: 'Pos', data: dadosPos, borderColor: '#10b981' }, { label: 'Neg', data: dadosNeg, borderColor: '#ef4444' }] }} 
              options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
            />
          </div>
        </div>
        <div style={cardGrafico}>
          <div style={tituloGrafico}><PieChart size={18} /> Proporção</div>
          <div style={{ height: "250px" }}>
            <Doughnut 
              data={{ labels: ['Pos', 'Neg'], datasets: [{ data: [totalPos, totalNeg], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }] }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS ---
const cardResumo = { flex: 1, background: "#1e293b", padding: "20px", borderRadius: "12px", cursor: "pointer", border: "1px solid #334155", transition: "0.3s" };
const labelCard = { fontSize: "0.85rem", color: "#94a3b8", fontWeight: "600", marginBottom: "5px" };
const containerLista = { background: "#161e2b", padding: "25px", borderRadius: "15px", marginBottom: "30px", border: "1px solid #3b82f6", animation: "fadeIn 0.3s ease" };
const itemMensagem = { padding: "12px", borderBottom: "1px solid #334155", fontSize: "0.9rem", color: "#e2e8f0" };
const paginacaoStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #334155" };
const btnSeta = { display: "flex", alignItems: "center", gap: "5px", background: "#3b82f6", color: "white", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", opacity: "1", transition: "0.2s" };
const btnFechar = { background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold" };
const cardGrafico = { flex: 1, background: "#1e293b", padding: "20px", borderRadius: "15px", minWidth: "300px", border: "1px solid #334155" };
const tituloGrafico = { display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px", color: "#cbd5e1" };
const socialIconContainer = { padding: "8px", background: "#1e293b", borderRadius: "50%", cursor: "pointer", border: "1px solid #334155" };

export default Dashboard;