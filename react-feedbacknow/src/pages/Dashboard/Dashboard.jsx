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

//################################
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
// import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, LogOut, X } from "lucide-react";

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler
// );

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [redeSocialSelecionada, setRedeSocialSelecionada] = useState(null);
  
//   // Notificações em tempo real (Badges)
//   const [novasInsta, setNovasInsta] = useState(0);
//   const [novasFace, setNovasFace] = useState(0);

//   const buscarDadosDoBanco = async () => {
//     setCarregando(true);
//     try {
//       const response = await axios.get("http://localhost:8080/sentiments?size=999", {
//         headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
//       });
//       setDadosBanco(response.data.conteudo || response.data || []);
//     } catch (error) {
//       console.error("Erro ao buscar dados:", error);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   useEffect(() => {
//     buscarDadosDoBanco();

//     // CONECTANDO AO ALERT SERVICE (SSE)
//     // Certifique-se que esta URL é a mesma do seu @GetMapping no Java
//     const connectSSE = () => {
//       const eventSource = new EventSource("http://localhost:8080/alerts/subscribe");

//       eventSource.onmessage = (event) => {
//         const novoAlerta = JSON.parse(event.data);
//         console.log("Alerta recebido:", novoAlerta);

//         // Adiciona à lista geral
//         setDadosBanco((prev) => [novoAlerta, ...prev]);

//         // AVISA OS BOTÕES (Sobe o número no Badge)
//         const origem = novoAlerta.origem?.toLowerCase();
//         const texto = novoAlerta.comentario?.toLowerCase() || "";

//         if (origem === "instagram" || texto.includes("instagram")) {
//           setNovasInsta(prev => prev + 1);
//         } else if (origem === "facebook" || origem === "page" || texto.includes("facebook")) {
//           setNovasFace(prev => prev + 1);
//         }
//       };

//       eventSource.onerror = () => {
//         console.log("Erro na conexão SSE. Tentando reconectar em 5s...");
//         eventSource.close();
//         setTimeout(connectSSE, 5000);
//       };

//       return eventSource;
//     };

//     const sse = connectSSE();
//     return () => sse.close();
//   }, []);

//   // --- FUNÇÕES DE CONTROLE ---
//   const abrirModal = (rede) => {
//     setRedeSocialSelecionada(rede);
//     setModalAberto(true);
//   };

//   const fecharModal = () => {
//     // RETIRA A INFORMAÇÃO (ZERA) APÓS VISUALIZAR
//     if (redeSocialSelecionada === "Instagram") setNovasInsta(0);
//     if (redeSocialSelecionada === "Facebook") setNovasFace(0);
//     setModalAberto(false);
//   };

//   // --- PREPARAÇÃO DOS DADOS ---
//   const totalPos = dadosBanco.filter(f => f.sentimento === "POSITIVO").length;
//   const totalNeg = dadosBanco.filter(f => f.sentimento === "NEGATIVO").length;

//   // Gráfico de Linha: Positivos vs Negativos
//   const ultimosRegistros = [...dadosBanco].slice(0, 10).reverse();
//   const lineData = {
//     labels: ultimosRegistros.map((_, i) => i + 1),
//     datasets: [
//       { label: "Positivos", data: ultimosRegistros.map(f => f.sentimento === "POSITIVO" ? 1 : 0), borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", fill: true, tension: 0.4 },
//       { label: "Negativos", data: ultimosRegistros.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), borderColor: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", fill: true, tension: 0.4 }
//     ],
//   };

//   const doughnutData = {
//     labels: ["Positivos", "Negativos"],
//     datasets: [{ data: [totalPos, totalNeg], backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 }],
//   };

//   const mensagensFiltradas = dadosBanco.filter(f => {
//     const origem = f.origem?.toLowerCase();
//     const texto = f.comentario?.toLowerCase() || "";
//     if (redeSocialSelecionada === "Instagram") return origem === "instagram" || texto.includes("instagram");
//     if (redeSocialSelecionada === "Facebook") return origem === "facebook" || origem === "page" || texto.includes("facebook");
//     return false;
//   });

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>
      
//       {/* HEADER DE ÍCONES COM BADGES DE AVISO */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
//         </button>
        
//         <button onClick={() => abrirModal("Instagram")} style={btnIconStyle}>
//           <Instagram color="#E4405F" size={24} />
//           {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
//         </button>

//         <button onClick={() => abrirModal("Facebook")} style={btnIconStyle}>
//           <Facebook color="#1877F2" size={24} />
//           {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
//         </button>

//         <button onClick={() => window.location.href = "/login"} style={{...btnIconStyle, border: "1px solid #ef4444"}}>
//           <LogOut size={22} color="#ef4444" />
//         </button>
//       </div>

//       <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard Feedback Real-Time</h2>

//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #3b82f6" }}>
//           <span style={labelCard}>Total Analisado</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6" }}>{totalPos + totalNeg}</div>
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

//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <div style={cardGrafico}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Histórico de Sentimentos</div>
//           <div style={{ height: "250px" }}><Line data={lineData} options={chartOptions} /></div>
//         </div>
//         <div style={{ ...cardGrafico, flex: "0 1 350px" }}>
//           <div style={tituloGrafico}><PieChart size={18} /> Proporção</div>
//           <div style={{ height: "250px" }}><Doughnut data={doughnutData} options={chartOptions} /></div>
//         </div>
//       </div>

//       {modalAberto && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//               <h3 style={{ margin: 0 }}>Visualizando: {redeSocialSelecionada}</h3>
//               <X size={24} style={{ cursor: "pointer" }} onClick={fecharModal} />
//             </div>
//             <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//               {mensagensFiltradas.length > 0 ? mensagensFiltradas.map((m, i) => (
//                 <div key={i} style={mensagemItem}>
//                   <p style={{ margin: "0 0 5px 0" }}>{m.comentario}</p>
//                   <small style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontWeight: 'bold' }}>
//                     {m.sentimento}
//                   </small>
//                 </div>
//               )) : <p style={{ textAlign: 'center', color: '#94a3b8' }}>Nenhuma mensagem nova.</p>}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ESTILOS (MANTIDOS)
// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
// const cardResumo = { flex: "1", background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" };
// const cardGrafico = { flex: "1", minWidth: "400px", background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155" };
// const labelCard = { fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1" };
// const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "450px", border: "1px solid #334155" };
// const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };
// const chartOptions = { maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } } };

