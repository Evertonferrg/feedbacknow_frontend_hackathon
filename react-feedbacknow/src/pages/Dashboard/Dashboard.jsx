// import React, { useState, useEffect } from "react";
// import axios from "axios";
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
//   Filler
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";
// import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw } from "lucide-react";

// // REGISTRO OBRIGATÓRIO PARA O CHART.JS
// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler
// );

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);

//   // --- BUSCA DE DADOS NO JAVA (LIDANDO COM PAGINARESPONSE) ---
//   const buscarDadosDoBanco = async () => {
//     setCarregando(true);
//     try {
//       const response = await axios.get("http://localhost:8080/sentiments", {
//         headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
//       });
      
//       // ACESSANDO O CONTEÚDO DA SUA PAGINAÇÃO JAVA
//       const listaExtraida = response.data.conteudo || [];
//       setDadosBanco(listaExtraida);
//     } catch (error) {
//       console.error("Erro ao carregar dashboard:", error);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   useEffect(() => {
//     buscarDadosDoBanco();
//   }, []);

//   // --- MAPEAMENTO PARA O SEU FORMATO DE GRÁFICO ---
//   const feedbacksFormatados = dadosBanco.map(f => ({
//     date: f.criadoEm ? new Date(f.criadoEm).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'}) : "---",
//     positivos: f.sentimento === "POSITIVO" ? 1 : 0,
//     negativos: f.sentimento === "NEGATIVO" ? 1 : 0,
//     mensagem: f.comentario,
//     origem: f.origem || "sistema"
//   }));

//   const totalPos = feedbacksFormatados.filter(f => f.positivos > 0).length;
//   const totalNeg = feedbacksFormatados.filter(f => f.negativos > 0).length;
//   const total = totalPos + totalNeg;

//   // Filtros para os Badges das redes sociais
//   const novasInstagram = feedbacksFormatados.filter(m => m.origem === "instagram").length;
//   const novasFacebook = feedbacksFormatados.filter(m => m.origem === "facebook").length;

//   // --- CONFIGURAÇÃO DOS GRÁFICOS ---
//   const lineData = {
//     labels: feedbacksFormatados.map(f => f.date),
//     datasets: [
//       { label: "Positivos", data: feedbacksFormatados.map(f => f.positivos), borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", fill: true, tension: 0.4 },
//       { label: "Negativos", data: feedbacksFormatados.map(f => f.negativos), borderColor: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", fill: true, tension: 0.4 },
//     ],
//   };

//   const doughnutData = {
//     labels: ["Positivos", "Negativos"],
//     datasets: [{ data: [totalPos, totalNeg], backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 }],
//   };

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>
      
//       {/* CABEÇALHO DE ÍCONES (ORIGINAL) */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
//         </button>
//         <button style={btnIconStyle}>
//           <Instagram color="#E4405F" size={24} />
//           {novasInstagram > 0 && <span style={badgeStyle}>{novasInstagram}</span>}
//         </button>
//         <button style={btnIconStyle}>
//           <Facebook color="#1877F2" size={24} />
//           {novasFacebook > 0 && <span style={badgeStyle}>{novasFacebook}</span>}
//         </button>
//       </div>

//       <button onClick={() => window.location.href = "/"} style={btnHomeStyle}>
//         <Home size={18} /> Voltar para Home
//       </button>

//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard de Feedback</h2>

//       {/* CARDS DE RESUMO (ORIGINAL) */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #3b82f6" }}>
//           <span style={labelCard}>Total</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6" }}>{total}</div>
//         </div>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #10b981" }}>
//           <span style={labelCard}>Positivos</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{totalPos}</div>
//         </div>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #ef4444" }}>
//           <span style={labelCard}>Negativos</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{totalNeg}</div>
//         </div>
//       </div>

//       {/* GRÁFICOS (ORIGINAL) */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <div style={cardGrafico}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Evolução das Análises</div>
//           <div style={{ height: "250px" }}><Line data={lineData} options={chartOptions} /></div>
//         </div>
//         <div style={{ ...cardGrafico, flex: "0 1 350px" }}>
//           <div style={tituloGrafico}><PieChart size={18} /> Sentimento Geral</div>
//           <div style={{ height: "250px" }}><Doughnut data={doughnutData} options={chartOptions} /></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- ESTILOS AUXILIARES (ORIGINAIS QUE VOCÊ USAVA) ---
// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
// const cardResumo = { flex: "1", background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" };
// const cardGrafico = { flex: "1", minWidth: "400px", background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155" };
// const labelCard = { fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1" };

// const chartOptions = {
//   maintainAspectRatio: false,
//   plugins: { legend: { labels: { color: '#94a3b8' } } },
//   scales: {
//     y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } },
//     x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
//   }
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, LogOut, X } from "lucide-react";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler
);

