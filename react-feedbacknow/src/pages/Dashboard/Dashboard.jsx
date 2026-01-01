

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



import React from "react";
import { 
  Instagram, Facebook, TrendingUp, PieChart, Home 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, ArcElement, Title, Tooltip, Legend, Filler 
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

// Registro obrigatório dos componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const Dashboard = ({ sampleFeedbacks = [], notificacoes }) => {
  const navigate = useNavigate();

  // --- CÁLCULO DE DADOS ---
  const labels = sampleFeedbacks.map(f => f.date);
  const dadosPos = sampleFeedbacks.map(f => f.positivos || 0);
  const dadosNeg = sampleFeedbacks.map(f => f.negativos || 0);
  
  const totalPos = dadosPos.reduce((a, b) => a + b, 0);
  const totalNeg = dadosNeg.reduce((a, b) => a + b, 0);

  const qtdInstagram = notificacoes?.instagram || 0;
  const qtdFacebook = notificacoes?.facebook || 0;

  // Navegação com filtros para a tela Social
  const verMensagens = (tipo, valor) => {
    navigate("/social-messages", { state: { [tipo]: valor } });
  };

  return (
    <div style={{ padding: "30px", color: "white", minHeight: "100%", backgroundColor: "#0f172a" }}>
      
      {/* 1. BOTÃO SAIR PARA HOME */}
      <button 
        onClick={() => navigate("/")} 
        style={btnHomeStyle}
      >
        <Home size={18} /> Sair para Home
      </button>

      {/* 2. CABEÇALHO E REDES SOCIAIS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "600" }}>Visão Geral</h2>
        
        <div style={{ display: "flex", gap: "15px" }}>
          {/* Instagram */}
          <button onClick={() => verMensagens("rede", "Instagram")} style={socialButtonStyle}>
            <Instagram size={22} color="#E4405F" />
            {qtdInstagram > 0 && <span style={badgeStyle}>{qtdInstagram}</span>}
          </button>

          {/* Facebook */}
          <button onClick={() => verMensagens("rede", "Facebook")} style={socialButtonStyle}>
            <Facebook size={22} color="#1877F2" />
            {qtdFacebook > 0 && <span style={badgeStyle}>{qtdFacebook}</span>}
          </button>
        </div>
      </div>

      {/* 3. CARDS DE RESUMO (CLICÁVEIS) */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div 
          onClick={() => verMensagens("filtroSentimento", "pos")} 
          style={{ ...cardResumo, borderLeft: "6px solid #10b981" }}
        >
          <span style={labelCard}>Feedbacks Positivos</span>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{totalPos}</div>
          <small style={{ color: "#64748b" }}>Ver últimas 10 mensagens →</small>
        </div>
        
        <div 
          onClick={() => verMensagens("filtroSentimento", "neg")} 
          style={{ ...cardResumo, borderLeft: "6px solid #ef4444" }}
        >
          <span style={labelCard}>Feedbacks Negativos</span>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{totalNeg}</div>
          <small style={{ color: "#64748b" }}>Ver últimas 10 mensagens →</small>
        </div>
      </div>

      {/* 4. GRÁFICOS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* Gráfico de Evolução */}
        <div style={cardGrafico}>
          <div style={tituloGrafico}><TrendingUp size={18} /> Evolução Diária</div>
          <div style={{ height: "280px" }}>
            <Line 
              data={{ 
                labels: labels, 
                datasets: [
                  { 
                    label: 'Positivos', 
                    data: dadosPos, 
                    borderColor: '#10b981', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4, 
                    fill: true,
                    pointRadius: 4
                  }, 
                  { 
                    label: 'Negativos', 
                    data: dadosNeg, 
                    borderColor: '#ef4444', 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4, 
                    fill: true,
                    pointRadius: 4
                  }
                ] 
              }} 
              options={{ 
                maintainAspectRatio: false, 
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
                  x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
              }} 
            />
          </div>
        </div>

        {/* Gráfico de Proporção */}
        <div style={{ ...cardGrafico, flex: "0 1 350px" }}>
          <div style={tituloGrafico}><PieChart size={18} /> Distribuição Total</div>
          <div style={{ height: "280px" }}>
            <Doughnut 
              data={{ 
                labels: ['Positivos', 'Negativos'], 
                datasets: [{ 
                  data: [totalPos, totalNeg], 
                  backgroundColor: ['#10b981', '#ef4444'], 
                  borderWidth: 0 
                }] 
              }} 
              options={{ 
                maintainAspectRatio: false, 
                plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } } 
              }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

// --- ESTILOS ---
const btnHomeStyle = {
  background: "none", border: "none", color: "#94a3b8", cursor: "pointer",
  display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "0.9rem"
};

const socialButtonStyle = { 
  padding: "10px", background: "#1e293b", borderRadius: "50%", border: "1px solid #334155", 
  cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" 
};

const badgeStyle = { 
  position: "absolute", top: "-5px", right: "-5px", background: "#ef4444", color: "white", 
  borderRadius: "50%", minWidth: "18px", height: "18px", fontSize: "10px", 
  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", border: "2px solid #0f172a"
};

const cardResumo = { 
  flex: 1, background: "#1e293b", padding: "20px", borderRadius: "12px", 
  cursor: "pointer", border: "1px solid #334155", transition: "0.2s" 
};

const labelCard = { fontSize: "0.8rem", color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase" };

const cardGrafico = { 
  flex: 1, background: "#1e293b", padding: "25px", borderRadius: "15px", 
  minWidth: "300px", border: "1px solid #334155" 
};

const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1" };

export default Dashboard;