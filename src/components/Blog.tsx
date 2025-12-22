import React, { useState, useEffect } from 'react';
import './Blog.css';
import {
  TechArticle,
  fetchAllTechNews,
  fetchNewsByCategory,
  newsCategories,
} from '../services/techNewsService';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<TechArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const news = await fetchAllTechNews();
      setArticles(news);
    } catch (err) {
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setActiveCategory(categoryId);
    setLoading(true);
    setError(null);

    try {
      if (categoryId === 'all') {
        const news = await fetchAllTechNews();
        setArticles(news);
      } else {
        const category = newsCategories.find((c) => c.id === categoryId);
        if (category) {
          const news = await fetchNewsByCategory(category.tag);
          setArticles(news);
        }
      }
    } catch (err) {
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  const getSourceIcon = (source: string) => {
    if (source.includes('Reddit')) return '🔴';
    if (source.includes('Flutter')) return '🦋';
    if (source.includes('Android')) return '🤖';
    if (source.includes('OpenAI')) return '🧠';
    if (source.includes('DeepMind') || source.includes('Google')) return '🔵';
    if (source.includes('Anthropic')) return '🟠';
    if (source.includes('Hugging Face')) return '🤗';
    if (source.includes('LangChain')) return '🦜';
    
    switch (source) {
      case 'Hacker News':
        return '🔶';
      case 'Dev.to':
        return '👨‍💻';
      default:
        return '📰';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      react: '#61dafb',
      reactnative: '#61dafb',
      flutter: '#02569B',
      swift: '#F05138',
      kotlin: '#7F52FF',
      android: '#3DDC84',
      javascript: '#f7df1e',
      typescript: '#3178c6',
      mobile: '#06b6d4',
      technology: '#8b5cf6',
      ai: '#10b981',
      machinelearning: '#10b981',
      openai: '#10b981',
      chatgpt: '#10b981',
      programming: '#22c55e',
    };
    return colors[category.toLowerCase()] || '#94a3b8';
  };

  return (
    <section id="blog" className="blog">
      <div className="blog-container">
        <div className="section-header">
          <span className="section-tag">&lt;blog&gt;</span>
          <h2 className="section-title">Tech Blog</h2>
          <p className="section-subtitle">
            Tin tức công nghệ mới nhất về Mobile Development và Programming
          </p>
        </div>

        <div className="blog-filters">
          {newsCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
          <button className="refresh-btn" onClick={loadArticles} title="Làm mới">
            🔄
          </button>
        </div>

        {loading ? (
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        ) : error ? (
          <div className="blog-error">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={loadArticles}>Thử lại</button>
          </div>
        ) : (
          <>
            <div className="blog-stats">
              <span>📊 {articles.length} bài viết</span>
              <span>🕐 Cập nhật: {new Date().toLocaleTimeString('vi-VN')}</span>
            </div>

            <div className="blog-grid">
              {articles.slice(0, 3).map((article) => (
                <article key={article.id} className="blog-card">
                  {article.image && (
                    <div className="blog-card-image">
                      <img src={article.image} alt={article.title} loading="lazy" />
                    </div>
                  )}
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span
                        className="blog-category"
                        style={{
                          backgroundColor: `${getCategoryColor(article.category)}20`,
                          color: getCategoryColor(article.category),
                          borderColor: `${getCategoryColor(article.category)}40`,
                        }}
                      >
                        {article.category}
                      </span>
                      <span className="blog-source">
                        {getSourceIcon(article.source)} {article.source}
                      </span>
                    </div>

                    <h3 className="blog-card-title">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h3>

                    {article.description && (
                      <p className="blog-card-description">
                        {article.description.length > 120
                          ? `${article.description.substring(0, 120)}...`
                          : article.description}
                      </p>
                    )}

                    <div className="blog-card-footer">
                      <span className="blog-author">
                        {article.author && `✍️ ${article.author}`}
                      </span>
                      <span className="blog-date">{formatDate(article.publishedAt)}</span>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-read-more"
                    >
                      Đọc thêm
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {articles.length > 3 && (
              <div className="blog-load-more">
                <button className="load-more-btn">
                  Xem thêm bài viết ({articles.length - 3} bài còn lại)
                </button>
              </div>
            )}
          </>
        )}

        <div className="blog-sources">
          <h4>Nguồn tin tức</h4>
          <div className="sources-list">
            <a href="https://news.ycombinator.com" target="_blank" rel="noopener noreferrer">
              🔶 Hacker News
            </a>
            <a href="https://dev.to" target="_blank" rel="noopener noreferrer">
              👨‍💻 Dev.to
            </a>
            <a href="https://flutter.dev" target="_blank" rel="noopener noreferrer">
              🦋 Flutter.dev
            </a>
            <a href="https://developer.android.com" target="_blank" rel="noopener noreferrer">
              🤖 Android Developers
            </a>
            <a href="https://openai.com" target="_blank" rel="noopener noreferrer">
              🧠 OpenAI
            </a>
            <a href="https://www.reddit.com/r/MachineLearning" target="_blank" rel="noopener noreferrer">
              🔴 Reddit AI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
