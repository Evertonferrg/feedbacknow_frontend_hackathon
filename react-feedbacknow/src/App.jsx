// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "./pages/Home/Home.jsx";
// import Login from "./pages/Login/Login.jsx";
// import Dashboard from "./pages/Dashboard/Dashboard.jsx";
// import Clientes from "./pages/Clientes/Clientes.jsx";
// import TodosComentarios from "./pages/FeedbackPages/TodosComentarios";
// import Reports from "./pages/Reports/Roports.jsx";
// import "./styles/global.css";

// export default function App() {
//   return (
//     <Routes>
//       {/* Públicas */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />

//       {/* Dashboard */}
//       <Route path="/dashboard" element={<Dashboard />} />

//       {/* Páginas internas */}
//       <Route path="/clientes" element={<Clientes />} />
//       <Route path="/todoscomentarios" element={<TodosComentarios />} />
//       <Route path="/reports" element={<Reports />} />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }


import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// IMPORTAÇÕES DE COMPONENTES E PÁGINAS
import Sidebar from "./components/Sidebar"; 
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Clientes from "./pages/Clientes/Clientes";
import TodosComentarios from "./pages/FeedbackPages/TodosComentarios";
import AnaliseEmLote from "./pages/AnaliseEmLote/AnaliseEmLote"; 
import Reports from "./pages/Reports/Reports"; // Corrigido de 'Roports' para 'Reports'

import "./styles/global.css";

export default function App() {
  const [feedbacks] = useState([
    { 
      date: "Seg", positivos: 10, negativos: 2, 
      mensagens: [{ text: "Muito bom!", sentiment: "pos" }, { text: "Ruim", sentiment: "neg" }] 
    },
    { date: "Ter", positivos: 15, negativos: 5, mensagens: [] },
  ]);

  return (
    <Routes>
      {/* 1. ROTAS PÚBLICAS (Sem Sidebar) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* 2. ROTAS PRIVADAS (Com Sidebar) */}
      <Route path="/*" element={
        <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#0f172a", overflow: "hidden" }}>
          <Sidebar />
          <main style={{ flex: 1, overflowY: "auto" }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard sampleFeedbacks={feedbacks} />} />
              <Route path="/todoscomentarios" element={<TodosComentarios sampleFeedbacks={feedbacks} />} />
              <Route path="/analise" element={<AnaliseEmLote />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/reports" element={<Reports />} />
              
              {/* Fallback para o dashboard caso a rota interna não exista */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      } />
    </Routes>
  );
}