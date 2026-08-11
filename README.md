# Jay Jobanputra's Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS, featuring a tech-themed design with dynamic animations and responsive layouts.

## 🚀 Features

- **Interactive UI Elements**
  - Custom cursor effects
  - Smooth scroll animations
  - Tech-themed background patterns
  - Loading animations
  - Parallax effects

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Touch-friendly interactions

- **Tech Stack Showcase**
  - Skills visualization with interactive graphs
  - Project showcase with live demos and videos
  - Interactive code snippets with syntax highlighting
  - 3D/VR capabilities with A-Frame

- **Performance Optimized**
  - Efficient animations using Framer Motion
  - Optimized asset loading
  - Smooth transitions

## 🛠️ Built With

- **Frontend Framework**
  - React 18
  - TypeScript
  - Tailwind CSS
  
- **Animation & Interaction**
  - Framer Motion
  - Typewriter Effect
  - React Force Graph (d3-force)
  - A-Frame (WebVR)
  
- **UI Components & Icons**
  - React Icons
  - React Scroll
  
- **Services**
  - EmailJS (@emailjs/browser) for contact form
  
- **Testing**
  - React Testing Library
  - Jest

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone [your-repo-link]
   ```

2. Navigate to the project directory
   ```bash
   cd portfolio
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm start
   ```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be available in the `build/` directory.

### Running Tests

```bash
npm test
```

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets and public files
│   ├── videos/         # Demo videos
│   └── profile-photo.jpg
├── src/
│   ├── components/
│   │   ├── layout/     # Layout components (Navbar, Footer, etc.)
│   │   └── sections/   # Main section components (Hero, About, Projects, etc.)
│   ├── context/        # React context providers
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── assets/         # Static assets (images, icons, etc.)
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── postcss.config.js
```

## 🎨 Key Components

- **Hero Section**: Dynamic introduction with typewriter effect
- **About**: Professional background and skills
- **Projects**: Showcase of work with interactive previews
- **Skills**: Visual representation of technical abilities
- **Contact**: Interactive contact form with EmailJS integration

## 🌟 Special Features

1. **Tech-Themed Design**
   - Circuit board patterns
   - Matrix-style animations
   - Glowing effects

2. **Interactive Elements**
   - Custom cursor effects
   - Scroll progress indicator
   - Console-style interface
   - Force-directed graph visualization for skills
   - Typewriter animations

3. **Performance Optimizations**
   - Lazy loading
   - Optimized animations
   - Efficient asset management

## 📧 Contact

Jay Jobanputra
- Email: jayjobanputra007@gmail.com
- LinkedIn: [Jay Jobanputra](https://www.linkedin.com/in/jay-jobanputra-1b442931b)
- Location: Kopargoan, Maharashtra, India

## 🔑 Environment Variables

Create a `.env` file in the root directory (same level as `package.json`) with the following variables:

```env
REACT_APP_EMAILJS_USER_ID=your_user_id
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
```

**Note:** Make sure to add `.env` to your `.gitignore` file to keep your credentials secure.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📌 Version

Current version: 0.1.0

---

**Note:** This portfolio is continuously being updated with new features and improvements. Feel free to check back for updates!