// export default Dashboard;
//###################################
//####################################
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
// import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, LogOut, X } from "lucide-react";

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler
// );

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [redeSocialSelecionada, setRedeSocialSelecionada] = useState(null);
  
//   // ESTADOS PARA AS NOTIFICAÇÕES (BADGES)
//   const [novasInsta, setNovasInsta] = useState(0);
//   const [novasFace, setNovasFace] = useState(0);

//   // 1. BUSCA INICIAL DE DADOS (HISTÓRICO)
//   const buscarDadosDoBanco = async () => {
//     setCarregando(true);
//     try {
//       const response = await axios.get("http://localhost:8080/sentiments?size=999", {
//         headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
//       });
//       const lista = response.data.conteudo || response.data || [];
//       setDadosBanco(lista);
//     } catch (error) {
//       console.error("Erro ao buscar dados:", error);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   // 2. CONEXÃO REAL-TIME E LÓGICA DE NOTIFICAÇÃO
//   useEffect(() => {
//     buscarDadosDoBanco();

//     const connectSSE = () => {
//       // URL que bate com seu AlertController.java
//       const eventSource = new EventSource("http://localhost:8080/notifications/alerts");

//       eventSource.onmessage = (event) => {
//         const novoAlerta = JSON.parse(event.data);
//         console.log("DADOS BRUTOS RECEBIDOS:", novoAlerta);

//         // Atualiza a lista geral para os gráficos
//         setDadosBanco((prev) => [novoAlerta, ...prev]);

//         // --- LÓGICA DE DETECÇÃO PARA O BADGE ---
//         const origem = (novoAlerta.origem || novoAlerta.object || "").toLowerCase();
//         const texto = (novoAlerta.comentario || "").toLowerCase();

//         if (origem === "instagram" || texto.includes("instagram") || texto.includes("odiei")) {
//           console.log("🔔 Nova notificação: Instagram");
//           setNovasInsta(prev => prev + 1);
//         } else {
//           console.log("🔔 Nova notificação: Facebook");
//           setNovasFace(prev => prev + 1);
//         }
//       };

//       eventSource.onerror = () => {
//         console.log("Conexão SSE perdida. Tentando reconectar...");
//         eventSource.close();
//         setTimeout(connectSSE, 5000);
//       };

//       return eventSource;
//     };

//     const sse = connectSSE();
//     return () => sse.close();
//   }, []);

//   // 3. CONTROLE DOS MODAIS
//   const abrirModal = (rede) => {
//     setRedeSocialSelecionada(rede);
//     setModalAberto(true);
//   };

//   const fecharModal = () => {
//     // Ao fechar o modal daquela rede, limpamos a notificação
//     if (redeSocialSelecionada === "Instagram") setNovasInsta(0);
//     if (redeSocialSelecionada === "Facebook") setNovasFace(0);
//     setModalAberto(false);
//   };

//   // 4. PREPARAÇÃO DOS GRÁFICOS
//   const ultimos15 = [...dadosBanco].slice(0, 15).reverse();
//   const lineData = {
//     labels: ultimos15.map((f, i) => {
//         if (f.criadoEm) {
//             const d = new Date(f.criadoEm);
//             return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
//         }
//         return `T-${15-i}`;
//     }),
//     datasets: [
//       { 
//         label: "Positivos", 
//         data: ultimos15.map(f => f.sentimento === "POSITIVO" ? 1 : 0), 
//         borderColor: "#10b981", 
//         backgroundColor: "rgba(16, 185, 129, 0.2)", 
//         fill: true, tension: 0.4, pointRadius: 3 
//       },
//       { 
//         label: "Negativos", 
//         data: ultimos15.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), 
//         borderColor: "#ef4444", 
//         backgroundColor: "rgba(239, 68, 68, 0.2)", 
//         fill: true, tension: 0.4, pointRadius: 3 
//       }
//     ],
//   };

//   const mensagensFiltradas = dadosBanco.filter(f => {
//     const origem = (f.origem || "").toLowerCase();
//     const texto = (f.comentario || "").toLowerCase();
//     if (redeSocialSelecionada === "Instagram") return origem === "instagram" || texto.includes("instagram") || texto.includes("odiei");
//     if (redeSocialSelecionada === "Facebook") return origem === "facebook" || texto.includes("facebook") || (!origem && !texto.includes("odiei"));
//     return false;
//   });

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>
      
//       {/* ÍCONES DE NOTIFICAÇÃO (CANTO SUPERIOR DIREITO) */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
//         </button>
        
//         <button onClick={() => abrirModal("Instagram")} style={btnIconStyle}>
//           <Instagram color="#E4405F" size={24} />
//           {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
//         </button>

//         <button onClick={() => abrirModal("Facebook")} style={btnIconStyle}>
//           <Facebook color="#1877F2" size={24} />
//           {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
//         </button>

//         <button onClick={() => window.location.href = "/login"} style={{...btnIconStyle, border: "1px solid #ef4444"}}>
//           <LogOut size={22} color="#ef4444" />
//         </button>
//       </div>

//       <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard Analítico</h2>

//       {/* CARDS DE RESUMO */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #3b82f6" }}>
//           <span style={labelCard}>Total</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{dadosBanco.length}</div>
//         </div>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #10b981" }}>
//           <span style={labelCard}>Positivos</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{dadosBanco.filter(f => f.sentimento === "POSITIVO").length}</div>
//         </div>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #ef4444" }}>
//           <span style={labelCard}>Negativos</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{dadosBanco.filter(f => f.sentimento === "NEGATIVO").length}</div>
//         </div>
//       </div>

