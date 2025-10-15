
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navLinks = [Page.Home, Page.Report, Page.Dashboard, Page.About];

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setCurrentPage(Page.Home)}
        >
          <span className="text-2xl mr-2">🚆</span>
          <h1 className="text-xl font-bold text-primary">SwachhRail</h1>
        </div>
        <ul className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => setCurrentPage(link)}
                className={`text-gray-600 hover:text-primary transition-colors duration-300 relative ${
                  currentPage === link ? 'font-semibold text-primary' : ''
                }`}
              >
                {link}
                {currentPage === link && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
