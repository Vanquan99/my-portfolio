import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">MobileDev</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <button type="button" onClick={() => scrollToSection('about')}>Về tôi</button>
          <button type="button" onClick={() => scrollToSection('skills')}>Kỹ năng</button>
          <button type="button" onClick={() => scrollToSection('projects')}>Dự án</button>
          <button type="button" onClick={() => scrollToSection('experience')}>Kinh nghiệm</button>
          <button type="button" onClick={() => scrollToSection('blog')}>Blog</button>
          <button type="button" onClick={() => scrollToSection('contact')}>Liên hệ</button>
        </div>

        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
