import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Home, CheckSquare, Square, ListOrdered, RefreshCw, Table } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function Relatorios() {
  const [dados, setDados] = useState([]);
  const [quantidade, setQuantidade] = useState(10);
  const [carregando, setCarregando] = useState(false);
  
  // Estado das colunas (certifique-se que coincidem com os nomes do seu Java)
  const [colunas, setColunas] = useState({
    id: true,
    comentario: true,
    sentimento: true,
    criadoEm: true
  });

  const authHeader = btoa("admin:123456");

  const buscarDados = async (qtd) => {
    setCarregando(true);
    try {
      const limit = qtd === 0 ? 99999 : qtd; 
      const response = await axios.get(`http://localhost:8080/sentiments?size=${limit}`, {
        headers: { 'Authorization': `Basic ${authHeader}` }
      });
      // Ajuste para pegar a lista correta da paginação
      const lista = response.data.conteudo || response.data.content || response.data || [];
      setDados(lista);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDados(quantidade);
  }, []);

  // --- FUNÇÃO EXCEL (CORRIGIDA) ---
  const exportarExcel = () => {
    if (dados.length === 0) return alert("Não há dados para exportar");

    const dadosParaExportar = dados.map(item => {
      let linha = {};
      if (colunas.id) linha["ID"] = item.id;
      if (colunas.comentario) linha["Comentário"] = item.comentario;
      if (colunas.sentimento) linha["Sentimento"] = item.sentimento;
      if (colunas.criadoEm) linha["Data"] = item.criadoEm ? new Date(item.criadoEm).toLocaleDateString('pt-BR') : "N/A";
      return linha;
    });

    const ws = XLSX.utils.json_to_sheet(dadosParaExportar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    XLSX.writeFile(wb, `feedback_excel_${new Date().getTime()}.xlsx`);
  };

  // --- FUNÇÃO PDF (CORRIGIDA) ---
  const gerarPDF = () => {
    if (dados.length === 0) return alert("Não há dados para exportar");

    const doc = new jsPDF();
    doc.text("Relatório de Sentimentos", 14, 15);

    const colunasAtivas = [];
    if (colunas.id) colunasAtivas.push("ID");
    if (colunas.comentario) colunasAtivas.push("Comentário");
    if (colunas.sentimento) colunasAtivas.push("Sentimento");
    if (colunas.criadoEm) colunasAtivas.push("Data");

    const linhas = dados.map(item => {
      const row = [];
      if (colunas.id) row.push(item.id);
      if (colunas.comentario) row.push(item.comentario);
      if (colunas.sentimento) row.push(item.sentimento);
      if (colunas.criadoEm) row.push(item.criadoEm ? new Date(item.criadoEm).toLocaleDateString('pt-BR') : "N/A");
      return row;
    });

    doc.autoTable({
      head: [colunasAtivas],
      body: linhas,
      startY: 20,
      theme: 'grid'
    });

    doc.save(`feedback_pdf_${new Date().getTime()}.pdf`);
  };

  const toggleColuna = (col) => setColunas(prev => ({ ...prev, [col]: !prev[col] }));

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.headerRow}>
          <button onClick={() => window.location.href = "/"} style={styles.btnHome}>
            <Home size={18} /> Home
          </button>
          {carregando && <RefreshCw size={20} color="#10b981" className="animate-spin" />}
        </div>

        <div style={styles.configBox}>
          <h2 style={styles.title}><FileText size={28} color="#10b981" /> Relatórios</h2>
          
          <div style={styles.section}>
            <label style={styles.label}>Quantidade de registros:</label>
            <select 
              value={quantidade} 
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuantidade(val);
                buscarDados(val);
              }}
              style={styles.select}
            >
              <option value={5}>Últimos 5</option>
              <option value={10}>Últimos 10</option>
              <option value={50}>Últimos 50</option>
              <option value={0}>Todos (Sem limite)</option>
            </select>
          </div>

          <div style={styles.section}>
            <label style={styles.label}>Escolha o que exportar:</label>
            <div style={styles.checkboxGroup}>
              {Object.keys(colunas).map(col => (
                <div key={col} onClick={() => toggleColuna(col)} style={styles.checkboxItem}>
                  {colunas[col] ? <CheckSquare color="#10b981" size={20} /> : <Square color="#94a3b8" size={20} />}
                  <span style={{ color: colunas[col] ? "white" : "#94a3b8" }}>{col.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            
            <button onClick={exportarExcel} style={styles.btnExcel} disabled={dados.length === 0}>
              <Table size={20} /> Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#0f172a", minHeight: "100vh", padding: "40px 20px", color: "white", display: "flex", justifyContent: "center" },
  mainContent: { width: "100%", maxWidth: "600px" },
  headerRow: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  btnHome: { background: "#1e293b", color: "#94a3b8", padding: "10px 15px", borderRadius: "8px", border: "1px solid #334155", cursor: "pointer", display: "flex", gap: "8px" },
  configBox: { background: "#1e293b", padding: "30px", borderRadius: "20px", border: "1px solid #334155" },
  title: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" },
  section: { marginBottom: "20px" },
  label: { color: "#94a3b8", display: "block", marginBottom: "10px" },
  select: { width: "100%", padding: "12px", backgroundColor: "#0f172a", color: "white", border: "1px solid #334155", borderRadius: "8px" },
  checkboxGroup: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  checkboxItem: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "10px", background: "#0f172a", borderRadius: "8px", border: "1px solid #334155" },
  
  btnExcel: { flex: 1, padding: "15px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", display: "flex", justifyContent: "center", gap: "10px" }
};