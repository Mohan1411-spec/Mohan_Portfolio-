require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "messages.json");

// ── Email transporter ──────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendEmailAlert(entry) {
  const mailOptions = {
    from: `"Portfolio Alert 🔔" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `📩 New message from ${entry.name} — Portfolio`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#e8e8f0;border-radius:16px;overflow:hidden;border:1px solid #1e1e2e">
        <div style="background:linear-gradient(135deg,#6c63ff,#00d4ff);padding:28px 32px">
          <h1 style="margin:0;font-size:1.4rem;color:#fff">📬 New Portfolio Message</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:0.9rem">Someone reached out via your portfolio contact form</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;color:#888899;font-size:0.85rem;width:90px">Name</td>
              <td style="padding:10px 0;font-weight:600;font-size:0.95rem">${entry.name}</td>
            </tr>
            <tr style="border-top:1px solid #1e1e2e">
              <td style="padding:10px 0;color:#888899;font-size:0.85rem">Email</td>
              <td style="padding:10px 0"><a href="mailto:${entry.email}" style="color:#6c63ff;text-decoration:none;font-weight:600">${entry.email}</a></td>
            </tr>
            <tr style="border-top:1px solid #1e1e2e">
              <td style="padding:10px 0;color:#888899;font-size:0.85rem">Subject</td>
              <td style="padding:10px 0;font-size:0.9rem">${entry.subject || "—"}</td>
            </tr>
            <tr style="border-top:1px solid #1e1e2e">
              <td style="padding:10px 0;color:#888899;font-size:0.85rem;vertical-align:top">Message</td>
              <td style="padding:10px 0;font-size:0.9rem;line-height:1.7;color:#c8c8d8">${entry.message.replace(/\n/g, "<br>")}</td>
            </tr>
            <tr style="border-top:1px solid #1e1e2e">
              <td style="padding:10px 0;color:#888899;font-size:0.85rem">Received</td>
              <td style="padding:10px 0;font-size:0.85rem;color:#888899">${new Date(entry.createdAt).toLocaleString()}</td>
            </tr>
          </table>
          <div style="margin-top:28px;display:flex;gap:12px">
            <a href="mailto:${entry.email}?subject=Re: ${encodeURIComponent(entry.subject || "Your message")}"
              style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#6c63ff,#00d4ff);color:#fff;border-radius:99px;text-decoration:none;font-weight:600;font-size:0.9rem">
              ↩ Reply Now
            </a>
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #1e1e2e;font-size:0.75rem;color:#555566;text-align:center">
          This alert was sent automatically from your portfolio — Mohan Kushwaha
        </div>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email alert sent to", process.env.OWNER_EMAIL);
}

// ── File DB helpers ────────────────────────────────────────────
function loadMessages() {
  if (!fs.existsSync(DB_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(DB_FILE, "utf-8")); } catch { return []; }
}
function saveMessages(messages) {
  fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2));
}

// ── Middleware ─────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

// ── Routes ─────────────────────────────────────────────────────

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Name, email, and message are required." });

  const messages = loadMessages();
  const entry = {
    id: Date.now(), name, email,
    subject: subject || "", message,
    createdAt: new Date().toISOString(),
  };
  messages.push(entry);
  saveMessages(messages);
  console.log("📩 New message from:", name, `<${email}>`);

  // Send email alert (non-blocking — don't fail if email fails)
  sendEmailAlert(entry).catch((err) =>
    console.error("⚠️  Email alert failed:", err.message)
  );

  res.status(201).json({ success: true, message: "Message received!" });
});

// GET /api/messages
app.get("/api/messages", (req, res) => {
  const messages = loadMessages();
  res.json({ count: messages.length, messages });
});

// DELETE /api/messages/:id
app.delete("/api/messages/:id", (req, res) => {
  let messages = loadMessages();
  messages = messages.filter((m) => m.id !== Number(req.params.id));
  saveMessages(messages);
  res.json({ success: true });
});

// GET /api/health
app.get("/api/health", (_, res) =>
  res.json({ status: "ok", uptime: process.uptime(), emailConfigured: !!process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD !== "your_16_char_app_password_here" })
);

// Admin panel
app.get("/admin", (_, res) =>
  res.sendFile(path.join(__dirname, "..", "admin.html"))
);

// Fallback
app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "..", "index.html"))
);

app.listen(PORT, () => {
  const emailReady = process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD !== "your_16_char_app_password_here";
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
  console.log(`🔐 Admin panel at  http://localhost:${PORT}/admin`);
  console.log(`📧 Email alerts: ${emailReady ? "✅ Configured" : "⚠️  Not configured — update .env"}`);
});
