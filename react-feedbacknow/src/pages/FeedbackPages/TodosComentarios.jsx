
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TodosComentarios = ({ sampleFeedbacks = [] }) => {
  const navigate = useNavigate();
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 20;

  // 1. Transformar os dados do Java para o formato da lista
  // (Lembrando que o Java envia 'comentario' e 'sentimento')
  const todosOsDados = sampleFeedbacks.map(f => ({
    id: f.id,
    texto: f.comentario,
    tipo: f.sentimento === "POSITIVO" ? "positivo" : "negativo",
    data: f.criadoEm ? new Date(f.criadoEm).toLocaleDateString('pt-BR') : "---"
  }));

  // 2. Lógica de Paginação
  const totalPaginas = Math.ceil(todosOsDados.length / itensPorPagina);
  const inicio = paginaAtual * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const comentariosExibidos = todosOsDados.slice(inicio, fim);

  return (
    <div style={containerStyle}>
      {/* Cabeçalho */}
      <div style={headerStyle}>
        <button onClick={() => navigate(-1)} style={btnBackStyle}>
          <ArrowLeft size={20} /> Voltar
        </button>
        <h2 style={{ margin: 0 }}>Histórico de Feedbacks</h2>
        <div style={infoTotalStyle}>{todosOsDados.length} comentários encontrados</div>
      </div>

      {/* Lista de Comentários */}
      <div style={listaStyle}>
        {comentariosExibidos.length > 0 ? (
          comentariosExibidos.map((item) => (
            <div key={item.id} style={cardComentarioStyle}>
              <div style={indicadorSentimento(item.tipo)}>
                {item.tipo.toUpperCase()}
              </div>
              <div style={conteudoTextoStyle}>
                <p style={{ margin: "0 0 8px 0", lineHeight: "1.5" }}>{item.texto}</p>
                <small style={{ color: "#64748b" }}>Recebido em: {item.data}</small>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "50px", color: "#94a3b8" }}>
            Nenhum comentário encontrado no banco de dados.
          </div>
        )}
      </div>

      {/* Navegação < e > */}
      <div style={paginationContainer}>
        <button 
          disabled={paginaAtual === 0} 
          onClick={() => setPaginaAtual(prev => prev - 1)}
          style={navButtonStyle(paginaAtual === 0)}
        >
          <ChevronLeft size={24} /> Anterior
        </button>

        <span style={pageIndicatorStyle}>
          Página <strong>{paginaAtual + 1}</strong> de {totalPaginas || 1}
        </span>

        <button 
          disabled={paginaAtual >= totalPaginas - 1} 
          onClick={() => setPaginaAtual(prev => prev + 1)}
          style={navButtonStyle(paginaAtual >= totalPaginas - 1)}
        >
          Próxima <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// --- ESTILOS (Alinhados com o seu tema escuro) ---

const containerStyle = {
  padding: "40px",
  backgroundColor: "#0f172a",
  minHeight: "100vh",
  color: "#f1f5f9"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  borderBottom: "1px solid #1e293b",
  paddingBottom: "20px"
};

const btnBackStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "#1e293b",
  border: "1px solid #334155",
  color: "#94a3b8",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer"
};

const infoTotalStyle = {
  backgroundColor: "#1e293b",
  padding: "5px 15px",
  borderRadius: "20px",
  fontSize: "0.85rem",
  color: "#3b82f6"
};

const listaStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const cardComentarioStyle = {
  display: "flex",
  background: "#1e293b",
  borderRadius: "12px",
  border: "1px solid #334155",
  overflow: "hidden",
  transition: "transform 0.2s"
};

const indicadorSentimento = (tipo) => ({
  width: "120px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  fontWeight: "bold",
  backgroundColor: tipo === "positivo" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
  color: tipo === "positivo" ? "#10b981" : "#ef4444",
  borderRight: `2px solid ${tipo === "positivo" ? "#10b981" : "#ef4444"}`
});

const conteudoTextoStyle = {
  padding: "20px",
  flex: 1
};

const paginationContainer = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px"
};

const navButtonStyle = (disabled) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  background: disabled ? "#0f172a" : "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.3 : 1,
  fontWeight: "600",
  transition: "all 0.3s"
});

const pageIndicatorStyle = {
  fontSize: "1rem",
  color: "#94a3b8"
};

export default TodosComentarios;