//       {/* ÁREA DE GRÁFICOS */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <div style={{ ...cardGrafico, flex: "2" }}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Evolução de Sentimentos</div>
//           <div style={{ height: "300px" }}><Line data={lineData} options={chartOptions} /></div>
//         </div>
//         <div style={{ ...cardGrafico, flex: "1" }}>
//           <div style={tituloGrafico}><PieChart size={18} /> Proporção Geral</div>
//           <div style={{ height: "300px" }}>
//             <Doughnut 
//               data={{
//                 labels: ["Positivos", "Negativos"],
//                 datasets: [{ 
//                     data: [
//                         dadosBanco.filter(f => f.sentimento === "POSITIVO").length, 
//                         dadosBanco.filter(f => f.sentimento === "NEGATIVO").length
//                     ], 
//                     backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 
//                 }]
//               }} 
//               options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: "#94a3b8" } } } }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* MODAL DE ALERTAS */}
//       {modalAberto && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
//               <h3 style={{ margin: 0 }}>Feed: {redeSocialSelecionada}</h3>
//               <X size={24} style={{ cursor: "pointer" }} onClick={fecharModal} />
//             </div>
//             <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//               {mensagensFiltradas.length > 0 ? mensagensFiltradas.map((m, i) => (
//                 <div key={i} style={mensagemItem}>
//                   <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>{m.comentario}</p>
//                   <span style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontSize: "12px", fontWeight: "bold" }}>
//                     {m.sentimento}
//                   </span>
//                 </div>
//               )) : <p style={{ textAlign: "center", color: "#94a3b8" }}>Nenhum dado capturado.</p>}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ESTILOS (CSS-IN-JS)
// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold", border: "2px solid #0f172a" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
// const cardResumo = { flex: "1", background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" };
// const cardGrafico = { background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155", minWidth: "350px" };
// const labelCard = { fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1" };
// const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "450px", border: "1px solid #334155" };
// const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };

// const chartOptions = { 
//   maintainAspectRatio: false, 
//   plugins: { legend: { labels: { color: '#94a3b8' } } },
//   scales: {
//     y: { beginAtZero: true, max: 1.5, ticks: { display: false }, grid: { color: "#334155" } },
//     x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
//   }
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, BarElement,
//   ArcElement, Title, Tooltip, Legend, Filler
// } from "chart.js";
// import { Bar, Doughnut } from "react-chartjs-2";
// import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, X } from "lucide-react";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [filtroTipo, setFiltroTipo] = useState(""); 
//   const [valorFiltro, setValorFiltro] = useState(""); 
//   const [novasInsta, setNovasInsta] = useState(0);
//   const [novasFace, setNovasFace] = useState(0);

//   const buscarDadosDoBanco = async () => {
//   setCarregando(true);
//   try {
//     // Chamando o backend Spring Boot correto
//     const response = await axios.get("http://localhost:8080/api/feedbacks?size=2000", {
//       headers: { 
//         'Authorization': `Basic ${btoa("admin:123456")}` // seu login/senha
//       }
//     });

//     // O Spring retorna um objeto com content, pageNumber, totalElements, totalPages
//     const lista = response.data.content || []; 
//     setDadosBanco(lista);
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error);
//   } finally {
//     setCarregando(false);
//   }
// };

//   useEffect(() => {
//     buscarDadosDoBanco();
//     const eventSource = new EventSource("http://localhost:8080/webhook/alerts");
    
//     eventSource.onmessage = (event) => {
//       const novoAlerta = JSON.parse(event.data);
//       setDadosBanco((prev) => [novoAlerta, ...prev]);
//       const origem = (novoAlerta.origem || "").toUpperCase();
//       if (origem === "INSTAGRAM") setNovasInsta(p => p + 1);
//       if (origem === "FACEBOOK" || origem === "PAGE") setNovasFace(p => p + 1);
//     };

//     return () => eventSource.close();
//   }, []);

//   const abrirModal = (tipo, valor) => {
//     setFiltroTipo(tipo);
//     setValorFiltro(valor);
//     setModalAberto(true);
//   };

//   const fecharModal = () => {
//     if (valorFiltro === "Instagram") setNovasInsta(0);
//     if (valorFiltro === "Facebook") setNovasFace(0);
//     setModalAberto(false);
//   };

//   const mensagensFiltradas = dadosBanco.filter(f => {
//     if (filtroTipo === "SENTIMENTO") {
//         if (valorFiltro === "TOTAL") return true;
//         return f.sentimento === valorFiltro;
//     }
//     if (filtroTipo === "REDE") {
//       const origem = (f.origem || "").toUpperCase();
//       if (valorFiltro === "Instagram") return origem === "INSTAGRAM";
//       if (valorFiltro === "Facebook") return origem === "FACEBOOK" || origem === "PAGE";
//     }
//     return true;
//   });

//   const ultimosRegistros = [...dadosBanco].slice(0, 10).reverse();
//   const barData = {
//     labels: ultimosRegistros.map(f => {
//       const data = f.criadoEm ? new Date(f.criadoEm) : new Date();
//       return `${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}`;
//     }),
//     datasets: [
//       { label: "Positivos", data: ultimosRegistros.map(f => f.sentimento === "POSITIVO" ? 1 : 0), backgroundColor: "#10b981", borderRadius: 4 },
//       { label: "Negativos", data: ultimosRegistros.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), backgroundColor: "#ef4444", borderRadius: 4 }
//     ],
//   };

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative", overflowX: "hidden" }}>
      
//       {/* HEADER BOTOES */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
//         </button>
//         <button onClick={() => abrirModal("REDE", "Instagram")} style={btnIconStyle}>
//           <Instagram color="#E4405F" size={24} />
//           {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
//         </button>
//         <button onClick={() => abrirModal("REDE", "Facebook")} style={btnIconStyle}>
//           <Facebook color="#1877F2" size={24} />
//           {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
//         </button>
//       </div>

//       <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard de Feedback</h2>

//       {/* CARDS RESUMO */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div onClick={() => abrirModal("SENTIMENTO", "TOTAL")} style={{ ...cardResumo, borderLeft: "6px solid #3b82f6", cursor: "pointer" }}>
//           <span style={labelCard}>Total</span>
//           <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{dadosBanco.length}</div>
//         </div>
//         <div onClick={() => abrirModal("SENTIMENTO", "POSITIVO")} style={{ ...cardResumo, borderLeft: "6px solid #10b981", cursor: "pointer" }}>
//           <span style={labelCard}>Positivos</span>
//           <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>{dadosBanco.filter(f => f.sentimento === "POSITIVO").length}</div>
//         </div>
//         <div onClick={() => abrirModal("SENTIMENTO", "NEGATIVO")} style={{ ...cardResumo, borderLeft: "6px solid #ef4444", cursor: "pointer" }}>
//           <span style={labelCard}>Negativos</span>
//           <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>{dadosBanco.filter(f => f.sentimento === "NEGATIVO").length}</div>
//         </div>
//       </div>

//       {/* ÁREA DE GRÁFICOS */}
//       <div style={{ display: "flex", gap: "20px", width: "95%", alignItems: "flex-start" }}>
//         <div style={{ ...cardGrafico, flex: "0 0 58%", height: "350px", minWidth: "0" }}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Histórico Temporal</div>
//           <div style={{ height: "250px" }}>
//             <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { ticks: { color: "#94a3b8" } } } }} />
//           </div>
//         </div>

