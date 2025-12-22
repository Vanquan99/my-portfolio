export interface TechArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
  image?: string;
  author?: string;
}

interface HackerNewsItem {
  id: number;
  title: string;
  url?: string;
  by: string;
  time: number;
  score: number;
  type: string;
}

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  user: {
    name: string;
  };
  tag_list: string[];
}

interface RedditPost {
  data: {
    id: string;
    title: string;
    selftext: string;
    url: string;
    permalink: string;
    author: string;
    created_utc: number;
    subreddit: string;
    thumbnail: string;
    score: number;
  };
}

interface RedditResponse {
  data: {
    children: RedditPost[];
  };
}

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  creator?: string;
}

// Lấy tin từ Hacker News API (free, no key required)
async function fetchHackerNews(): Promise<TechArticle[]> {
  try {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    const storyIds: number[] = await response.json();
    
    // Lấy 10 bài đầu tiên
    const stories = await Promise.all(
      storyIds.slice(0, 10).map(async (id) => {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return storyResponse.json() as Promise<HackerNewsItem>;
      })
    );

    return stories
      .filter((story) => story && story.url)
      .map((story) => ({
        id: `hn-${story.id}`,
        title: story.title,
        description: `Score: ${story.score} points`,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        source: 'Hacker News',
        category: 'technology',
        publishedAt: new Date(story.time * 1000).toISOString(),
        author: story.by,
      }));
  } catch (error) {
    console.error('Error fetching Hacker News:', error);
    return [];
  }
}

// Lấy tin từ Dev.to API (free, no key required)
async function fetchDevTo(tag?: string): Promise<TechArticle[]> {
  try {
    const tagQuery = tag ? `&tag=${tag}` : '';
    const response = await fetch(
      `https://dev.to/api/articles?per_page=10${tagQuery}`
    );
    const articles: DevToArticle[] = await response.json();

    return articles.map((article) => ({
      id: `devto-${article.id}`,
      title: article.title,
      description: article.description || '',
      url: article.url,
      source: 'Dev.to',
      category: article.tag_list[0] || 'programming',
      publishedAt: article.published_at,
      image: article.cover_image || undefined,
      author: article.user.name,
    }));
  } catch (error) {
    console.error('Error fetching Dev.to:', error);
    return [];
  }
}

// Lấy tin AI từ Reddit (free, no key required)
async function fetchRedditAI(): Promise<TechArticle[]> {
  try {
    const subreddits = ['artificial', 'MachineLearning', 'ChatGPT', 'LocalLLaMA'];
    const allPosts: TechArticle[] = [];

    for (const subreddit of subreddits) {
      try {
        const response = await fetch(
          `https://www.reddit.com/r/${subreddit}/hot.json?limit=5`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; TechPortfolio/1.0)',
            },
          }
        );
        
        if (!response.ok) continue;
        
        const data: RedditResponse = await response.json();
        
        const posts = data.data.children
          .filter((post) => !post.data.url.includes('reddit.com/r/') || post.data.selftext)
          .map((post) => ({
            id: `reddit-${post.data.id}`,
            title: post.data.title,
            description: post.data.selftext 
              ? post.data.selftext.substring(0, 200) + '...'
              : `r/${post.data.subreddit} • ${post.data.score} points`,
            url: post.data.url.includes('reddit.com') 
              ? `https://reddit.com${post.data.permalink}`
              : post.data.url,
            source: `Reddit r/${post.data.subreddit}`,
            category: 'ai',
            publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
            author: post.data.author,
            image: post.data.thumbnail && post.data.thumbnail.startsWith('http') 
              ? post.data.thumbnail 
              : undefined,
          }));
        
        allPosts.push(...posts);
      } catch (e) {
        console.error(`Error fetching r/${subreddit}:`, e);
      }
    }

    return allPosts;
  } catch (error) {
    console.error('Error fetching Reddit AI:', error);
    return [];
  }
}

