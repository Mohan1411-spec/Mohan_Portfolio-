# Mohan_Portfolio-
🌐 Personal portfolio website showcasing my projects, skills, and experience  as a Web Developer. Built with HTML5, CSS3, and JavaScript. Features my work  in React.js, Node.js, and REST API integration.  🔗 Live: https://voluble-rugelach-bfe991.netlify.app/
# 🚀 Mohan Kushwaha — Developer Portfolio

A full-stack personal portfolio web application built with **HTML5, CSS3, JavaScript, Node.js & Express**.  
Live demo → [neon-lokum922b45.netlify.app](https://neon-lokum922b45.netlify.app)

---

## 📸 Preview

| Section | Features |
|---|---|
| Hero | Particle canvas, typewriter effect, animated orbit rings |
| About | Animated counters, stats, downloadable resume |
| Skills | Tabbed skill cards with animated progress bars |
| Projects | Filterable project grid with live demo links |
| Experience | Animated scroll timeline |
| Certifications | Achievement cards |
| Contact | Validated form → email alert to owner |
| Admin | Password-protected inbox dashboard |

---

## 🗂️ Project Structure

```
portfolio web/
├── index.html              # Main portfolio page
├── admin.html              # Admin message inbox
├── css/
│   └── style.css           # All styles (dark/light theme, animations)
├── js/
│   ├── data.js             # Portfolio content (skills, projects, experience)
│   └── app.js              # All interactivity & frontend logic
├── server/
│   ├── server.js           # Express backend
│   └── messages.json       # Persisted contact messages (auto-created)
├── assets/
│   └── resume.pdf          # Your resume (drop it here)
├── .env                    # Environment variables (never commit this)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome 6, Google Fonts (Inter, Fira Code)
- Particle canvas animation, CSS glassmorphism

**Backend**
- Node.js + Express.js
- Nodemailer (Gmail email alerts)
- File-based JSON storage (no DB required)

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Mohan1411-spec/portfolio-web.git
cd portfolio-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
PORT=3000
OWNER_EMAIL=rohankush019@gmail.com
GMAIL_USER=rohankush019@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

> **How to get Gmail App Password:**
> 1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 2. Enable 2-Step Verification first if not done
> 3. Type app name → `portfolio` → Click **Create**
> 4. Copy the 16-character password → paste in `.env`

### 4. Run the server

```bash
npm start
```

| URL | Description |
|---|---|
| `http://localhost:3000` | Portfolio |
| `http://localhost:3000/admin` | Admin message inbox |
| `http://localhost:3000/api/health` | Server health check |

---

## 📬 Contact Form & Email Alerts

When someone submits the contact form:
1. Message is saved to `server/messages.json`
2. An email alert is sent instantly to `rohankush019@gmail.com`
3. Email includes name, email, subject, message + a **Reply Now** button

If the server is not running (static/file mode), the form still works in demo mode.

---

## 🔐 Admin Panel

Visit `/admin` → enter password → view all messages.

**Default password:** `mohan@admin123`  
To change it, edit line 1 of `admin.html`:
```js
const ADMIN_PASS = "your_new_password";
```

**Admin features:**
- 📊 Stats — total / today / this week
- 🔍 Search messages
- 📧 Reply directly via email client
- 🗑️ Delete messages

---

## 🎨 Customization

All portfolio content lives in `js/data.js` — edit skills, projects, and experience there.

**To update projects:**
```js
{
  title: "Project Name",
  desc: "Description...",
  tags: ["React", "Node.js"],
  category: "fullstack",   // fullstack | frontend | backend
  emoji: "🚀",
  bg: "linear-gradient(135deg,#color1,#color2)",
  github: "https://github.com/...",
  live: "https://your-live-url.com",
}
```

**To add your resume:** Drop `resume.pdf` into the `assets/` folder.

---

## 🌐 Deployment

### Deploy frontend to Netlify
```bash
# Just drag & drop the portfolio web folder to netlify.com/drop
# OR connect your GitHub repo
```

### Deploy backend to Render / Railway
1. Push to GitHub
2. Connect repo on [render.com](https://render.com) or [railway.app](https://railway.app)
3. Set environment variables in the dashboard
4. Start command: `npm start`

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/messages` | Get all messages (admin) |
| `DELETE` | `/api/messages/:id` | Delete a message |
| `GET` | `/api/health` | Server health check |

---

## 📦 Scripts

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-restart)
```

---

## 🙋‍♂️ Author

**Mohan Kushwaha**  
📧 rohankush019@gmail.com  
📞 +91 8527778981  
📍 Ghaziabad, Uttar Pradesh  
🔗 [github.com/Mohan1411-spec](https://github.com/Mohan1411-spec)  
🌐 [neon-lokum922b45.netlify.app](https://neon-lokum922b45.netlify.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
