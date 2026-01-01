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

// --- COMPONENTES ---
import Sidebar from "./components/Sidebar";

// --- PÁGINAS ---
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Clientes from "./pages/Clientes/Clientes";
import Dashboard from "./pages/Dashboard/Dashboard";
import TodosComentarios from "./pages/FeedbackPages/TodosComentarios";
import Reports from "./pages/Reports/Reports";
import Social from "./pages/Social/Social"; 
import AnaliseEmLote from "./pages/AnaliseEmLote/AnaliseEmLote";

function App() {
  const [notificacoes, setNotificacoes] = useState({ 
    instagram: 8, 
    facebook: 3 
  });

  const [feedbacks] = useState([
    { 
      id: 1, 
      date: "2024-05-01", 
      positivos: 15, 
      negativos: 3, 
      mensagens: [
        { text: "Ótimo post no Insta!", sentiment: "pos", origem: "instagram" },
        { text: "Não gostei do atendimento no Face", sentiment: "neg", origem: "facebook" }
      ] 
    }
  ]);

  return (
    <Routes>
      {/* --- SEM SIDEBAR --- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/clientes" element={<Clientes />} />

      {/* --- COM SIDEBAR --- */}
      <Route path="/*" element={
        <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#0f172a", overflow: "hidden" }}>
          <Sidebar />
          <main style={{ flex: 1, overflowY: "auto" }}>
            <Routes>
              <Route 
                path="/dashboard" 
                element={<Dashboard sampleFeedbacks={feedbacks} notificacoes={notificacoes} />} 
              />
              <Route 
                path="/social-messages" 
                element={<Social sampleFeedbacks={feedbacks} setNotificacoes={setNotificacoes} />} 
              />
              <Route path="/todoscomentarios" element={<TodosComentarios sampleFeedbacks={feedbacks} />} />
              <Route path="/reports" element={<Reports sampleFeedbacks={feedbacks} />} />
              <Route path="/analise" element={<AnaliseEmLote />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      } />
    </Routes>
  );
}


export default App;