//         <div style={{ ...cardGrafico, flex: "0 0 38%", height: "350px", minWidth: "0" }}>
//           <div style={tituloGrafico}><PieChart size={18} /> Proporção</div>
//           <div style={{ height: "250px" }}>
//             <Doughnut 
//               data={{
//                 labels: ["Positivos", "Negativos"],
//                 datasets: [{ data: [dadosBanco.filter(f => f.sentimento === "POSITIVO").length, dadosBanco.filter(f => f.sentimento === "NEGATIVO").length], backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 }]
//               }} 
//               options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: "#94a3b8" } } } }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {modalAberto && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//               <h3 style={{ margin: 0 }}>Visualizando: {valorFiltro}</h3>
//               <X size={28} style={{ cursor: "pointer" }} onClick={fecharModal} />
//             </div>
//             <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//               {mensagensFiltradas.map((m, i) => (
//                 <div key={i} style={mensagemItem}>
//                   <p style={{ margin: "0 0 8px 0" }}>{m.comentario}</p>
//                   <span style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontWeight: "bold", fontSize: "12px" }}>{m.sentimento}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
// const cardResumo = { flex: "1", background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" };
// const cardGrafico = { background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155" };
// const labelCard = { fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", color: "#cbd5e1", fontSize: "14px" };
// const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "650px", border: "1px solid #334155" };
// const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };

// export default Dashboard;


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
// import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, LogOut, X } from "lucide-react";

// ChartJS.register(
//   CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler
// );

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [redeSocialSelecionada, setRedeSocialSelecionada] = useState(null);
  
//   // ESTADOS PARA AS NOTIFICAÇÕES (BADGES)
//   const [novasInsta, setNovasInsta] = useState(0);
//   const [novasFace, setNovasFace] = useState(0);

//   // 1. BUSCA INICIAL DE DADOS (HISTÓRICO)
//   const buscarDadosDoBanco = async () => {
//     setCarregando(true);
//     try {
//       const response = await axios.get("http://localhost:8080/sentiments?size=999", {
//         headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
//       });
//       const lista = response.data.conteudo || response.data || [];
//       setDadosBanco(lista);
//     } catch (error) {
//       console.error("Erro ao buscar dados:", error);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   // 2. CONEXÃO REAL-TIME E LÓGICA DE NOTIFICAÇÃO
//   useEffect(() => {
//     buscarDadosDoBanco();

//     const connectSSE = () => {
//       // URL que bate com seu AlertController.java
//       const eventSource = new EventSource("http://localhost:8080/notifications/alerts");

//       eventSource.onmessage = (event) => {
//         const novoAlerta = JSON.parse(event.data);
//         console.log("DADOS BRUTOS RECEBIDOS:", novoAlerta);

//         // Atualiza a lista geral para os gráficos
//         setDadosBanco((prev) => [novoAlerta, ...prev]);

//         // --- LÓGICA DE DETECÇÃO PARA O BADGE ---
//         const origem = (novoAlerta.origem || novoAlerta.object || "").toLowerCase();
//         const texto = (novoAlerta.comentario || "").toLowerCase();

//         if (origem === "instagram" || texto.includes("instagram") || texto.includes("odiei")) {
//           console.log("🔔 Nova notificação: Instagram");
//           setNovasInsta(prev => prev + 1);
//         } else {
//           console.log("🔔 Nova notificação: Facebook");
//           setNovasFace(prev => prev + 1);
//         }
//       };

//       eventSource.onerror = () => {
//         console.log("Conexão SSE perdida. Tentando reconectar...");
//         eventSource.close();
//         setTimeout(connectSSE, 5000);
//       };

//       return eventSource;
//     };

//     const sse = connectSSE();
//     return () => sse.close();
//   }, []);

//   // 3. CONTROLE DOS MODAIS
//   const abrirModal = (rede) => {
//     setRedeSocialSelecionada(rede);
//     setModalAberto(true);
//   };

//   const fecharModal = () => {
//     // Ao fechar o modal daquela rede, limpamos a notificação
//     if (redeSocialSelecionada === "Instagram") setNovasInsta(0);
//     if (redeSocialSelecionada === "Facebook") setNovasFace(0);
//     setModalAberto(false);
//   };

//   // 4. PREPARAÇÃO DOS GRÁFICOS
//   const ultimos15 = [...dadosBanco].slice(0, 15).reverse();
//   const lineData = {
//     labels: ultimos15.map((f, i) => {
//         if (f.criadoEm) {
//             const d = new Date(f.criadoEm);
//             return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
//         }
//         return `T-${15-i}`;
//     }),
//     datasets: [
//       { 
//         label: "Positivos", 
//         data: ultimos15.map(f => f.sentimento === "POSITIVO" ? 1 : 0), 
//         borderColor: "#10b981", 
//         backgroundColor: "rgba(16, 185, 129, 0.2)", 
//         fill: true, tension: 0.4, pointRadius: 3 
//       },
//       { 
//         label: "Negativos", 
//         data: ultimos15.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), 
//         borderColor: "#ef4444", 
//         backgroundColor: "rgba(239, 68, 68, 0.2)", 
//         fill: true, tension: 0.4, pointRadius: 3 
//       }
//     ],
//   };

//   const mensagensFiltradas = dadosBanco.filter(f => {
//     const origem = (f.origem || "").toLowerCase();
//     const texto = (f.comentario || "").toLowerCase();
//     if (redeSocialSelecionada === "Instagram") return origem === "instagram" || texto.includes("instagram") || texto.includes("odiei");
//     if (redeSocialSelecionada === "Facebook") return origem === "facebook" || texto.includes("facebook") || (!origem && !texto.includes("odiei"));
//     return false;
//   });

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>
      
//       {/* ÍCONES DE NOTIFICAÇÃO (CANTO SUPERIOR DIREITO) */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
//         </button>
        
//         <button onClick={() => abrirModal("Instagram")} style={btnIconStyle}>
//           <Instagram color="#E4405F" size={24} />
//           {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
//         </button>

//         <button onClick={() => abrirModal("Facebook")} style={btnIconStyle}>
//           <Facebook color="#1877F2" size={24} />
//           {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
//         </button>

