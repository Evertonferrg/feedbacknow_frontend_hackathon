import React, { useState } from "react";
import { FileText, Download, Table } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Reports = ({ sampleFeedbacks = [] }) => {
  const [qtd, setQtd] = useState(10);
  const [page, setPage] = useState(0);
  const pageSize = 20; // quantidade de comentários por página

  // Pega todas as mensagens brutas
  const todasMensagens = sampleFeedbacks.flatMap(dia => 
    dia.mensagens.map(m => ({ 
      data: dia.date, 
      sentimento: m.sentiment === 'pos' ? 'Positivo' : 'Negativo', 
      texto: m.text 
    }))
  );

  const totalPages = Math.ceil(todasMensagens.length / pageSize);

  const currentComments = todasMensagens.slice(page * pageSize, (page + 1) * pageSize);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Feedbacks - FeedbackNow", 14, 15);
    
    const dadosTabela = todasMensagens.slice(0, qtd).map(m => [m.data, m.sentimento, m.texto]);

    doc.autoTable({
      head: [['Dia', 'Sentimento', 'Comentário']],
      body: dadosTabela,
      startY: 25,
      theme: 'grid'
    });

    doc.save("relatorio-feedbacks.pdf");
  };

  const exportarExcel = () => {
    const dadosExportar = todasMensagens.slice(0, qtd);
    const worksheet = XLSX.utils.json_to_sheet(dadosExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedbacks");
    XLSX.writeFile(workbook, "relatorio-feedbacks.xlsx");
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2 style={{ marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
        <FileText color="#3b82f6" /> Central de Relatórios
      </h2>

      {/* CARD DE EXPORTAÇÃO */}
      <div style={cardStyle}>
        <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Selecione a quantidade de registros e o formato desejado para exportação.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
          <label>Quantidade:</label>
          <input 
            type="number" 
            value={qtd} 
            onChange={(e) => setQtd(e.target.value)} 
            style={inputStyle} 
          />
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={exportarPDF} style={btnPdf}>
            <Download size={18} /> Exportar para PDF
          </button>
          
          <button onClick={exportarExcel} style={btnExcel}>
            <Table size={18} /> Exportar para Excel/CSV
          </button>
        </div>
      </div>

      {/* COMENTÁRIOS PAGINADOS */}
      {todasMensagens.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ marginBottom: "20px" }}>Comentários ({todasMensagens.length})</h3>
          <ul>
            {currentComments.map((c, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>[{c.sentimento}]</strong> {c.texto} <em>({c.data})</em>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "20px" }}>
            <button onClick={handlePrev} disabled={page === 0}>&lt; Voltar</button>
            <span style={{ margin: "0 10px" }}>Página {page + 1} de {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages - 1}>Avançar &gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- ESTILOS ---
const cardStyle = { background: "#1e293b", padding: "30px", borderRadius: "15px", border: "1px solid #334155" };
const inputStyle = { background: "#0f172a", border: "1px solid #334155", color: "white", padding: "10px", borderRadius: "8px", width: "100px" };
const btnPdf = { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#ef4444", color: "white", border: "none", padding: "12px 25px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const btnExcel = { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#10b981", color: "white", border: "none", padding: "12px 25px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };

export default Reports;