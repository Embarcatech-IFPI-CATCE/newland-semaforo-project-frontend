/**
 * @file Navbar.jsx
 * @brief Componente de barra de navegação superior com menus dropdown.
 * @author Enzo Mello
 *
 * @description Renderiza uma barra de navegação horizontal com o logo da empresa e
 * menus que aparecem ao passar o mouse, contendo links para diferentes seções.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * @brief Componente da barra de navegação superior.
 * @description Gerencia o estado do menu dropdown ativo e renderiza a estrutura de navegação.
 * @returns {JSX.Element} O elemento da barra de navegação.
 */
function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);

  /**
   * @brief Objeto que define os itens para cada menu dropdown.
   * @type {object}
   */
  const menuItems = {
    tecnicos: [
      { label: 'Gerenciar Técnicos', path: '/' },
      { label: 'Atualizar Funcionários', path: '/update' },
    ],
    boxes: [
      { label: 'Gerenciar Boxes', path: '/boxes' }, 
      { label: 'Atualizar Boxes', path: '/boxes/update' },     
    ],
    tarefas: [
      { label: 'Visão Geral', path: '/geral' },
      { label: 'Gerenciar Tarefas', path: '/tasks' },      
      { label: 'Atualizar Tarefa', path: '/tasks/update' },  
    ],
    // NOVA SECÇÃO: Relatórios adicionados aqui
    relatorios: [
      { label: 'Painel de Relatórios', path: '/relatorios' }
    ]
  };

  /** @brief Fecha qualquer menu dropdown que esteja aberto. */
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-section nav-logo">
        <Link to="/">Grupo New Toyota</Link>
      </div>
      
      <div className="nav-section nav-links" onMouseLeave={handleMouseLeave}>
        <ul className="nav-list">
          <li className="nav-item" onMouseEnter={() => setActiveMenu('tecnicos')}>
            <span>Técnicos</span>
            {activeMenu === 'tecnicos' && (
              <div className="dropdown-menu">
                {menuItems.tecnicos.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          
          <li className="nav-item" onMouseEnter={() => setActiveMenu('boxes')}>
            <span>Boxes</span>
            {activeMenu === 'boxes' && (
              <div className="dropdown-menu">
                {menuItems.boxes.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          
          <li className="nav-item" onMouseEnter={() => setActiveMenu('tarefas')}>
            <span>Tarefas (OS)</span>
            {activeMenu === 'tarefas' && (
              <div className="dropdown-menu">
                {menuItems.tarefas.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li className="nav-item" onMouseEnter={() => setActiveMenu('relatorios')}>
            <span>Relatórios</span>
            {activeMenu === 'relatorios' && (
              <div className="dropdown-menu">
                {menuItems.relatorios.map((item) => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Seção vazia à direita para manter o equilíbrio do layout */}
      <div className="nav-section nav-placeholder"></div>
    </nav>
  );
}

export default Navbar;