//         <button onClick={() => window.location.href = "/login"} style={{...btnIconStyle, border: "1px solid #ef4444"}}>
//           <LogOut size={22} color="#ef4444" />
//         </button>
//       </div>

//       <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard Analítico</h2>

//       {/* CARDS DE RESUMO */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #3b82f6" }}>
//           <span style={labelCard}>Total</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{dadosBanco.length}</div>
//         </div>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #10b981" }}>
//           <span style={labelCard}>Positivos</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{dadosBanco.filter(f => f.sentimento === "POSITIVO").length}</div>
//         </div>
//         <div style={{ ...cardResumo, borderLeft: "6px solid #ef4444" }}>
//           <span style={labelCard}>Negativos</span>
//           <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{dadosBanco.filter(f => f.sentimento === "NEGATIVO").length}</div>
//         </div>
//       </div>

//       {/* ÁREA DE GRÁFICOS */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <div style={{ ...cardGrafico, flex: "2" }}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Evolução de Sentimentos</div>
//           <div style={{ height: "300px" }}><Line data={lineData} options={chartOptions} /></div>
//         </div>
//         <div style={{ ...cardGrafico, flex: "1" }}>
//           <div style={tituloGrafico}><PieChart size={18} /> Proporção Geral</div>
//           <div style={{ height: "300px" }}>
//             <Doughnut 
//               data={{
//                 labels: ["Positivos", "Negativos"],
//                 datasets: [{ 
//                     data: [
//                         dadosBanco.filter(f => f.sentimento === "POSITIVO").length, 
//                         dadosBanco.filter(f => f.sentimento === "NEGATIVO").length
//                     ], 
//                     backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 
//                 }]
//               }} 
//               options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: "#94a3b8" } } } }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* MODAL DE ALERTAS */}
//       {modalAberto && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
//               <h3 style={{ margin: 0 }}>Feed: {redeSocialSelecionada}</h3>
//               <X size={24} style={{ cursor: "pointer" }} onClick={fecharModal} />
//             </div>
//             <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//               {mensagensFiltradas.length > 0 ? mensagensFiltradas.map((m, i) => (
//                 <div key={i} style={mensagemItem}>
//                   <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>{m.comentario}</p>
//                   <span style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontSize: "12px", fontWeight: "bold" }}>
//                     {m.sentimento}
//                   </span>
//                 </div>
//               )) : <p style={{ textAlign: "center", color: "#94a3b8" }}>Nenhum dado capturado.</p>}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ESTILOS (CSS-IN-JS)
// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold", border: "2px solid #0f172a" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
// const cardResumo = { flex: "1", background: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155" };
// const cardGrafico = { background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155", minWidth: "350px" };
// const labelCard = { fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "#cbd5e1" };
// const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "450px", border: "1px solid #334155" };
// const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };

// const chartOptions = { 
//   maintainAspectRatio: false, 
//   plugins: { legend: { labels: { color: '#94a3b8' } } },
//   scales: {
//     y: { beginAtZero: true, max: 1.5, ticks: { display: false }, grid: { color: "#334155" } },
//     x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
//   }
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, BarElement,
//   ArcElement, Title, Tooltip, Legend, Filler
// } from "chart.js";
// import { Bar, Doughnut } from "react-chartjs-2";
// import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, X } from "lucide-react";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [filtroTipo, setFiltroTipo] = useState(""); 
//   const [valorFiltro, setValorFiltro] = useState(""); 
//   const [novasInsta, setNovasInsta] = useState(0);
//   const [novasFace, setNovasFace] = useState(0);

//   const buscarDadosDoBanco = async () => {
//   setCarregando(true);
//   try {
//     // Chamando o backend Spring Boot correto
//     const response = await axios.get("http://localhost:8080/api/feedbacks?size=2000", {
//       headers: { 
//         'Authorization': `Basic ${btoa("admin:123456")}` // seu login/senha
//       }
//     });

//     // O Spring retorna um objeto com content, pageNumber, totalElements, totalPages
//     const lista = response.data.content || []; 
//     setDadosBanco(lista);
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error);
//   } finally {
//     setCarregando(false);
//   }
// };

//   useEffect(() => {
//     buscarDadosDoBanco();
//     const eventSource = new EventSource("http://localhost:8080/webhook/alerts");
    
//     eventSource.onmessage = (event) => {
//       const novoAlerta = JSON.parse(event.data);
//       setDadosBanco((prev) => [novoAlerta, ...prev]);
//       const origem = (novoAlerta.origem || "").toUpperCase();
//       if (origem === "INSTAGRAM") setNovasInsta(p => p + 1);
//       if (origem === "FACEBOOK" || origem === "PAGE") setNovasFace(p => p + 1);
//     };

//     return () => eventSource.close();
//   }, []);

//   const abrirModal = (tipo, valor) => {
//     setFiltroTipo(tipo);
//     setValorFiltro(valor);
//     setModalAberto(true);
//   };

//   const fecharModal = () => {
//     if (valorFiltro === "Instagram") setNovasInsta(0);
//     if (valorFiltro === "Facebook") setNovasFace(0);
//     setModalAberto(false);
//   };

//   const mensagensFiltradas = dadosBanco.filter(f => {
//     if (filtroTipo === "SENTIMENTO") {
//         if (valorFiltro === "TOTAL") return true;
//         return f.sentimento === valorFiltro;
//     }
//     if (filtroTipo === "REDE") {
//       const origem = (f.origem || "").toUpperCase();
//       if (valorFiltro === "Instagram") return origem === "INSTAGRAM";
//       if (valorFiltro === "Facebook") return origem === "FACEBOOK" || origem === "PAGE";
//     }
//     return true;
//   });

//   const ultimosRegistros = [...dadosBanco].slice(0, 10).reverse();
//   const barData = {
//     labels: ultimosRegistros.map(f => {
//       const data = f.criadoEm ? new Date(f.criadoEm) : new Date();
//       return `${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}`;
//     }),
//     datasets: [
//       { label: "Positivos", data: ultimosRegistros.map(f => f.sentimento === "POSITIVO" ? 1 : 0), backgroundColor: "#10b981", borderRadius: 4 },
//       { label: "Negativos", data: ultimosRegistros.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), backgroundColor: "#ef4444", borderRadius: 4 }
//     ],
//   };

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative", overflowX: "hidden" }}>
      
