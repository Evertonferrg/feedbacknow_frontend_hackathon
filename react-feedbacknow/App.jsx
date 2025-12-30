import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Clientes from "./pages/clientes";
import VisaoGeral from "./src/pages/VisaoGeral/VisaoGeral";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visao-geral" element={<VisaoGeral />} />
      </Routes>
    </BrowserRouter>
  );
}