// Lấy tin Flutter từ Dev.to và các nguồn liên quan
async function fetchFlutterNews(): Promise<TechArticle[]> {
  try {
    // Lấy từ Dev.to với tag flutter
    const devToFlutter = await fetchDevTo('flutter');
    
    // Thêm các bài viết tĩnh từ Flutter.dev (vì không có API public)
    const flutterOfficialNews: TechArticle[] = [
      {
        id: 'flutter-official-1',
        title: 'Flutter 3.24 Release Notes',
        description: 'Khám phá các tính năng mới trong Flutter 3.24 bao gồm cải tiến performance và Impeller engine.',
        url: 'https://flutter.dev/docs/whats-new',
        source: 'Flutter.dev',
        category: 'flutter',
        publishedAt: new Date().toISOString(),
        image: 'https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png',
        author: 'Flutter Team',
      },
      {
        id: 'flutter-official-2',
        title: 'Flutter Documentation - Get Started',
        description: 'Hướng dẫn chính thức để bắt đầu với Flutter, cài đặt và tạo ứng dụng đầu tiên.',
        url: 'https://flutter.dev/docs/get-started',
        source: 'Flutter.dev',
        category: 'flutter',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        image: 'https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png',
        author: 'Flutter Team',
      },
      {
        id: 'flutter-official-3',
        title: 'Flutter Codelabs & Workshops',
        description: 'Học Flutter qua các codelabs tương tác và workshops chính thức từ Google.',
        url: 'https://flutter.dev/docs/codelabs',
        source: 'Flutter.dev',
        category: 'flutter',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        author: 'Flutter Team',
      },
    ];

    return [...flutterOfficialNews, ...devToFlutter];
  } catch (error) {
    console.error('Error fetching Flutter news:', error);
    return [];
  }
}

// Lấy tin Android từ Dev.to và các nguồn liên quan  
async function fetchAndroidNews(): Promise<TechArticle[]> {
  try {
    // Lấy từ Dev.to với tag android và kotlin
    const [devToAndroid, devToKotlin] = await Promise.all([
      fetchDevTo('android'),
      fetchDevTo('kotlin'),
    ]);

    // Thêm các bài viết tĩnh từ Android Developers (vì không có API public)
    const androidOfficialNews: TechArticle[] = [
      {
        id: 'android-official-1',
        title: 'Android 15 Developer Preview',
        description: 'Khám phá các tính năng mới trong Android 15, bao gồm cải tiến bảo mật và privacy.',
        url: 'https://developer.android.com/about/versions/15',
        source: 'Android Developers',
        category: 'android',
        publishedAt: new Date().toISOString(),
        image: 'https://developer.android.com/static/images/social/android-developers.png',
        author: 'Android Team',
      },
      {
        id: 'android-official-2',
        title: 'Jetpack Compose - Modern Android UI',
        description: 'Xây dựng UI native Android với Jetpack Compose - toolkit UI hiện đại và declarative.',
        url: 'https://developer.android.com/jetpack/compose',
        source: 'Android Developers',
        category: 'android',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        image: 'https://developer.android.com/static/images/jetpack/compose/compose-samples.png',
        author: 'Android Team',
      },
      {
        id: 'android-official-3',
        title: 'Kotlin for Android Development',
        description: 'Tài liệu chính thức về phát triển Android với Kotlin - ngôn ngữ được Google khuyên dùng.',
        url: 'https://developer.android.com/kotlin',
        source: 'Android Developers',
        category: 'kotlin',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        author: 'Android Team',
      },
      {
        id: 'android-official-4',
        title: 'Android Studio - Official IDE',
        description: 'Tải Android Studio và bắt đầu phát triển ứng dụng Android với IDE chính thức từ Google.',
        url: 'https://developer.android.com/studio',
        source: 'Android Developers',
        category: 'android',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        author: 'Android Team',
      },
    ];

    // Kết hợp và loại bỏ trùng lặp
    const allAndroid = [...androidOfficialNews, ...devToAndroid, ...devToKotlin];
    return allAndroid.reduce((acc, article) => {
      if (!acc.find((a) => a.title.toLowerCase() === article.title.toLowerCase())) {
        acc.push(article);
      }
      return acc;
    }, [] as TechArticle[]);
  } catch (error) {
    console.error('Error fetching Android news:', error);
    return [];
  }
}