//       {/* HEADER BOTOES */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
//         </button>
//         <button onClick={() => abrirModal("REDE", "Instagram")} style={btnIconStyle}>
//           <Instagram color="#E4405F" size={24} />
//           {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
//         </button>
//         <button onClick={() => abrirModal("REDE", "Facebook")} style={btnIconStyle}>
//           <Facebook color="#1877F2" size={24} />
//           {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
//         </button>
//       </div>

//       <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard de Feedback</h2>

//       {/* CARDS RESUMO */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <div onClick={() => abrirModal("SENTIMENTO", "TOTAL")} style={{ ...cardResumo, borderLeft: "6px solid #3b82f6", cursor: "pointer" }}>
//           <span style={labelCard}>Total</span>
//           <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{dadosBanco.length}</div>
//         </div>
//         <div onClick={() => abrirModal("SENTIMENTO", "POSITIVO")} style={{ ...cardResumo, borderLeft: "6px solid #10b981", cursor: "pointer" }}>
//           <span style={labelCard}>Positivos</span>
//           <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>{dadosBanco.filter(f => f.sentimento === "POSITIVO").length}</div>
//         </div>
//         <div onClick={() => abrirModal("SENTIMENTO", "NEGATIVO")} style={{ ...cardResumo, borderLeft: "6px solid #ef4444", cursor: "pointer" }}>
//           <span style={labelCard}>Negativos</span>
//           <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>{dadosBanco.filter(f => f.sentimento === "NEGATIVO").length}</div>
//         </div>
//       </div>

//       {/* ÁREA DE GRÁFICOS */}
//       <div style={{ display: "flex", gap: "20px", width: "95%", alignItems: "flex-start" }}>
//         <div style={{ ...cardGrafico, flex: "0 0 58%", height: "350px", minWidth: "0" }}>
//           <div style={tituloGrafico}><TrendingUp size={18} /> Histórico Temporal</div>
//           <div style={{ height: "250px" }}>
//             <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { ticks: { color: "#94a3b8" } } } }} />
//           </div>
//         </div>

//         <div style={{ ...cardGrafico, flex: "0 0 38%", height: "350px", minWidth: "0" }}>
//           <div style={tituloGrafico}><PieChart size={18} /> Proporção</div>
//           <div style={{ height: "250px" }}>
//             <Doughnut 
//               data={{
//                 labels: ["Positivos", "Negativos"],
//                 datasets: [{ data: [dadosBanco.filter(f => f.sentimento === "POSITIVO").length, dadosBanco.filter(f => f.sentimento === "NEGATIVO").length], backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 }]
//               }} 
//               options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: "#94a3b8" } } } }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {modalAberto && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//               <h3 style={{ margin: 0 }}>Visualizando: {valorFiltro}</h3>
//               <X size={28} style={{ cursor: "pointer" }} onClick={fecharModal} />
//             </div>
//             <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//               {mensagensFiltradas.map((m, i) => (
//                 <div key={i} style={mensagemItem}>
//                   <p style={{ margin: "0 0 8px 0" }}>{m.comentario}</p>
//                   <span style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontWeight: "bold", fontSize: "12px" }}>{m.sentimento}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
// const cardResumo = { flex: "1", background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" };
// const cardGrafico = { background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155" };
// const labelCard = { fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" };
// const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", color: "#cbd5e1", fontSize: "14px" };
// const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "650px", border: "1px solid #334155" };
// const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };

// export default Dashboard;




// 000000000000000000000

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
// import {
//   TrendingUp,
//   PieChart,
//   Instagram,
//   Facebook,
//   Home,
//   RefreshCw,
//   LogOut,
//   X
// } from "lucide-react";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Dashboard = () => {
//   const [dadosBanco, setDadosBanco] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [redeSocialSelecionada, setRedeSocialSelecionada] = useState(null);

//   // ESTADOS PARA AS NOTIFICAÇÕES (BADGES)
//   const [novasInsta, setNovasInsta] = useState(0);
//   const [novasFace, setNovasFace] = useState(0);

//   // 1. BUSCA INICIAL DE DADOS (HISTÓRICO)
//   const buscarDadosDoBanco = async () => {
//     setCarregando(true);
//     try {
//       const response = await axios.get("http://localhost:8080/sentiments?size=999", {
//         headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
//       });
//       const lista = response.data.conteudo || response.data.content || response.data || [];

//       // --- CORREÇÃO PRINCIPAL: PADRONIZAR OS CAMPOS PARA SEU DASHBOARD ---
//       const listaFormatada = lista.map(item => ({
//         sentimento: item.sentimento || item.sentimentoText || "NEUTRO",
//         comentario: item.comentario || item.mensagem || "",
//         origem: item.origem || item.rede || "",
//         criadoEm: item.criadoEm || item.data || new Date().toISOString()
//       }));

//       setDadosBanco(listaFormatada);
//     } catch (error) {
//       console.error("Erro ao buscar dados:", error);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   // 2. CONEXÃO REAL-TIME E LÓGICA DE NOTIFICAÇÃO
//   useEffect(() => {
//     buscarDadosDoBanco();

//     const eventSource = new EventSource("http://localhost:8080/notifications/alerts");
//     eventSource.onmessage = (event) => {
//       const novoAlerta = JSON.parse(event.data);

//       // --- PADRONIZAÇÃO DOS DADOS RECEBIDOS EM TEMPO REAL ---
//       const alertaFormatado = {
//         sentimento: novoAlerta.sentimento || novoAlerta.sentimentoText || "NEUTRO",
//         comentario: novoAlerta.comentario || novoAlerta.mensagem || "",
//         origem: novoAlerta.origem || novoAlerta.rede || "",
//         criadoEm: novoAlerta.criadoEm || novoAlerta.data || new Date().toISOString()
//       };

//       setDadosBanco((prev) => [alertaFormatado, ...prev]);

//       const origem = (alertaFormatado.origem || "").toLowerCase();
//       if (origem === "instagram") setNovasInsta(p => p + 1);
//       if (origem === "facebook" || origem === "page") setNovasFace(p => p + 1);
//     };

//     return () => eventSource.close();
//   }, []);

//   // 3. CONTROLE DOS MODAIS
//   const abrirModal = (rede) => {
//     setRedeSocialSelecionada(rede);
//     setModalAberto(true);
//   };

//   const fecharModal = () => {
//     if (redeSocialSelecionada === "Instagram") setNovasInsta(0);
//     if (redeSocialSelecionada === "Facebook") setNovasFace(0);
//     setModalAberto(false);
//   };

