/**
 * @description Este arquivo define o componente raiz 'App', que utiliza o react-router-dom
 * para configurar o roteamento de toda a aplicação. Ele estabelece o layout
 * principal com um cabeçalho (`Header`) e uma área de conteúdo onde as
 * diferentes páginas são renderizadas de acordo com a URL.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';

import DashboardPage from './pages/dashboard/DashboardPage';

import TechniciansPage from './pages/technicians/main/TechniciansPage';
import UpdateTechniciansPage from './pages/technicians/update/UpdateTechniciansPage';
import TechnicianHomePage from './pages/tecnico/TechnicianHomePage'; 

import BoxesPage from './pages/boxes/BoxesPage';
import UpdateBoxesPage from './pages/boxes/update/UpdateBoxesPage';

import TasksPage from './pages/tasks/main/TasksPage';
import UpdateTasksPage from './pages/tasks/update/UpdateTasksPage';

import GeralPage from './pages/geral/GeralPage';

import ReportsPage from './pages/reports/ReportsPage';


import './App.css';


/**
 * @brief Componente raiz que estrutura toda a aplicação.
 * @description Utiliza o `BrowserRouter` para gerenciar a navegação e o `Routes` para
 * mapear cada URL a um componente de página específico (como DashboardPage, GeralPage, etc).
 * O layout é composto por um `Header` e uma área de `main-content` onde as páginas são renderizadas.
 * @returns {JSX.Element} A aplicação completa com todas as rotas configuradas.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Rota para o dashboard principal (Layout da Oficina) */}
            <Route path="/" element={<DashboardPage />} />
            
            {/* Rota para a página de gerenciamento geral de OS */}
            <Route path="/geral" element={<GeralPage />} />
            <Route path="/pagina-tecnico" element={<TechnicianHomePage />} />

            {/* Rotas para o CRUD de Técnicos */}
            <Route path="/technicians" element={<TechniciansPage />} />
            <Route path="/update" element={<UpdateTechniciansPage />} />

            {/* Rotas para o CRUD de Boxes */}
            <Route path="/boxes" element={<BoxesPage />} />
            <Route path="/boxes/update" element={<UpdateBoxesPage />} />

            {/* Rotas para o CRUD de Tarefas */}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/update" element={<UpdateTasksPage />} />

            {/* Rota para a página de relatórios*/}
            <Route path="/relatorios" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;