// Lấy tin AI từ nhiều nguồn
async function fetchAINews(): Promise<TechArticle[]> {
  try {
    const [devToAI, devToML, devToOpenAI, redditAI] = await Promise.all([
      fetchDevTo('ai'),
      fetchDevTo('machinelearning'),
      fetchDevTo('openai'),
      fetchRedditAI(),
    ]);

    // Thêm các bài viết về AI hot topics
    const aiHighlights: TechArticle[] = [
      {
        id: 'ai-highlight-1',
        title: 'OpenAI GPT-4 và các ứng dụng mới',
        description: 'Tìm hiểu về GPT-4, khả năng multimodal và cách tích hợp vào ứng dụng mobile.',
        url: 'https://openai.com/gpt-4',
        source: 'OpenAI',
        category: 'ai',
        publishedAt: new Date().toISOString(),
        author: 'OpenAI Team',
      },
      {
        id: 'ai-highlight-2',
        title: 'Google Gemini - AI đa phương thức',
        description: 'Khám phá Gemini, mô hình AI mới nhất của Google với khả năng xử lý text, image và code.',
        url: 'https://deepmind.google/technologies/gemini/',
        source: 'Google DeepMind',
        category: 'ai',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        author: 'DeepMind Team',
      },
      {
        id: 'ai-highlight-3',
        title: 'Claude AI - Anthropic',
        description: 'Claude là AI assistant an toàn và hữu ích, được thiết kế để có cuộc trò chuyện tự nhiên.',
        url: 'https://www.anthropic.com/claude',
        source: 'Anthropic',
        category: 'ai',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        author: 'Anthropic Team',
      },
      {
        id: 'ai-highlight-4',
        title: 'Hugging Face - Open Source AI',
        description: 'Nền tảng cộng đồng lớn nhất cho machine learning với hàng nghìn models miễn phí.',
        url: 'https://huggingface.co/',
        source: 'Hugging Face',
        category: 'ai',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        author: 'Hugging Face Team',
      },
      {
        id: 'ai-highlight-5',
        title: 'LangChain - Build LLM Applications',
        description: 'Framework phổ biến để xây dựng ứng dụng với Large Language Models.',
        url: 'https://www.langchain.com/',
        source: 'LangChain',
        category: 'ai',
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        author: 'LangChain Team',
      },
    ];

    const allAI = [...aiHighlights, ...devToAI, ...devToML, ...devToOpenAI, ...redditAI];
    
    return allAI.reduce((acc, article) => {
      if (!acc.find((a) => a.title.toLowerCase() === article.title.toLowerCase())) {
        acc.push(article);
      }
      return acc;
    }, [] as TechArticle[]);
  } catch (error) {
    console.error('Error fetching AI news:', error);
    return [];
  }
}

// Lấy tin từ LinkedIn Engineering Blog và các bài viết tech nổi bật
// Note: LinkedIn không có public API miễn phí, sử dụng RSS proxy hoặc bài viết curated
async function fetchLinkedInNews(): Promise<TechArticle[]> {
  try {
    // Thử lấy từ LinkedIn Engineering Blog qua RSS proxy
    const rssProxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://engineering.linkedin.com/blog.rss';
    
    let linkedInEngineering: TechArticle[] = [];
    
    try {
      const response = await fetch(rssProxyUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.items && Array.isArray(data.items)) {
          linkedInEngineering = data.items.slice(0, 5).map((item: RSSItem, index: number) => ({
            id: `linkedin-eng-${index}`,
            title: item.title,
            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || '',
            url: item.link,
            source: 'LinkedIn Engineering',
            category: 'technology',
            publishedAt: new Date(item.pubDate).toISOString(),
            image: 'https://content.linkedin.com/content/dam/engineering/site-assets/images/blog/Engineering-Blog-Logo.png',
            author: item.creator || 'LinkedIn Engineering Team',
          }));
        }
      }
    } catch (e) {
      console.error('Error fetching LinkedIn RSS:', e);
    }

    // Bài viết LinkedIn nổi bật về tech (curated content)
    const linkedInHighlights: TechArticle[] = [
      {
        id: 'linkedin-1',
        title: 'LinkedIn Engineering: Scaling Mobile Apps',
        description: 'Cách LinkedIn xây dựng và scale ứng dụng mobile cho hàng trăm triệu người dùng.',
        url: 'https://engineering.linkedin.com/blog/topic/mobile',
        source: 'LinkedIn Engineering',
        category: 'mobile',
        publishedAt: new Date().toISOString(),
        image: 'https://content.linkedin.com/content/dam/engineering/site-assets/images/blog/Engineering-Blog-Logo.png',
        author: 'LinkedIn Engineering',
      },
      {
        id: 'linkedin-2',
        title: 'Machine Learning at LinkedIn',
        description: 'Khám phá cách LinkedIn sử dụng AI và ML để cá nhân hóa trải nghiệm người dùng.',
        url: 'https://engineering.linkedin.com/blog/topic/machine-learning',
        source: 'LinkedIn Engineering',
        category: 'ai',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        image: 'https://content.linkedin.com/content/dam/engineering/site-assets/images/blog/Engineering-Blog-Logo.png',
        author: 'LinkedIn AI Team',
      },
      {
        id: 'linkedin-3',
        title: 'Building Real-time Features at Scale',
        description: 'Kiến trúc hệ thống real-time của LinkedIn xử lý hàng tỷ events mỗi ngày.',
        url: 'https://engineering.linkedin.com/blog/topic/real-time',
        source: 'LinkedIn Engineering',
        category: 'technology',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        image: 'https://content.linkedin.com/content/dam/engineering/site-assets/images/blog/Engineering-Blog-Logo.png',
        author: 'LinkedIn Infrastructure',
      },
      {
        id: 'linkedin-4',
        title: 'LinkedIn Learning: Top Tech Skills 2025',
        description: 'Những kỹ năng công nghệ được tìm kiếm nhiều nhất năm 2025 theo dữ liệu LinkedIn.',
        url: 'https://www.linkedin.com/learning/topics/technology',
        source: 'LinkedIn Learning',
        category: 'technology',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        image: 'https://static.licdn.com/aero-v1/sc/h/3loy7tajf3n0cho89wgg0fjre',
        author: 'LinkedIn Learning',
      },
      {
        id: 'linkedin-5',
        title: 'Open Source Projects from LinkedIn',
        description: 'Các dự án open source nổi bật từ LinkedIn: Kafka, Samza, Azkaban và nhiều hơn nữa.',
        url: 'https://linkedin.github.io/',
        source: 'LinkedIn Open Source',
        category: 'technology',
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        image: 'https://content.linkedin.com/content/dam/engineering/site-assets/images/blog/Engineering-Blog-Logo.png',
        author: 'LinkedIn Engineering',
      },
    ];

    // Kết hợp RSS feed và curated content
    const allLinkedIn = [...linkedInEngineering, ...linkedInHighlights];
    
    // Loại bỏ trùng lặp
    return allLinkedIn.reduce((acc, article) => {
      if (!acc.find((a) => a.title.toLowerCase() === article.title.toLowerCase())) {
        acc.push(article);
      }
      return acc;
    }, [] as TechArticle[]);
  } catch (error) {
    console.error('Error fetching LinkedIn news:', error);
    return [];
  }
}

