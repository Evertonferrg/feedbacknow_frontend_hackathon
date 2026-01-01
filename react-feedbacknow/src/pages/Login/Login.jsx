import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setError("");

    if (!username.trim() || !pass.trim()) {
      setError("Por favor, preencha usuário e senha.");
      return;
    }

    setLoading(true);

    // Simula login
    setTimeout(() => {
      setLoading(false);

      // 🔐 aqui depois você pode salvar token no localStorage
      localStorage.setItem("user", JSON.stringify({ name: username }));

      // 👉 navegação correta
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="page-container">
      <div className="modal-panel glass">
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
          Acesso Empresa
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          placeholder="Usuário"
        />

        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          className="form-input"
          placeholder="Senha"
        />

        {error && <div style={{ color: "#fecaca", marginBottom: "0.5rem" }}>{error}</div>}

        <div className="form-actions">
          <button onClick={handleLogin} disabled={loading} className="home-card-btn primary">
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            onClick={() => navigate("/")}
            disabled={loading}
            className="home-card-btn secondary"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}