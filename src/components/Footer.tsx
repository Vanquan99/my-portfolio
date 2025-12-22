import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">MobileDev</span>
              <span className="logo-bracket">/&gt;</span>
            </div>
            <p>
              Xây dựng trải nghiệm di động tuyệt vời, từng dòng code một.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Điều hướng</h4>
              <a href="#hero">Trang chủ</a>
              <a href="#about">Về tôi</a>
              <a href="#skills">Kỹ năng</a>
              <a href="#projects">Dự án</a>
            </div>

            <div className="footer-section">
              <h4>Liên kết</h4>
              <a href="#experience">Kinh nghiệm</a>
              <a href="#contact">Liên hệ</a>
              <a href="/blog">Blog</a>
              <a href="/cv">CV</a>
            </div>

            <div className="footer-section">
              <h4>Mạng xã hội</h4>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Nguyễn Văn A. Thiết kế và phát triển với 
            <span className="heart"> ❤️ </span>
            tại Việt Nam.
          </p>
          <p className="tech-stack">
            Built with React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
