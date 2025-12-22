import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting">
            <span className="wave">👋</span>
            <span>Xin chào, tôi là</span>
          </div>
          
          <h1 className="hero-name">
            <span className="name-highlight">Đinh Văn Quân</span>
          </h1>
          
          <h2 className="hero-title">
            <span className="typing-text">
              Flutter Developer
              <span className="cursor">|</span>
            </span>
          </h2>

          <p className="hero-description">
            Flutter Developer với <strong>3+ năm kinh nghiệm</strong> xây dựng ứng dụng mobile 
            hiệu suất cao. Chuyên sâu về Clean Architecture, Native Integration (Method Channels) 
            và App Store Deployment. Có nền tảng vững chắc về Web (Next.js/TypeScript).
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Dự án hoàn thành</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Năm kinh nghiệm</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">🇯🇵</span>
              <span className="stat-label">Dự án Nhật Bản</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToProjects}>
              <span>Xem dự án</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-secondary" onClick={scrollToContact}>
              <span>Liên hệ</span>
            </button>
          </div>

          <div className="hero-social">
            <a href="https://github.com/Vanquan99" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/quandv/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:vanquan.devwork@gmail.com" className="social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-preview">
                <div className="app-header">
                  <div className="status-bar">
                    <span>9:41</span>
                    <div className="status-icons">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>
                </div>
                <div className="app-content">
                  <div className="app-card"></div>
                  <div className="app-card"></div>
                  <div className="app-list">
                    <div className="list-item"></div>
                    <div className="list-item"></div>
                    <div className="list-item"></div>
                  </div>
                </div>
                <div className="app-nav">
                  <div className="nav-item active"></div>
                  <div className="nav-item"></div>
                  <div className="nav-item"></div>
                  <div className="nav-item"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-icons">
            <div className="floating-icon react-native">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85s-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
              </svg>
            </div>
            <div className="floating-icon flutter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
              </svg>
            </div>
            <div className="floating-icon swift">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.508 0c-.287 0-.573 0-.86.002-.241.002-.483.003-.724.01-.132.003-.263.009-.395.015A9.154 9.154 0 004.045.18 4.903 4.903 0 002.682.749a4.636 4.636 0 00-1.28 1.015A4.638 4.638 0 00.573 3.028 4.963 4.963 0 00.17 4.545 9.075 9.075 0 00.03 6.047a5.618 5.618 0 00-.015.395c-.007.241-.008.483-.01.724C.002 7.452 0 7.74 0 8.028v7.944c0 .287 0 .575.004.862.002.24.003.482.01.724.003.132.009.263.015.394a9.075 9.075 0 00.14 1.503c.065.488.19.957.403 1.41a4.636 4.636 0 001.015 1.28 4.638 4.638 0 001.28 1.015c.453.213.922.338 1.41.403a9.166 9.166 0 001.503.14 5.622 5.622 0 00.394.015c.242.007.484.008.725.01.286.002.574.004.861.004h7.944c.287 0 .575 0 .861-.004.241-.002.483-.003.724-.01.132-.003.263-.009.395-.015a9.166 9.166 0 001.502-.14 4.963 4.963 0 001.517-.403 4.636 4.636 0 001.28-1.015 4.638 4.638 0 001.014-1.28c.214-.453.339-.922.404-1.41a9.154 9.154 0 00.14-1.503 5.618 5.618 0 00.015-.394c.007-.242.008-.484.01-.725.003-.286.004-.574.004-.861V8.028c0-.287-.001-.575-.004-.861a75.53 75.53 0 00-.01-.724 5.618 5.618 0 00-.015-.395 9.103 9.103 0 00-.14-1.502 4.903 4.903 0 00-.404-1.518 4.636 4.636 0 00-1.014-1.28 4.636 4.636 0 00-1.28-1.015 4.903 4.903 0 00-1.517-.403A9.154 9.154 0 0017.792.027a5.622 5.622 0 00-.394-.015 78.13 78.13 0 00-.725-.01C16.388 0 16.1 0 15.812 0H7.508zm5.145 3.59c.196.056.378.169.508.305.39.41.762.838 1.115 1.28a14.922 14.922 0 012.504 4.464c.144.39.268.787.371 1.19a14.08 14.08 0 01.39 2.235c.088.725.134 1.455.139 2.186a14.926 14.926 0 01-.703 4.612 11.896 11.896 0 01-1.576 3.206 9.015 9.015 0 01-2.35 2.3c-.404.285-.829.535-1.267.759-.238.122-.482.238-.73.348a17.4 17.4 0 01-.776.327 14.556 14.556 0 01-1.594.545 14.282 14.282 0 01-3.288.582 14.926 14.926 0 01-3.49-.193.61.61 0 01-.294-.127.61.61 0 01-.205-.255.61.61 0 01-.051-.313.61.61 0 01.122-.3c.43-.558.901-1.08 1.404-1.563a24.3 24.3 0 002.282-2.357c.88-1.022 1.687-2.105 2.413-3.24a25.8 25.8 0 001.904-3.47 24.115 24.115 0 001.334-3.646c.305-1.042.533-2.103.68-3.175.035-.25.018-.503.018-.755a.61.61 0 01.183-.44.61.61 0 01.44-.183c.097 0 .188.023.279.07z"/>
              </svg>
            </div>
            <div className="floating-icon kotlin">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 24H0V0h24L12 12Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Cuộn xuống</span>
      </div>
    </section>
  );
};

export default Hero;
