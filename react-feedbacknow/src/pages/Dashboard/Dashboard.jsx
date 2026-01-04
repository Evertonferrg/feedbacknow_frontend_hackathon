import React, { useState } from "react";
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
import { X, TrendingUp, PieChart, MessageCircle, Instagram, Facebook, Home, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

// REGISTRO OBRIGATÓRIO
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({ sampleFeedbacks = [] }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState(null);
  const [paginaPositivos, setPaginaPositivos] = useState(0);
  const [paginaNegativos, setPaginaNegativos] = useState(0);
  const itensPorPagina = 10;

  // --- DADOS DE EXEMPLO ---
  const dadosExemplo = [
    { 
      date: "Seg", 
      positivos: 12, 
      negativos: 3,
      mensagens: [
        { text: "Adorei o produto! Muito útil", sentiment: "pos", platform: "instagram", isNew: true },
        { text: "Excelente atendimento", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Não gostei da demora", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Muito satisfeito com a compra", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Produto de baixa qualidade", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Recomendo para todos", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Não atendeu às expectativas", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Atendimento rápido e eficiente", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Demorou muito para chegar", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Superou minhas expectativas", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Produto com defeito", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Compraria novamente", sentiment: "pos", platform: "facebook", isNew: false },
      ]
    },
    { 
      date: "Ter", 
      positivos: 15, 
      negativos: 2,
      mensagens: [
        { text: "Muito bom, recomendo", sentiment: "pos", platform: "facebook", isNew: true },
        { text: "Produto veio com defeito", sentiment: "neg", platform: "facebook", isNew: false },
        { text: "Ótimo custo-benefício", sentiment: "pos", platform: "instagram", isNew: true },
        { text: "Embalagem danificada", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Entrega antes do prazo", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Não funciona direito", sentiment: "neg", platform: "instagram", isNew: true },
        { text: "Produto excelente", sentiment: "pos", platform: "facebook", isNew: false },
        { text: "Atendimento péssimo", sentiment: "neg", platform: "facebook", isNew: true },
        { text: "Muito feliz com a compra", sentiment: "pos", platform: "instagram", isNew: false },
        { text: "Não recomendo", sentiment: "neg", platform: "instagram", isNew: true },
      ]
    },
  ];

  // Usar dados de exemplo se não vier prop
  const feedbacks = sampleFeedbacks.length > 0 ? sampleFeedbacks : dadosExemplo;

  // --- PROCESSAMENTO DE DADOS ---
  const labels = feedbacks.map((f) => f.date);
  const dadosPositivos = feedbacks.map((f) => f.positivos);
  const dadosNegativos = feedbacks.map((f) => f.negativos);

  const totalPos = dadosPositivos.reduce((a, b) => a + b, 0);
  const totalNeg = dadosNegativos.reduce((a, b) => a + b, 0);
  const total = totalPos + totalNeg;
  const percentualPos = total > 0 ? ((totalPos / total) * 100).toFixed(1) : 0;
  const percentualNeg = total > 0 ? ((totalNeg / total) * 100).toFixed(1) : 0;

  // Contar mensagens novas por plataforma
  const todasMensagens = feedbacks.flatMap((dia) => dia.mensagens || []);
  const novasInstagram = todasMensagens.filter(m => m.platform === "instagram" && m.isNew).length;
  const novasFacebook = todasMensagens.filter(m => m.platform === "facebook" && m.isNew).length;

  // Separar mensagens positivas e negativas
  const todasPositivas = todasMensagens.filter(m => m.sentiment === 'pos');
  const todasNegativas = todasMensagens.filter(m => m.sentiment === 'neg');

  // Calcular páginas
  const totalPaginasPositivos = Math.ceil(todasPositivas.length / itensPorPagina);
  const totalPaginasNegativos = Math.ceil(todasNegativas.length / itensPorPagina);

  // Obter mensagens para exibição
  const mensagensNovasInstagram = todasMensagens
    .filter(m => m.platform === 'instagram' && m.isNew);

  const mensagensNovasFacebook = todasMensagens
    .filter(m => m.platform === 'facebook' && m.isNew);

  // Função para obter mensagens paginadas
  const getMensagensPaginadas = () => {
    if (tipoFiltro === 'pos') {
      const start = paginaPositivos * itensPorPagina;
      const end = start + itensPorPagina;
      return todasPositivas.slice(start, end);
    }
    if (tipoFiltro === 'neg') {
      const start = paginaNegativos * itensPorPagina;
      const end = start + itensPorPagina;
      return todasNegativas.slice(start, end);
    }
    if (tipoFiltro === 'instagram') return mensagensNovasInstagram;
    if (tipoFiltro === 'facebook') return mensagensNovasFacebook;
    return [];
  };

  const getTotalPaginasAtual = () => {
    if (tipoFiltro === 'pos') return totalPaginasPositivos;
    if (tipoFiltro === 'neg') return totalPaginasNegativos;
    return 1;
  };

  const getPaginaAtual = () => {
    if (tipoFiltro === 'pos') return paginaPositivos;
    if (tipoFiltro === 'neg') return paginaNegativos;
    return 0;
  };

  const setPaginaAtual = (novaPagina) => {
    if (tipoFiltro === 'pos') setPaginaPositivos(novaPagina);
    if (tipoFiltro === 'neg') setPaginaNegativos(novaPagina);
  };

  const abrirModal = (tipo) => {
    setTipoFiltro(tipo);
    setModalAberto(true);
  };

  // --- FUNÇÃO PARA GERAR PDF COM DADOS ---
  const gerarPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR');

    // Título
    pdf.setFontSize(20);
    pdf.setTextColor(59, 130, 246);
    pdf.text("RELATÓRIO DE FEEDBACKS", 105, 20, { align: 'center' });
    
    pdf.setFontSize(11);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Gerado em: ${dataAtual} às ${horaAtual}`, 105, 28, { align: 'center' });

    // Linha divisória
    pdf.setDrawColor(59, 130, 246);
    pdf.line(20, 32, 190, 32);

    // Seção 1: Resumo Estatístico
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("1. RESUMO ESTATÍSTICO", 20, 45);

    pdf.setFontSize(11);
    pdf.setTextColor(80, 80, 80);
    
    const resumoData = [
      ["Métrica", "Quantidade", "Percentual"],
      ["Feedbacks Positivos", totalPos.toString(), `${percentualPos}%`],
      ["Feedbacks Negativos", totalNeg.toString(), `${percentualNeg}%`],
      ["Total de Feedbacks", total.toString(), "100%"],
      ["Novos no Instagram", novasInstagram.toString(), "-"],
      ["Novos no Facebook", novasFacebook.toString(), "-"],
    ];

    pdf.autoTable({
      startY: 50,
      head: [resumoData[0]],
      body: resumoData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40, halign: 'center' },
        2: { cellWidth: 40, halign: 'center' }
      },
      margin: { left: 20, right: 20 }
    });

    // Seção 2: Evolução Diária (gráfico descritivo)
    const lastY = pdf.lastAutoTable.finalY + 15;
    pdf.setFontSize(16);
    pdf.text("2. EVOLUÇÃO DIÁRIA", 20, lastY);

    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);
    
    let yPos = lastY + 10;
    feedbacks.forEach(dia => {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }
      
      pdf.text(`• ${dia.date}: Positivos: ${dia.positivos} | Negativos: ${dia.negativos}`, 25, yPos);
      yPos += 7;
    });

    // Seção 3: Amostra de Feedbacks
    if (yPos > 220) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(16);
    pdf.text("3. AMOSTRA DE FEEDBACKS", 20, yPos);
    yPos += 10;

    // Amostra de positivos (primeiros 15)
    pdf.setFontSize(12);
    pdf.setTextColor(16, 185, 129);
    pdf.text("Positivos:", 25, yPos);
    yPos += 7;

    pdf.setFontSize(9);
    pdf.setTextColor(80, 80, 80);
    
    const amostraPositivos = todasPositivas.slice(0, 15);
    amostraPositivos.forEach((msg, index) => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
      }
      
      const textoFormatado = `  ${index + 1}. ${msg.text} [${msg.platform}]`;
      pdf.text(textoFormatado, 25, yPos);
      yPos += 6;
    });

    // Amostra de negativos (primeiros 15)
    yPos += 5;
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(12);
    pdf.setTextColor(239, 68, 68);
    pdf.text("Negativos:", 25, yPos);
    yPos += 7;

    pdf.setFontSize(9);
    pdf.setTextColor(80, 80, 80);
    
    const amostraNegativos = todasNegativas.slice(0, 15);
    amostraNegativos.forEach((msg, index) => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
      }
      
      const textoFormatado = `  ${index + 1}. ${msg.text} [${msg.platform}]`;
      pdf.text(textoFormatado, 25, yPos);
      yPos += 6;
    });

    // Rodapé
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Página ${i} de ${totalPages}`, 105, 287, { align: 'center' });
      pdf.text("FeedbackNow Analytics", 190, 287, { align: 'right' });
    }

    // Salvar o PDF
    pdf.save(`relatorio-feedbacks-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // --- CONFIGURAÇÃO DOS GRÁFICOS ---
  const lineData = {
    labels,
    datasets: [
      {
        label: "Positivos",
        data: dadosPositivos,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 4
      },
      {
        label: "Negativos",
        data: dadosNegativos,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 4
      },
    ],
  };

  const doughnutData = {
    labels: ["Positivos", "Negativos"],
    datasets: [
      {
        data: [totalPos, totalNeg],
        backgroundColor: ["#10b981", "#ef4444"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div style={{ padding: "30px", color: "white", minHeight: "100%", backgroundColor: "#0f172a", position: "relative" }}>
      
      {/* BOTÕES SUPERIOR DIREITO */}
      <div style={{
        position: "absolute",
        top: "30px",
        right: "30px",
        display: "flex",
        gap: "15px",
        zIndex: 100
      }}>
        {/* Botão Relatório PDF */}
        <button
          onClick={gerarPDF}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#2d3748"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#1e293b"}
          title="Gerar Relatório PDF"
        >
          <FileText color="#3b82f6" size={24} />
        </button>

        {/* Instagram */}
        <button
          onClick={() => abrirModal('instagram')}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#2d3748"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#1e293b"}
          title="Novas mensagens do Instagram"
        >
          <Instagram color="#E4405F" size={24} />
          {novasInstagram > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "#ef4444",
              color: "white",
              borderRadius: "50%",
              minWidth: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              border: "2px solid #0f172a"
            }}>
              {novasInstagram}
            </span>
          )}
        </button>

        {/* Facebook */}
        <button
          onClick={() => abrirModal('facebook')}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#2d3748"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#1e293b"}
          title="Novas mensagens do Facebook"
        >
          <Facebook color="#1877F2" size={24} />
          {novasFacebook > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "#ef4444",
              color: "white",
              borderRadius: "50%",
              minWidth: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
              border: "2px solid #0f172a"
            }}>
              {novasFacebook}
            </span>
          )}
        </button>
      </div>

      {/* BOTÃO HOME */}
      <button
        onClick={() => window.location.href = "/"}
        style={{
          background: "none",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
          fontSize: "0.9rem",
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: "#1e293b",
          border: "1px solid #334155"
        }}
      >
        <Home size={18} /> Voltar para Home
      </button>

      <h2 style={{ marginBottom: "25px", fontWeight: "600", fontSize: "1.8rem" }}>Dashboard de Feedbacks</h2>

      {/* 1. CARDS DE RESUMO */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        {/* Card Total */}
        <div
          style={{
            ...cardResumo,
            borderLeft: "6px solid #3b82f6",
            cursor: "default"
          }}
        >
          <div style={labelCard}>Total de Feedbacks</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#3b82f6" }}>{total}</div>
          <div style={hintStyle}>Somatória de todos os feedbacks</div>
        </div>

        {/* Card Positivos */}
        <div
          onClick={() => abrirModal('pos')}
          style={{
            ...cardResumo,
            borderLeft: "6px solid #10b981",
            cursor: "pointer"
          }}
        >
          <div style={labelCard}>Feedbacks Positivos</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#10b981" }}>{totalPos}</div>
          <div style={hintStyle}>Clique para ver todos ({todasPositivas.length})</div>
        </div>

        {/* Card Negativos */}
        <div
          onClick={() => abrirModal('neg')}
          style={{
            ...cardResumo,
            borderLeft: "6px solid #ef4444",
            cursor: "pointer"
          }}
        >
          <div style={labelCard}>Feedbacks Negativos</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#ef4444" }}>{totalNeg}</div>
          <div style={hintStyle}>Clique para ver todos ({todasNegativas.length})</div>
        </div>
      </div>

      {/* 2. GRÁFICOS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Gráfico de Linha */}
        <div style={{ ...cardGrafico, flex: "1 1 500px" }}>
          <div style={tituloGrafico}>
            <TrendingUp size={18} /> Evolução de Sentimentos
          </div>
          <div style={{ height: "250px" }}>
            <Line
              data={lineData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      color: '#94a3b8',
                      font: {
                        size: 12
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#1e293b'
                    },
                    ticks: {
                      color: '#94a3b8'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#94a3b8'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Gráfico de Rosca */}
        <div style={{ ...cardGrafico, flex: "1 1 300px" }}>
          <div style={tituloGrafico}>
            <PieChart size={18} /> Distribuição Total
          </div>
          <div style={{ height: "250px" }}>
            <Doughnut
              data={doughnutData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#94a3b8',
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && (
        <div style={overlayModal}>
          <div style={conteudoModal}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
                <MessageCircle color={
                  tipoFiltro === 'pos' ? "#10b981" :
                  tipoFiltro === 'neg' ? "#ef4444" :
                  tipoFiltro === 'instagram' ? "#E4405F" : "#1877F2"
                } />
                {tipoFiltro === 'pos' && `Mensagens Positivas (${todasPositivas.length} no total)`}
                {tipoFiltro === 'neg' && `Mensagens Negativas (${todasNegativas.length} no total)`}
                {tipoFiltro === 'instagram' && `Novas Mensagens do Instagram (${novasInstagram})`}
                {tipoFiltro === 'facebook' && `Novas Mensagens do Facebook (${novasFacebook})`}
              </h3>
              <button onClick={() => setModalAberto(false)} style={btnFechar}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px", maxHeight: "400px" }}>
              {getMensagensPaginadas().length > 0 ? (
                getMensagensPaginadas().map((msg, i) => {
                  const indexGlobal = (tipoFiltro === 'pos' ? paginaPositivos * itensPorPagina : 
                                     tipoFiltro === 'neg' ? paginaNegativos * itensPorPagina : 0) + i + 1;
                  return (
                    <div key={i} style={itemMsg}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                        <span style={{
                          color:
                            tipoFiltro === 'pos' ? "#10b981" :
                            tipoFiltro === 'neg' ? "#ef4444" :
                            tipoFiltro === 'instagram' ? "#E4405F" : "#1877F2",
                          marginRight: "5px"
                        }}>
                          ●
                        </span>
                        <span style={{
                          fontSize: "12px",
                          color: "#94a3b8",
                          backgroundColor: "#334155",
                          padding: "2px 8px",
                          borderRadius: "10px"
                        }}>
                          {msg.platform === 'instagram' ? 'Instagram' : 'Facebook'}
                        </span>
                        <span style={{
                          fontSize: "11px",
                          color: "#64748b",
                          fontStyle: "italic"
                        }}>
                          #{indexGlobal}
                        </span>
                        {msg.isNew && (
                          <span style={{
                            fontSize: "10px",
                            color: "#ef4444",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontWeight: "bold"
                          }}>
                            NOVO
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.95rem", color: "#e2e8f0", lineHeight: "1.5" }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>
                  Nenhuma mensagem encontrada.
                </p>
              )}
            </div>

            {/* PAGINAÇÃO APENAS PARA POSITIVOS E NEGATIVOS */}
            {(tipoFiltro === 'pos' || tipoFiltro === 'neg') && getTotalPaginasAtual() > 1 && (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "25px",
                paddingTop: "20px",
                borderTop: "1px solid #334155"
              }}>
                <button
                  disabled={getPaginaAtual() === 0}
                  onClick={() => setPaginaAtual(getPaginaAtual() - 1)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: getPaginaAtual() === 0 ? "#334155" : "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: getPaginaAtual() === 0 ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    opacity: getPaginaAtual() === 0 ? 0.5 : 1
                  }}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>
                
                <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
                  Página {getPaginaAtual() + 1} de {getTotalPaginasAtual()}
                  <br />
                  <small style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    Exibindo {itensPorPagina} de {
                      tipoFiltro === 'pos' ? todasPositivas.length : 
                      tipoFiltro === 'neg' ? todasNegativas.length : 0
                    } mensagens
                  </small>
                </span>
                
                <button
                  disabled={getPaginaAtual() >= getTotalPaginasAtual() - 1}
                  onClick={() => setPaginaAtual(getPaginaAtual() + 1)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: getPaginaAtual() >= getTotalPaginasAtual() - 1 ? "#334155" : "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: getPaginaAtual() >= getTotalPaginasAtual() - 1 ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    opacity: getPaginaAtual() >= getTotalPaginasAtual() - 1 ? 0.5 : 1
                  }}
                >
                  Próxima
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- ESTILOS ---
const cardResumo = {
  flex: "1",
  minWidth: "200px",
  background: "#1e293b",
  padding: "25px",
  borderRadius: "12px",
  transition: "transform 0.2s",
  border: "1px solid #334155"
};

const labelCard = {
  fontSize: "0.85rem",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "10px",
  display: "block"
};

const hintStyle = {
  fontSize: "0.75rem",
  color: "#64748b",
  marginTop: "10px",
  display: "block"
};

const cardGrafico = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid #334155"
};

const tituloGrafico = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
  color: "#cbd5e1",
  fontSize: "1rem",
  fontWeight: "500"
};

const itemMsg = {
  padding: "15px 0",
  borderBottom: "1px solid #334155",
  lineHeight: "1.5"
};

const overlayModal = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const conteudoModal = {
  background: "#1e293b",
  width: "90%",
  maxWidth: "650px",
  maxHeight: "85vh",
  borderRadius: "20px",
  padding: "35px",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #475569",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
};

const btnFechar = {
  background: "none",
  border: "none",
  color: "#94a3b8",
  cursor: "pointer",
  padding: "5px"
};

export default Dashboard;