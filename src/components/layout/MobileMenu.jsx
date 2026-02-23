/**
 * @file MobileMenu.jsx
 * @brief Componente de menu de navegação lateral (sidebar/drawer).
 * @author Enzo Mello
 *
 * @description Renderiza o ícone de "hambúrguer" e o menu deslizante
 * que serve como a principal forma de navegação entre as páginas da aplicação.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

/**
 * @brief Array de objetos que define os links de navegação do menu.
 * @property {string} label - O texto a ser exibido para o link.
 * @property {string} path - O caminho da URL para a navegação.
 * @type {Array<object>}
 */
const menuLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Geral', path: '/geral' },
  { label: 'Gerenciar Técnicos', path: '/technicians' },
  { label: 'Gerenciar Boxes', path: '/boxes' },
  { label: 'Gerenciar Tarefas', path: '/tasks' },
  { label: 'Página do Técnico', path: '/pagina-tecnico' },
  { label: 'Relatórios', path: '/relatorios' } // <--- ADICIONAMOS AQUI
];

/**
 * @brief Componente funcional para o menu de navegação.
 * @description Gerencia o estado de abertura/fechamento do menu
 * e renderiza os links de navegação definidos em `menuLinks`.
 * @returns {JSX.Element} O componente de menu renderizado.
 */
function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** @brief Alterna a visibilidade do menu. */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /** @brief Fecha o menu ao clicar em um link */
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
      <button className="burger" onClick={toggleMenu} aria-label="Abrir menu">
        <div className="burger-icon"></div>
      </button>
      <div className="menu">
        <nav>
          {menuLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;