//   // 4. FILTRO MODAL
//   const mensagensFiltradas = dadosBanco.filter((f) => {
//     const origem = (f.origem || "").toLowerCase();
//     const texto = (f.comentario || "").toLowerCase();

//     if (redeSocialSelecionada === "Instagram")
//       return origem === "instagram" || texto.includes("odiei");

//     if (redeSocialSelecionada === "Facebook")
//       return origem === "facebook";

//     return false;
//   });

//   // 5. GRÁFICOS
//   const ultimos15 = [...dadosBanco].slice(0, 15).reverse();
//   const lineData = {
//     labels: ultimos15.map((f, i) => {
//       if (f.criadoEm) {
//         const d = new Date(f.criadoEm);
//         return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
//       }
//       return `T-${15 - i}`;
//     }),
//     datasets: [
//       {
//         label: "Positivos",
//         data: ultimos15.map(f => f.sentimento === "POSITIVO" ? 1 : 0),
//         borderColor: "#10b981",
//         backgroundColor: "rgba(16,185,129,0.2)",
//         fill: true,
//         tension: 0.4,
//         pointRadius: 3
//       },
//       {
//         label: "Negativos",
//         data: ultimos15.map(f => f.sentimento === "NEGATIVO" ? 1 : 0),
//         borderColor: "#ef4444",
//         backgroundColor: "rgba(239,68,68,0.2)",
//         fill: true,
//         tension: 0.4,
//         pointRadius: 3
//       }
//     ]
//   };

//   return (
//     <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>
//       {/* ÍCONES SUPERIORES */}
//       <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
//         <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
//           <RefreshCw size={22} className={carregando ? "animate-spin" : ""} />
//         </button>

//         <button onClick={() => abrirModal("Instagram")} style={btnIconStyle}>
//           <Instagram color="#E4405F" />
//           {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
//         </button>

//         <button onClick={() => abrirModal("Facebook")} style={btnIconStyle}>
//           <Facebook color="#1877F2" />
//           {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
//         </button>

//         <button onClick={() => (window.location.href = "/login")} style={btnIconStyle}>
//           <LogOut color="#ef4444" />
//         </button>
//       </div>

//       <button onClick={() => (window.location.href = "/")} style={btnHomeStyle}>
//         <Home size={18} /> Home
//       </button>

//       <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard Analítico</h2>

//       {/* RESUMO */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//         <Resumo titulo="Total" valor={dadosBanco.length} cor="#3b82f6" />
//         <Resumo titulo="Positivos" valor={dadosBanco.filter(f => f.sentimento === "POSITIVO").length} cor="#10b981" />
//         <Resumo titulo="Negativos" valor={dadosBanco.filter(f => f.sentimento === "NEGATIVO").length} cor="#ef4444" />
//       </div>

//       {/* GRÁFICOS */}
//       <div style={{ display: "flex", gap: "20px" }}>
//         <div style={cardGrafico}>
//           <Line data={lineData} options={chartOptions} />
//         </div>

//         <div style={cardGrafico}>
//           <Doughnut
//             data={{
//               labels: ["Positivos", "Negativos"],
//               datasets: [{
//                 data: [
//                   dadosBanco.filter(f => f.sentimento === "POSITIVO").length,
//                   dadosBanco.filter(f => f.sentimento === "NEGATIVO").length
//                 ],
//                 backgroundColor: ["#10b981", "#ef4444"]
//               }]
//             }}
//           />
//         </div>
//       </div>

//       {/* MODAL */}
//       {modalAberto && (
//         <div style={modalOverlay}>
//           <div style={modalContent}>
//             <X onClick={fecharModal} style={{ cursor: "pointer", float: "right" }} />
//             {mensagensFiltradas.map((m, i) => (
//               <div key={i} style={mensagemItem}>{m.comentario}</div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* === ESTILOS === */
// const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", position: "relative" };
// const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "11px" };
// const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", marginBottom: "20px" };
// const cardGrafico = { flex: 1, background: "#1e293b", padding: "20px", borderRadius: "12px" };
// const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center" };
// const modalContent = { background: "#1e293b", padding: "20px", borderRadius: "12px", width: "400px" };
// const mensagemItem = { padding: "10px", background: "#0f172a", marginBottom: "10px", borderRadius: "6px" };
// const chartOptions = { responsive: true, plugins: { legend: { labels: { color: "#94a3b8" } } }, scales: { y: { display: false }, x: { ticks: { color: "#94a3b8" } } } };
// const Resumo = ({ titulo, valor, cor }) => (<div style={{ flex: 1, background: "#1e293b", padding: "20px", borderLeft: `6px solid ${cor}` }}><span>{titulo}</span><div style={{ fontSize: "28px", color: cor }}>{valor}</div></div>);

