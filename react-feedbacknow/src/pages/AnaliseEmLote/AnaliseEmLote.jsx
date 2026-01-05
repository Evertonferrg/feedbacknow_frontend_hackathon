import React, { useState, useRef } from "react";
import { Send, UploadCloud, FileText, X } from "lucide-react";
import api from "../../services/api";

// --- COMPONENTE ANALISE EM LOTE + COMENTÁRIOS PAGINADOS ---
const AnaliseEmLote = () => {
  const [texto, setTexto] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const fileInputRef = useRef(null);

  // --- LEITURA DO ARQUIVO ---
  const processarArquivo = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const conteudo = e.target.result;
      setTexto(conteudo);
      setArquivo(file);

      const linhas = conteudo
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "");

      const preview = linhas.map((l, i) => ({
        id: Date.now() + i,
        text: l,
        sentiment: "processando"
      }));

      setFeedbacks(preview);
      setPage(0);
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

  // --- ENVIO REAL PARA O BACKEND ---
  const handleEnviar = async () => {
    if (!texto.trim()) {
      alert("Adicione conteúdo ou um arquivo!");
      return;
    }

    try {
      const linhas = texto
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "");

      const resultados = [];

      for (const linha of linhas) {
        const response = await api.post("/sentiment", {
          comentario: linha
        });

        resultados.push({
          id: response.data.id,
          text: response.data.comentario,
          sentiment: response.data.sentimento
        });
      }

      setFeedbacks(resultados);
      setTexto("");
      setArquivo(null);
      setPage(0);

      alert("Análise concluída e salva no banco!");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar dados para o backend.");
    }
  };

  // --- PAGINAÇÃO ---
  const totalPages = Math.ceil(feedbacks.length / pageSize);
  const currentComments = feedbacks.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* --- ÁREA DE ANÁLISE DE LOTE --- */}
        <div style={cardStyle}>
          <h2 style={{ color: "white", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <UploadCloud /> Análise em Lote
          </h2>

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
                <X
                  size={16}
                  cursor="pointer"
                  onClick={() => {
                    setArquivo(null);
                    setTexto("");
                    setFeedbacks([]);
                  }}
                />
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

        {/* --- COMENTÁRIOS PAGINADOS --- */}
        {feedbacks.length > 0 && (
          <div style={{ marginTop: "40px", color: "white" }}>
            <h3>Comentários Processados ({feedbacks.length})</h3>

            <ul>
              {currentComments.map((c) => (
                <li key={c.id} style={{ marginBottom: "10px" }}>
                  <strong
                    style={{
                      color:
                        c.sentiment === "POSITIVO"
                          ? "#10b981"
                          : "#ef4444"
                    }}
                  >
                    [{c.sentiment}]
                  </strong>{" "}
                  {c.text}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
              <button disabled={page === 0} onClick={() => setPage(page - 1)} style={pageBtn}>
                {"<"} Voltar
              </button>

              <span>Página {page + 1} de {totalPages}</span>

              <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} style={pageBtn}>
                Avançar {">"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ESTILOS (INALTERADOS) ---
const cardStyle = {
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "15px",
  border: "1px solid #334155",
  width: "100%",
  marginBottom: "40px"
};

const dropZoneStyle = {
  border: "2px dashed",
  borderRadius: "10px",
  padding: "10px",
  transition: "0.3s",
  position: "relative",
  minHeight: "120px"
};

const textAreaStyle = {
  width: "100%",
  height: "250px",
  background: "transparent",
  color: "#e2e8f0",
  border: "none",
  outline: "none",
  resize: "none",
  fontSize: "0.9rem"
};

const primaryBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const secondaryBtn = {
  backgroundColor: "transparent",
  color: "#94a3b8",
  border: "1px solid #334155",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer"
};

const fileInfoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "#3b82f6",
  color: "white",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "0.8rem",
  width: "fit-content",
  marginBottom: "10px"
};

const pageBtn = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#334155",
  color: "white",
  cursor: "pointer"
};

export default AnaliseEmLote;