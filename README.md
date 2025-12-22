# Portfolio Website - Đinh Văn Quân

Professional portfolio website for Mobile Developer (Flutter/React Native) built with React + TypeScript.

🌐 **Live Site**: [https://quantichcuc.social](https://quantichcuc.social)

## Features

- 🎨 Modern dark theme with gradient animations
- 📱 Fully responsive design
- ⚡ Fast performance with optimized build
- 🔒 HTTPS enabled with SSL certificate
- 📰 Real-time tech news from multiple sources
- 💼 Project showcase with detailed information
- 📧 Contact form integration

## Tech Stack

- **Framework**: React 19.2.3 + TypeScript 4.9.5
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: Custom CSS with modern effects
- **APIs**: Hacker News, Dev.to, Reddit, LinkedIn RSS
- **Hosting**: DigitalOcean VPS (Ubuntu + Nginx)
- **SSL**: Let's Encrypt (Certbot)

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vanquan99/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development

### Project Structure

```
my-portfolio/
├── public/             # Static files
├── src/
│   ├── components/    # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── services/      # API services
│   │   └── techNewsService.ts
│   ├── App.tsx        # Main app component
│   └── index.tsx      # Entry point
└── package.json
```

### Available Scripts

#### `npm start`
Runs the app in development mode with hot reload.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Creates optimized production build in the `build` folder.

#### `npm run eject`
⚠️ **One-way operation!** Ejects from Create React App configuration.

## How to Update Content

### 1. Personal Information

Edit `src/components/Hero.tsx`:
```typescript
// Update name, title, social links
const Hero = () => {
  // Modify text content here
}
```

### 2. Skills

Edit `src/components/Skills.tsx`:
```typescript
const skills = [
  { name: 'Flutter', level: 95, category: 'mobile' },
  // Add or modify skills
];
```

### 3. Projects

Edit `src/components/Projects.tsx`:
```typescript
const projects = [
  {
    title: 'Project Name',
    description: 'Description',
    // Update project details
  }
];
```

### 4. Experience

Edit `src/components/Experience.tsx`:
```typescript
const experiences = [
  {
    company: 'Company Name',
    projects: [
      // Add or modify projects
    ]
  }
];
```

### 5. Contact Information

Edit `src/components/Contact.tsx`:
```typescript
// Update email, phone, address
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder.

### Deploy to VPS

**Server Information:**
- IP: `157.230.245.125`
- Domain: `quantichcuc.social`
- Server: Ubuntu + Nginx
- SSL: Let's Encrypt

**Upload files to VPS:**
```bash
scp -r build/* root@157.230.245.125:/var/www/quantichcuc.social/
```

**VPS Configuration (First Time Only):**

1. Install Nginx:
```bash
apt update
apt install -y nginx
```

2. Create site directory:
```bash
mkdir -p /var/www/quantichcuc.social
```

3. Configure Nginx:
```bash
nano /etc/nginx/sites-available/quantichcuc.social
```

Add configuration:
```nginx
server {
    listen 80;
    server_name quantichcuc.social;
    root /var/www/quantichcuc.social;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Enable site:
```bash
ln -s /etc/nginx/sites-available/quantichcuc.social /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

5. Install SSL certificate:
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d quantichcuc.social --email vanquan.devwork@gmail.com --agree-tos --non-interactive
```

### Quick Update (After Initial Setup)

1. Make your code changes
2. Build:
   ```bash
   npm run build
   ```
3. Deploy:
   ```bash
   scp -r build/* root@157.230.245.125:/var/www/quantichcuc.social/
   ```

No server restart needed - changes are live immediately!

## DNS Configuration

Add these A records in your domain registrar (DigitalOcean):

| Type | Name | Value            | TTL  |
|------|------|------------------|------|
| A    | @    | 157.230.245.125  | 3600 |
| A    | www  | 157.230.245.125  | 3600 |

Wait 5-30 minutes for DNS propagation.

## SSL Certificate

- **Provider**: Let's Encrypt
- **Expires**: March 22, 2026
- **Auto-renewal**: Configured
- **Certificate location**: `/etc/letsencrypt/live/quantichcuc.social/`

Certificate renews automatically every 90 days.

## Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### VPS connection issues
```bash
# Test connection
ping 157.230.245.125

# Check Nginx status on VPS
systemctl status nginx

# View Nginx logs
tail -f /var/log/nginx/error.log
```

### SSL issues
```bash
# Renew certificate manually
certbot renew --nginx

# Test renewal
certbot renew --dry-run
```

## Contact

- **Email**: vanquan.devwork@gmail.com
- **Phone**: 076 322 9698
- **GitHub**: [github.com/Vanquan99](https://github.com/Vanquan99)
- **LinkedIn**: [linkedin.com/in/quandv](https://linkedin.com/in/quandv/)

## License

This project is open source and available for personal use.

---

Built with ❤️ using React + TypeScript