// export default Dashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, Title, Tooltip, Legend, Filler
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { TrendingUp, PieChart, Instagram, Facebook, Home, RefreshCw, X } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [dadosBanco, setDadosBanco] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState(""); 
  const [valorFiltro, setValorFiltro] = useState(""); 
  const [novasInsta, setNovasInsta] = useState(0);
  const [novasFace, setNovasFace] = useState(0);

  // --- PADRONIZAÇÃO DE DADOS
  const padronizarDados = (lista) => {
    return lista.map(item => ({
      sentimento: item.sentimento || item.sentimentoText || "NEUTRO",
      comentario: item.comentario || item.mensagem || "",
      origem: item.origem || item.rede || "",
      criadoEm: item.criadoEm || item.data || new Date().toISOString()
    }));
  };

  const buscarDadosDoBanco = async () => {
    setCarregando(true);
    try {
      const response = await axios.get("http://localhost:8080/sentiments?size=2000", {
        headers: { 'Authorization': `Basic ${btoa("admin:123456")}` }
      });
      const lista = response.data.conteudo || response.data.content || response.data || [];
      setDadosBanco(padronizarDados(lista));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosDoBanco();
    const eventSource = new EventSource("http://localhost:8080/webhook/alerts");
    
    eventSource.onmessage = (event) => {
      const novoAlerta = JSON.parse(event.data);
      const alertaFormatado = padronizarDados([novoAlerta])[0]; // transforma em objeto padronizado
      setDadosBanco(prev => [alertaFormatado, ...prev]);

      const origem = (alertaFormatado.origem || "").toUpperCase();
      if (origem === "INSTAGRAM") setNovasInsta(p => p + 1);
      if (origem === "FACEBOOK" || origem === "PAGE") setNovasFace(p => p + 1);
    };

    return () => eventSource.close();
  }, []);

  const abrirModal = (tipo, valor) => {
    setFiltroTipo(tipo);
    setValorFiltro(valor);
    setModalAberto(true);
  };

  const fecharModal = () => {
    if (valorFiltro === "Instagram") setNovasInsta(0);
    if (valorFiltro === "Facebook") setNovasFace(0);
    setModalAberto(false);
  };

  const mensagensFiltradas = dadosBanco.filter(f => {
    if (filtroTipo === "SENTIMENTO") {
      if (valorFiltro === "TOTAL") return true;
      return f.sentimento === valorFiltro;
    }
    if (filtroTipo === "REDE") {
      const origem = (f.origem || "").toUpperCase();
      if (valorFiltro === "Instagram") return origem === "INSTAGRAM";
      if (valorFiltro === "Facebook") return origem === "FACEBOOK" || origem === "PAGE";
    }
    return true;
  });

  const ultimosRegistros = [...dadosBanco].slice(0, 10).reverse();
  const barData = {
    labels: ultimosRegistros.map(f => {
      const data = f.criadoEm ? new Date(f.criadoEm) : new Date();
      return `${data.getHours()}:${String(data.getMinutes()).padStart(2, '0')}`;
    }),
    datasets: [
      { label: "Positivos", data: ultimosRegistros.map(f => f.sentimento === "POSITIVO" ? 1 : 0), backgroundColor: "#10b981", borderRadius: 4 },
      { label: "Negativos", data: ultimosRegistros.map(f => f.sentimento === "NEGATIVO" ? 1 : 0), backgroundColor: "#ef4444", borderRadius: 4 }
    ],
  };

  return (
    <div style={{ padding: "30px", color: "white", minHeight: "100vh", backgroundColor: "#0f172a", position: "relative", overflowX: "hidden" }}>
      
      {/* HEADER BOTOES */}
      <div style={{ position: "absolute", top: "30px", right: "30px", display: "flex", gap: "15px", zIndex: 100 }}>
        <button onClick={buscarDadosDoBanco} style={btnIconStyle}>
          <RefreshCw size={22} color="#94a3b8" className={carregando ? "animate-spin" : ""} />
        </button>
        <button onClick={() => abrirModal("REDE", "Instagram")} style={btnIconStyle}>
          <Instagram color="#E4405F" size={24} />
          {novasInsta > 0 && <span style={badgeStyle}>{novasInsta}</span>}
        </button>
        <button onClick={() => abrirModal("REDE", "Facebook")} style={btnIconStyle}>
          <Facebook color="#1877F2" size={24} />
          {novasFace > 0 && <span style={badgeStyle}>{novasFace}</span>}
        </button>
      </div>

      <button onClick={() => window.location.href = "/"} style={btnHomeStyle}><Home size={18} /> Home</button>
      <h2 style={{ marginBottom: "25px", fontWeight: "600" }}>Dashboard de Feedback</h2>

      {/* CARDS RESUMO */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div onClick={() => abrirModal("SENTIMENTO", "TOTAL")} style={{ ...cardResumo, borderLeft: "6px solid #3b82f6", cursor: "pointer" }}>
          <span style={labelCard}>Total</span>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{dadosBanco.length}</div>
        </div>
        <div onClick={() => abrirModal("SENTIMENTO", "POSITIVO")} style={{ ...cardResumo, borderLeft: "6px solid #10b981", cursor: "pointer" }}>
          <span style={labelCard}>Positivos</span>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>{dadosBanco.filter(f => f.sentimento === "POSITIVO").length}</div>
        </div>
        <div onClick={() => abrirModal("SENTIMENTO", "NEGATIVO")} style={{ ...cardResumo, borderLeft: "6px solid #ef4444", cursor: "pointer" }}>
          <span style={labelCard}>Negativos</span>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>{dadosBanco.filter(f => f.sentimento === "NEGATIVO").length}</div>
        </div>
      </div>

      {/* ÁREA DE GRÁFICOS */}
      <div style={{ display: "flex", gap: "20px", width: "95%", alignItems: "flex-start" }}>
        <div style={{ ...cardGrafico, flex: "0 0 58%", height: "350px", minWidth: "0" }}>
          <div style={tituloGrafico}><TrendingUp size={18} /> Histórico Temporal</div>
          <div style={{ height: "250px" }}>
            <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { ticks: { color: "#94a3b8" } } } }} />
          </div>
        </div>

        <div style={{ ...cardGrafico, flex: "0 0 38%", height: "350px", minWidth: "0" }}>
          <div style={tituloGrafico}><PieChart size={18} /> Proporção</div>
          <div style={{ height: "250px" }}>
            <Doughnut 
              data={{
                labels: ["Positivos", "Negativos"],
                datasets: [{ data: [dadosBanco.filter(f => f.sentimento === "POSITIVO").length, dadosBanco.filter(f => f.sentimento === "NEGATIVO").length], backgroundColor: ["#10b981", "#ef4444"], borderWidth: 0 }]
              }} 
              options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: "#94a3b8" } } } }}
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Visualizando: {valorFiltro}</h3>
              <X size={28} style={{ cursor: "pointer" }} onClick={fecharModal} />
            </div>
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {mensagensFiltradas.map((m, i) => (
                <div key={i} style={mensagemItem}>
                  <p style={{ margin: "0 0 8px 0" }}>{m.comentario}</p>
                  <span style={{ color: m.sentimento === "POSITIVO" ? "#10b981" : "#ef4444", fontWeight: "bold", fontSize: "12px" }}>{m.sentimento}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const btnIconStyle = { width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" };
const badgeStyle = { position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ef4444", color: "white", borderRadius: "50%", minWidth: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" };
const btnHomeStyle = { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" };
const cardResumo = { flex: "1", background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155" };
const cardGrafico = { background: "#1e293b", padding: "25px", borderRadius: "15px", border: "1px solid #334155" };
const labelCard = { fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" };
const tituloGrafico = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", color: "#cbd5e1", fontSize: "14px" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContent = { backgroundColor: "#1e293b", padding: "30px", borderRadius: "20px", width: "650px", border: "1px solid #334155" };
const mensagemItem = { padding: "15px", borderBottom: "1px solid #334155", backgroundColor: "#0f172a", marginBottom: "10px", borderRadius: "8px" };

export default Dashboard;