import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Home, CheckSquare, Square, ListOrdered, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Relatorios() {
  const [dados, setDados] = useState([]);
  const [quantidade, setQuantidade] = useState(10);
  const [carregando, setCarregando] = useState(false);
  const [colunas, setColunas] = useState({
    id: true,
    comentario: true,
    sentimento: true,
    criadoEm: true
  });

  const authHeader = btoa("admin:123456");

  // Ajustado para aceitar a quantidade e buscar no banco
  const buscarDados = async (qtd) => {
    setCarregando(true);
    try {
      // Se qtd for 0 (Todos), mandamos um número alto para o Pageable do Java
      const limit = qtd === 0 ? 99999 : qtd; 
      const response = await axios.get(`http://localhost:8080/sentiments?size=${limit}`, {
        headers: { 'Authorization': `Basic ${authHeader}` }
      });
      setDados(response.data.conteudo || []);
    } catch (error) {
      console.error("Erro ao carregar dados para relatório", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDados(quantidade);
  }, []);

  const toggleColuna = (col) => {
    setColunas(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Sentimentos - FeedBackNow", 14, 20);
    
    const head = [];
    if (colunas.id) head.push("ID");
    if (colunas.comentario) head.push("Comentário");
    if (colunas.sentimento) head.push("Sentimento");
    if (colunas.criadoEm) head.push("Data");

    const body = dados.map(item => {
      const linha = [];
      if (colunas.id) linha.push(item.id);
      if (colunas.comentario) linha.push(item.comentario);
      if (colunas.sentimento) linha.push(item.sentimento);
      if (colunas.criadoEm) linha.push(new Date(item.criadoEm).toLocaleDateString('pt-BR'));
      return linha;
    });

    doc.autoTable({
      head: [head],
      body: body,
      startY: 30,
      theme: 'striped'
    });

    doc.save(`relatorio_feedback_${new Date().getTime()}.pdf`);
  };

  return (
    <div style={styles.container}>
      {/* O botão agora está dentro de um header interno, saindo de cima da sidebar */}
      <div style={styles.mainContent}>
        <div style={styles.headerRow}>
          <button onClick={() => window.location.href = "/"} style={styles.btnHome}>
            <Home size={18} /> Voltar para Home
          </button>
          {carregando && <RefreshCw size={20} color="#10b981" className="animate-spin" />}
        </div>

        <div style={styles.configBox}>
          <h2 style={styles.title}><FileText size={28} color="#10b981" /> Configurar Exportação</h2>
          
          <div style={styles.section}>
            <label style={styles.label}><ListOrdered size={18} /> Quantidade de registros:</label>
            <select 
              value={quantidade} 
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuantidade(val);
                buscarDados(val); // Busca no banco a nova quantidade
              }}
              style={styles.select}
            >
              <option value={5}>Últimos 5 registros</option>
              <option value={10}>Últimos 10 registros</option>
              <option value={50}>Últimos 50 registros</option>
              <option value={0}>Buscar Todos os Registros</option>
            </select>
          </div>

          <div style={styles.section}>
            <label style={styles.label}>Informações para incluir:</label>
            <div style={styles.checkboxGroup}>
              {Object.keys(colunas).map(col => (
                <div key={col} onClick={() => toggleColuna(col)} style={styles.checkboxItem}>
                  {colunas[col] ? <CheckSquare color="#10b981" /> : <Square color="#94a3b8" />}
                  <span style={{ color: colunas[col] ? "white" : "#94a3b8" }}>{col.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={gerarPDF} style={styles.btnExport} disabled={dados.length === 0}>
            <Download size={20} /> Exportar {dados.length} registros para PDF
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    backgroundColor: "#0f172a", 
    minHeight: "100vh", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "flex-start", // Começa do topo
    paddingTop: "40px" 
  },
  mainContent: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "0 20px"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  btnHome: { 
    background: "#1e293b", 
    color: "#94a3b8", 
    padding: "10px 15px", 
    borderRadius: "8px", 
    border: "1px solid #334155", 
    cursor: "pointer", 
    display: "flex", 
    alignItems: "center",
    gap: "8px" 
  },
  configBox: { 
    background: "#1e293b", 
    padding: "40px", 
    borderRadius: "20px", 
    border: "1px solid #334155", 
    width: "100%",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },
  title: { color: "white", display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" },
  section: { marginBottom: "25px" },
  label: { color: "#94a3b8", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "0.9rem" },
  select: { width: "100%", padding: "12px", backgroundColor: "#0f172a", color: "white", border: "1px solid #334155", borderRadius: "8px", outline: "none" },
  checkboxGroup: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  checkboxItem: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "10px", background: "#0f172a", borderRadius: "8px", border: "1px solid #334155" },
  btnExport: { width: "100%", padding: "15px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }
};