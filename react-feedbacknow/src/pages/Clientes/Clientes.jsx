

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Home } from "lucide-react";

const Clientes = () => {
  const navigate = useNavigate();
  const [comentario, setComentario] = useState("");

  const enviarComentario = (e) => {
    e.preventDefault();
    console.log("Comentário enviado:", comentario);
    alert("Comentário enviado com sucesso!");
    setComentario("");
  };

  return (
    <div style={{ 
      minHeight: "100vh", backgroundColor: "#0f172a", color: "white", 
      display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" 
    }}>
      
      {/* Botão para voltar à HOME */}
      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "40px" }}>
        <button 
          onClick={() => navigate("/")} 
          style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Home size={20} /> Voltar para Home
        </button>
      </div>

      <div style={{ width: "100%", maxWidth: "600px", background: "#1e293b", padding: "30px", borderRadius: "15px", border: "1px solid #334155" }}>
        <h2 style={{ marginBottom: "20px" }}>Lançar Novo Comentário</h2>
        
        <form onSubmit={enviarComentario}>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Digite o comentário do cliente aqui..."
            required
            style={{
              width: "100%", height: "150px", padding: "15px", borderRadius: "10px",
              backgroundColor: "#0f172a", color: "white", border: "1px solid #334155",
              fontSize: "1rem", outline: "none", resize: "none", marginBottom: "20px"
            }}
          />

          <button type="submit" style={btnEnviarStyle}>
            <Send size={18} /> Enviar Comentário
          </button>
        </form>
      </div>
    </div>
  );
};

const btnEnviarStyle = {
  width: "100%", padding: "15px", backgroundColor: "#3b82f6", color: "white",
  border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
};

export default Clientes;