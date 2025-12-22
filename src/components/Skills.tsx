import React from 'react';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  // Mobile Development
  { name: 'Flutter', level: 95, icon: '🦋', category: 'mobile' },
  { name: 'Dart', level: 95, icon: '🎯', category: 'mobile' },
  { name: 'Kotlin', level: 75, icon: '🤖', category: 'mobile' },
  { name: 'Java (Android)', level: 70, icon: '☕', category: 'mobile' },
  { name: 'Swift', level: 65, icon: '🍎', category: 'mobile' },
  
  // State Management & Architecture
  { name: 'BLoC / Cubit', level: 90, icon: '🧊', category: 'architecture' },
  { name: 'Provider', level: 88, icon: '📦', category: 'architecture' },
  { name: 'Riverpod', level: 85, icon: '🌊', category: 'architecture' },
  { name: 'GetX', level: 85, icon: '⚡', category: 'architecture' },
  { name: 'Clean Architecture', level: 90, icon: '🏗️', category: 'architecture' },
  { name: 'MVVM', level: 88, icon: '📐', category: 'architecture' },
  
  // Backend & Database
  { name: 'Firebase', level: 90, icon: '🔥', category: 'backend' },
  { name: 'RESTful APIs', level: 92, icon: '🔌', category: 'backend' },
  { name: 'GraphQL', level: 80, icon: '◈', category: 'backend' },
  { name: 'SQLite / Hive', level: 85, icon: '💾', category: 'backend' },
  { name: 'Websocket', level: 82, icon: '🔗', category: 'backend' },
  
  // Web & Tools
  { name: 'TypeScript', level: 80, icon: '📘', category: 'tools' },
  { name: 'Next.js / React', level: 78, icon: '⚛️', category: 'tools' },
  { name: 'Tailwind CSS', level: 75, icon: '🎨', category: 'tools' },
  { name: 'Git', level: 90, icon: '📦', category: 'tools' },
  { name: 'Figma', level: 85, icon: '🎨', category: 'tools' },
];

const categories = [
  { id: 'mobile', name: 'Mobile Development', description: 'Phát triển ứng dụng Flutter & Native' },
  { id: 'architecture', name: 'State & Architecture', description: 'Quản lý state và kiến trúc phần mềm' },
  { id: 'backend', name: 'Backend & Database', description: 'Xử lý dữ liệu và tích hợp API' },
  { id: 'tools', name: 'Web & Tools', description: 'Công nghệ web và công cụ hỗ trợ' },
];

const Skills: React.FC = () => {
  const getSkillsByCategory = (categoryId: string) => {
    return skills.filter(skill => skill.category === categoryId);
  };

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="section-header">
          <span className="section-tag">&lt;skills&gt;</span>
          <h2 className="section-title">Kỹ năng</h2>
          <p className="section-subtitle">
            Công nghệ và công cụ tôi sử dụng để biến ý tưởng thành sản phẩm
          </p>
        </div>

        <div className="skills-grid">
          {categories.map((category) => (
            <div key={category.id} className="skill-category">
              <div className="category-header">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <div className="skill-list">
                {getSkillsByCategory(category.id).map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-extra">
          <div className="extra-card">
            <div className="extra-icon">📚</div>
            <h4>Đang học</h4>
            <p>AI/ML for Mobile, Advanced System Design</p>
          </div>
          <div className="extra-card">
            <div className="extra-icon">🏆</div>
            <h4>Chứng chỉ</h4>
            <p>Khoa Pham Academy - Android Programming (2021)</p>
          </div>
          <div className="extra-card">
            <div className="extra-icon">💡</div>
            <h4>Phương pháp</h4>
            <p>Clean Architecture, MVVM, Repository Pattern, DI</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