const Dashboard = () => {
  const [dadosBanco, setDadosBanco] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [redeSocialSelecionada, setRedeSocialSelecionada] = useState(null);
  
  // Notificações em tempo real (Badges)
  const [novasInsta, setNovasInsta] = useState(0);
  const [novasFace, setNovasFace] = useState(0);

  const buscarDadosDoBanco = async () => {
    setCarregando(true);
    try {
      const response = await axios.get("http://localhost:8080/sentiments?size=999", {
        headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
      });
      setDadosBanco(response.data.conteudo || response.data || []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosDoBanco();

    // CONECTANDO AO ALERT SERVICE (SSE)
    // Certifique-se que esta URL é a mesma do seu @GetMapping no Java
    const connectSSE = () => {
      const eventSource = new EventSource("http://localhost:8080/alerts/subscribe");

      eventSource.onmessage = (event) => {
        const novoAlerta = JSON.parse(event.data);
        console.log("Alerta recebido:", novoAlerta);

        // Adiciona à lista geral
        setDadosBanco((prev) => [novoAlerta, ...prev]);

        // AVISA OS BOTÕES (Sobe o número no Badge)
        const origem = novoAlerta.origem?.toLowerCase();
        const texto = novoAlerta.comentario?.toLowerCase() || "";

        if (origem === "instagram" || texto.includes("instagram")) {
          setNovasInsta(prev => prev + 1);
        } else if (origem === "facebook" || origem === "page" || texto.includes("facebook")) {
          setNovasFace(prev => prev + 1);
        }
      };

      eventSource.onerror = () => {
        console.log("Erro na conexão SSE. Tentando reconectar em 5s...");
        eventSource.close();
        setTimeout(connectSSE, 5000);
      };

      return eventSource;
    };

    const sse = connectSSE();
    return () => sse.close();
  }, []);

  // --- FUNÇÕES DE CONTROLE ---
  const abrirModal = (rede) => {
    setRedeSocialSelecionada(rede);
    setModalAberto(true);
  };

  const fecharModal = () => {
    // RETIRA A INFORMAÇÃO (ZERA) APÓS VISUALIZAR
    if (redeSocialSelecionada === "Instagram") setNovasInsta(0);
    if (redeSocialSelecionada === "Facebook") setNovasFace(0);
    setModalAberto(false);
  };

  // --- PREPARAÇÃO DOS DADOS ---
  const totalPos = dadosBanco.filter(f => f.sentimento === "POSITIVO").length;
  const totalNeg = dadosBanco.filter(f => f.sentimento === "NEGATIVO").length;

  // Gráfico de Linha: Positivos vs Negativos
  const ultimosRegistros = [...dadosBanco].slice(0, 10).reverse();
  const lineData = {
    labels: ultimosRegistros.map((_, i) => i + 1),
    datasets: [
      { label: "Positivos", data: ultimosRegistros.map(f => f.sentimento === "POSITIVO" ? 1 : 0), borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", fill: true, tension: 0.4 },
      { label: "Negativos", data: ultimosRegistros.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), borderColor: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", fill: true, tension: 0.4 }
    ],
  };

  const doughnutData = {
    labels: ["Positivos", "Negativos"],
    datasets: [{ data: [totalPos, totalNeg], backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 }],
  };

  const mensagensFiltradas = dadosBanco.filter(f => {
    const origem = f.origem?.toLowerCase();
    const texto = f.comentario?.toLowerCase() || "";
    if (redeSocialSelecionada === "Instagram") return origem === "instagram" || texto.includes("instagram");
    if (redeSocialSelecionada === "Facebook") return origem === "facebook" || origem === "page" || texto.includes("facebook");
    return false;
  });

  return (
    <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>
      
      {/* HEADER DE ÍCONES COM BADGES DE AVISO */}
      <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
        <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
          <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
        </button>
        
        <button onClick={() => abrirModal("Instagram")} style={btnIconStyle}>
          <Instagram color="#E4405F" size={24} />
          {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
        </button>

        <button onClick={() => abrirModal("Facebook")} style={btnIconStyle}>
          <Facebook color="#1877F2" size={24} />
          {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
        </button>

        <button onClick={() => window.location.href = "/login"} style={{...btnIconStyle, border: "1px solid #ef4444"}}>
          <LogOut size={22} color="#ef4444" />
        </button>
      </div>

      <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
      <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard Feedback Real-Time</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ ...cardResumo, borderLeft: "6px solid #3b82f6" }}>
          <span style={labelCard}>Total Analisado</span>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6" }}>{totalPos + totalNeg}</div>
        </div>
        <div style={{ ...cardResumo, borderLeft: "6px solid #10b981" }}>
          <span style={labelCard}>Positivos</span>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{totalPos}</div>
        </div>
        <div style={{ ...cardResumo, borderLeft: "6px solid #ef4444" }}>
          <span style={labelCard}>Negativos</span>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{totalNeg}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardGrafico}>
          <div style={tituloGrafico}><TrendingUp size={18} /> Histórico de Sentimentos</div>
          <div style={{ height: "250px" }}><Line data={lineData} options={chartOptions} /></div>
        </div>
        <div style={{ ...cardGrafico, flex: "0 1 350px" }}>
          <div style={tituloGrafico}><PieChart size={18} /> Proporção</div>
          <div style={{ height: "250px" }}><Doughnut data={doughnutData} options={chartOptions} /></div>
        </div>
      </div>

      {modalAberto && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Visualizando: {redeSocialSelecionada}</h3>
              <X size={24} style={{ cursor: "pointer" }} onClick={fecharModal} />
            </div>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {mensagensFiltradas.length > 0 ? mensagensFiltradas.map((m, i) => (
                <div key={i} style={mensagemItem}>
                  <p style={{ margin: "0 0 5px 0" }}>{m.comentario}</p>
                  <small style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontWeight: 'bold' }}>
                    {m.sentimento}
                  </small>
                </div>
              )) : <p style={{ textAlign: 'center', color: '#94a3b8' }}>Nenhuma mensagem nova.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ESTILOS (MANTIDOS)
const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" };
const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
const cardResumo = { flex: "1", background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" };
const cardGrafico = { flex: "1", minWidth: "400px", background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155" };
const labelCard = { fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" };
const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "450px", border: "1px solid #334155" };
const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };
const chartOptions = { maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } } };

export default Dashboard;