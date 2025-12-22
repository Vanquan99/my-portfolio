import React, { useState } from 'react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  platform: string[];
  downloads: string;
  rating: string;
  features: string[];
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    demo?: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Ceres (Softbank)',
    description: 'Ứng dụng self-care super app cho Softbank Japan',
    longDescription: 'Ứng dụng toàn diện cho khách hàng Softbank Nhật Bản, cho phép quản lý tập trung viễn thông và tiện ích gia đình (điện, nước, gas, internet) cùng với quản lý hợp đồng số.',
    image: '🇯🇵',
    technologies: ['Kotlin', 'Swift', 'Native Android', 'Native iOS'],
    category: 'telecom',
    platform: ['iOS', 'Android'],
    downloads: 'Enterprise',
    rating: '4.5',
    features: ['Quản lý viễn thông', 'Tiện ích gia đình', 'Hợp đồng số', 'Thanh toán'],
    links: {
      playStore: '#',
      appStore: '#',
    },
  },
  {
    id: 2,
    title: 'Pegasus',
    description: 'Hệ thống đặt lịch khám và theo dõi bệnh viện',
    longDescription: 'Hệ thống cho phép người dùng tìm kiếm bệnh viện, đặt lịch hẹn và theo dõi các cuộc khám bệnh.',
    image: '🏥',
    technologies: ['Dart', 'Flutter', 'Websocket', 'Hasura', 'SQL Server'],
    category: 'health',
    platform: ['iOS', 'Android'],
    downloads: 'B2B',
    rating: '4.7',
    features: ['Tìm kiếm bệnh viện', 'Đặt lịch hẹn', 'Theo dõi khám', 'Real-time updates'],
    links: {
      playStore: '#',
      appStore: '#',
    },
  },
  {
    id: 3,
    title: 'Astrotalk',
    description: 'Hệ thống trao đổi thông tin bệnh nhân cho bác sĩ',
    longDescription: 'Hệ thống cho phép các bác sĩ thảo luận về tình trạng bệnh nhân và trao đổi thông tin bệnh nhân một cách an toàn.',
    image: '👨‍⚕️',
    technologies: ['Dart', 'Flutter', 'Websocket', 'SQL Server'],
    category: 'health',
    platform: ['iOS', 'Android'],
    downloads: 'B2B',
    rating: '4.8',
    features: ['Chat bác sĩ', 'Chia sẻ hồ sơ', 'Bảo mật y tế', 'Real-time'],
    links: {
      playStore: '#',
    },
  },
  {
    id: 4,
    title: 'Nutrifacts',
    description: 'Ứng dụng tính toán dinh dưỡng và sức khỏe',
    longDescription: 'Ứng dụng tính toán chỉ số dinh dưỡng và sức khỏe trên nền tảng Flutter.',
    image: '🥗',
    technologies: ['Dart', 'Flutter', 'Firebase', 'SQLite'],
    category: 'health',
    platform: ['iOS', 'Android'],
    downloads: '10K+',
    rating: '4.6',
    features: ['Tính calories', 'Theo dõi dinh dưỡng', 'Mục tiêu sức khỏe', 'Lịch sử'],
    links: {
      playStore: '#',
    },
  },
  {
    id: 5,
    title: 'Sugi Pharmacy',
    description: 'Ứng dụng quản lý coupon nhà thuốc',
    longDescription: 'Phát triển ứng dụng quản lý coupon nhà thuốc, thêm các tính năng mới cho hệ thống hiện có.',
    image: '💊',
    technologies: ['Dart', 'Flutter', 'Firebase', 'Salesforce'],
    category: 'retail',
    platform: ['iOS', 'Android'],
    downloads: '50K+',
    rating: '4.5',
    features: ['Quản lý coupon', 'Tích điểm', 'Khuyến mãi', 'Lịch sử mua hàng'],
    links: {
      playStore: '#',
      appStore: '#',
    },
  },
  {
    id: 6,
    title: 'FBT (Web App)',
    description: 'Ứng dụng quản lý thông tin em bé',
    longDescription: 'Ứng dụng web để quản lý thông tin em bé, theo dõi phát triển và thêm các tính năng mới.',
    image: '👶',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    category: 'family',
    platform: ['Web'],
    downloads: 'B2C',
    rating: '4.4',
    features: ['Theo dõi phát triển', 'Lịch tiêm chủng', 'Album ảnh', 'Nhật ký'],
    links: {
      demo: '#',
    },
  },
];

const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'health', name: 'Y tế & Sức khỏe' },
  { id: 'telecom', name: 'Viễn thông' },
  { id: 'retail', name: 'Bán lẻ' },
  { id: 'family', name: 'Gia đình' },
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <span className="section-tag">&lt;projects&gt;</span>
          <h2 className="section-title">Dự án nổi bật</h2>
          <p className="section-subtitle">
            Một số dự án tiêu biểu tôi đã phát triển
          </p>
        </div>

        <div className="projects-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <span className="project-emoji">{project.image}</span>
                <div className="project-platforms">
                  {project.platform.map((p) => (
                    <span key={p} className="platform-tag">{p}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-icon">📥</span>
                    <span>{project.downloads}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⭐</span>
                    <span>{project.rating}</span>
                  </div>
                </div>

                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag more">+{project.technologies.length - 3}</span>
                  )}
                </div>

                <div className="project-links">
                  {project.links.appStore && (
                    <a href={project.links.appStore} className="project-link" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </a>
                  )}
                  {project.links.playStore && (
                    <a href={project.links.playStore} className="project-link" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} className="project-link" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="project-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                ×
              </button>
              
              <div className="modal-header">
                <span className="modal-emoji">{selectedProject.image}</span>
                <div>
                  <h3>{selectedProject.title}</h3>
                  <div className="modal-platforms">
                    {selectedProject.platform.map((p) => (
                      <span key={p} className="platform-tag">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="modal-description">{selectedProject.longDescription}</p>

              <div className="modal-features">
                <h4>Tính năng chính</h4>
                <ul>
                  {selectedProject.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-tech">
                <h4>Công nghệ sử dụng</h4>
                <div className="tech-list">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="stat-value">{selectedProject.downloads}</span>
                  <span className="stat-label">Lượt tải</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-value">{selectedProject.rating}</span>
                  <span className="stat-label">Đánh giá</span>
                </div>
              </div>

              <div className="modal-links">
                {selectedProject.links.appStore && (
                  <a href={selectedProject.links.appStore} className="modal-link app-store">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                )}
                {selectedProject.links.playStore && (
                  <a href={selectedProject.links.playStore} className="modal-link play-store">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Play Store
                  </a>
                )}
                {selectedProject.links.github && (
                  <a href={selectedProject.links.github} className="modal-link github">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
