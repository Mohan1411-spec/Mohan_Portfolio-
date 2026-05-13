const DATA = {
  skills: {
    frontend: [
      { name: "React.js", icon: "fab fa-react", level: 88 },
      { name: "JavaScript ES6+", icon: "fab fa-js", level: 90 },
      { name: "HTML5", icon: "fab fa-html5", level: 95 },
      { name: "CSS3", icon: "fab fa-css3-alt", level: 92 },
      { name: "Responsive Design", icon: "fas fa-mobile-alt", level: 90 },
      { name: "DOM Manipulation", icon: "fas fa-sitemap", level: 85 },
      { name: "UI/UX Principles", icon: "fas fa-paint-brush", level: 78 },
      { name: "Cross-Browser Compat.", icon: "fas fa-globe", level: 85 },
    ],
    backend: [
      { name: "Node.js", icon: "fab fa-node-js", level: 82 },
      { name: "Express.js", icon: "fas fa-server", level: 80 },
      { name: "REST API Integration", icon: "fas fa-plug", level: 88 },
      { name: "API Design", icon: "fas fa-project-diagram", level: 78 },
    ],
    database: [
      { name: "MongoDB", icon: "fas fa-database", level: 75 },
      { name: "MySQL", icon: "fas fa-table", level: 72 },
    ],
    tools: [
      { name: "Git", icon: "fab fa-git-alt", level: 88 },
      { name: "GitHub", icon: "fab fa-github", level: 90 },
      { name: "VS Code", icon: "fas fa-code", level: 95 },
      { name: "npm", icon: "fab fa-npm", level: 85 },
    ],
  },

  projects: [
    {
      title: "Keylogger Detection App",
      desc: "Web-based security application to detect and monitor suspicious keylogging activity using JavaScript and Node.js. Real-time keyboard input monitoring with live alerts and accessible UI.",
      tags: ["JavaScript", "Node.js", "Security"],
      category: "backend",
      emoji: "🔐",
      bg: "linear-gradient(135deg,#1b1b2f,#c31432)",
      github: "https://github.com/Mohan1411-spec",
      live: "https://fastidious-bavarois-5bb793.netlify.app/",
    },
    {
      title: "Weather Forecast App",
      desc: "Fully responsive, mobile-first weather app integrating OpenWeatherMap REST API to display real-time temperature, humidity, and conditions. Optimized DOM rendering for fast load times.",
      tags: ["HTML5", "CSS3", "JavaScript", "REST API"],
      category: "frontend",
      emoji: "🌤️",
      bg: "linear-gradient(135deg,#1e3c72,#2a5298)",
      github: "https://github.com/Mohan1411-spec",
      live: "https://courageous-cobbler-0f069b.netlify.app/",
    },
    {
      title: "Chatbot Web Application",
      desc: "Real-time chatbot interface with smooth, responsive chat UI. Integrated API-based dynamic response system for contextual conversation flow. Full cross-browser compatibility.",
      tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "API"],
      category: "fullstack",
      emoji: "🤖",
      bg: "linear-gradient(135deg,#0f3460,#533483)",
      github: "https://github.com/Mohan1411-spec",
      live: "#",
    },
  ],

  experience: [
    {
      role: "Software Engineering Intern",
      company: "Flexsin Inc.",
      date: "2026 – Present",
      type: "work",
      desc: "Developed and maintained responsive web interfaces using React.js and JavaScript (ES6+). Integrated REST APIs with Node.js backend services, improving data-fetching efficiency. Collaborated with senior developers and QA teams to debug cross-browser issues and ensure consistent performance.",
    },
    {
      role: "B.Tech — Computer Science Engineering",
      company: "AKTU, Lucknow",
      date: "2023 – 2027",
      type: "education",
      desc: "Dr. A.P.J. Abdul Kalam Technical University. CGPA: 7.8. Focused on web development, data structures, algorithms, and software engineering principles.",
    },
    {
      role: "Higher Secondary (12th Grade)",
      company: "GMNR Inter College, UP",
      date: "2022",
      type: "education",
      desc: "Scored 74.6%. Strong foundation in Mathematics and Computer Science.",
    },
  ],
};