// Lấy tin về các ngôn ngữ lập trình cụ thể
export async function fetchLanguageNews(language: string): Promise<TechArticle[]> {
  return fetchDevTo(language.toLowerCase());
}

// Hàm chính để lấy tất cả tin tức công nghệ
export async function fetchAllTechNews(): Promise<TechArticle[]> {
  try {
    const [hackerNews, devToGeneral, reactNews, flutterNews, swiftNews, androidNews, aiNews, linkedInNews] =
      await Promise.all([
        fetchHackerNews(),
        fetchDevTo(),
        fetchDevTo('react'),
        fetchFlutterNews(),
        fetchDevTo('swift'),
        fetchAndroidNews(),
        fetchAINews(),
        fetchLinkedInNews(),
      ]);

    // Kết hợp và loại bỏ trùng lặp
    const allArticles = [
      ...hackerNews,
      ...devToGeneral,
      ...reactNews,
      ...flutterNews,
      ...swiftNews,
      ...androidNews,
      ...aiNews,
      ...linkedInNews,
    ];

    // Loại bỏ trùng lặp theo title
    const uniqueArticles = allArticles.reduce<TechArticle[]>((acc, article) => {
      const exists = acc.find(
        (a: TechArticle) => a.title.toLowerCase() === article.title.toLowerCase()
      );
      if (!exists) {
        acc.push(article);
      }
      return acc;
    }, []);

    // Sắp xếp theo thời gian mới nhất
    return uniqueArticles.sort(
      (a: TechArticle, b: TechArticle) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching tech news:', error);
    return [];
  }
}

// Lấy tin theo category
export async function fetchNewsByCategory(
  category: string
): Promise<TechArticle[]> {
  switch (category.toLowerCase()) {
    case 'react':
    case 'react native':
    case 'reactnative':
      return fetchDevTo('reactnative');
    case 'flutter':
      return fetchFlutterNews();
    case 'swift':
    case 'ios':
      return fetchDevTo('swift');
    case 'kotlin':
    case 'android':
      return fetchAndroidNews();
    case 'javascript':
      return fetchDevTo('javascript');
    case 'typescript':
      return fetchDevTo('typescript');
    case 'mobile':
      return fetchDevTo('mobile');
    case 'ai':
    case 'machinelearning':
    case 'ml':
      return fetchAINews();
    case 'linkedin':
      return fetchLinkedInNews();
    default:
      return fetchAllTechNews();
  }
}

// Categories cho filter
export const newsCategories = [
  { id: 'all', name: 'Tất cả', tag: '' },
  { id: 'ai', name: '🤖 AI & ML', tag: 'ai' },
  { id: 'linkedin', name: '💼 LinkedIn', tag: 'linkedin' },
  { id: 'mobile', name: 'Mobile Dev', tag: 'mobile' },
  { id: 'react', name: 'React Native', tag: 'reactnative' },
  { id: 'flutter', name: 'Flutter', tag: 'flutter' },
  { id: 'ios', name: 'iOS/Swift', tag: 'swift' },
  { id: 'android', name: 'Android', tag: 'android' },
  { id: 'javascript', name: 'JavaScript', tag: 'javascript' },
  { id: 'typescript', name: 'TypeScript', tag: 'typescript' },
];
