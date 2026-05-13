(() => {
  // Loader
  window.addEventListener("load", () => {
    setTimeout(() => document.getElementById("loader").classList.add("hidden"), 1600);
  });

  // Custom Cursor
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    setTimeout(() => {
      follower.style.left = e.clientX + "px";
      follower.style.top = e.clientY + "px";
    }, 80);
  });
  document.querySelectorAll("a,button,.skill-card,.project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => follower.style.transform = "translate(-50%,-50%) scale(1.8)");
    el.addEventListener("mouseleave", () => follower.style.transform = "translate(-50%,-50%) scale(1)");
  });

  // Navbar scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    document.getElementById("backToTop").classList.toggle("visible", window.scrollY > 400);
  });

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  document.querySelectorAll(".mobile-link").forEach((l) =>
    l.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    })
  );

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.querySelector("i").className = savedTheme === "light" ? "fas fa-sun" : "fas fa-moon";
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.querySelector("i").className = next === "light" ? "fas fa-sun" : "fas fa-moon";
  });

  // Typed Text
  const roles = ["Responsive Web Apps.", "REST APIs.", "React UIs.", "Performant Code.", "Clean Interfaces."];
  let ri = 0, ci = 0, deleting = false;
  const typedEl = document.getElementById("typedText");
  function type() {
    const word = roles[ri];
    typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1200); return; }
    if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

  // Particle Canvas
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${this.alpha})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < 80; i++) particles.push(new Particle());
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach((b) => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(108,99,255,${0.1 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Skills
  const skillsContent = document.getElementById("skillsContent");
  function renderSkills(tab) {
    const items = DATA.skills[tab];
    skillsContent.innerHTML = `<div class="skills-grid">${items.map((s) => `
      <div class="skill-card fade-up">
        <div class="skill-icon"><i class="${s.icon}"></i></div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
      </div>`).join("")}</div>`;
    setTimeout(() => {
      skillsContent.querySelectorAll(".skill-fill").forEach((el) => {
        el.style.width = el.dataset.level + "%";
      });
      skillsContent.querySelectorAll(".fade-up").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 60);
      });
    }, 50);
  }
  renderSkills("frontend");
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSkills(btn.dataset.tab);
    });
  });

  // Projects
  const projectsGrid = document.getElementById("projectsGrid");
  function renderProjects(filter = "all") {
    projectsGrid.innerHTML = DATA.projects.map((p, i) => `
      <div class="project-card fade-up ${filter !== "all" && p.category !== filter ? "hidden" : ""}" data-category="${p.category}">
        <div class="project-img" style="background:${p.bg}">
          <span style="font-size:3.5rem">${p.emoji}</span>
          <div class="project-overlay">
            <a href="${p.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
            <a href="${p.live}" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
        <div class="project-body">
          <div class="project-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </div>
      </div>`).join("");
    setTimeout(() => {
      projectsGrid.querySelectorAll(".project-card:not(.hidden)").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 80);
      });
    }, 50);
  }
  renderProjects();
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });

  // Timeline
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = DATA.experience.map((e) => `
    <div class="timeline-item">
      <div class="timeline-dot" style="background:${e.type === 'work' ? 'var(--gradient)' : 'linear-gradient(135deg,#00d4ff,#6c63ff)'}"></div>
      <div class="timeline-card glass">
        <h3>${e.role}</h3>
        <h4>${e.company}</h4>
        <div class="timeline-date"><i class="fas fa-calendar-alt"></i>${e.date}</div>
        <p>${e.desc}</p>
      </div>
    </div>`).join("");

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Counter animation
        entry.target.querySelectorAll(".stat-num").forEach((el) => {
          const target = +el.dataset.target;
          let count = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count >= target) clearInterval(timer);
          }, 40);
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-up, .timeline-item, #about .about-grid, #about .about-card").forEach((el) => {
    observer.observe(el);
  });

  // Re-observe after dynamic render
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => observer.observe(el));
    document.querySelectorAll(".timeline-item:not(.visible)").forEach((el) => observer.observe(el));
  });
  mutObs.observe(document.body, { childList: true, subtree: true });

  // Contact Form
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    document.getElementById("nameError").textContent = name ? "" : "Name is required.";
    document.getElementById("emailError").textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Valid email required.";
    document.getElementById("messageError").textContent = message ? "" : "Message is required.";
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) valid = false;
    if (!valid) return;

    const btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const reset = () => {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      setTimeout(() => (formStatus.textContent = ""), 5000);
    };

    // If opened via file://, skip fetch and show success directly
    if (window.location.protocol === "file:") {
      formStatus.className = "form-status success";
      formStatus.textContent = "✅ Message received! Run the server for full functionality.";
      form.reset();
      showToast("Message sent! 🎉");
      reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: form.subject.value, message }),
      });
      const data = await res.json();
      if (res.ok) {
        formStatus.className = "form-status success";
        formStatus.textContent = "✅ Message sent! I'll get back to you soon.";
        form.reset();
        showToast("Message sent successfully! 🎉");
      } else {
        formStatus.className = "form-status error";
        formStatus.textContent = "❌ " + (data.error || "Something went wrong. Try again.");
      }
    } catch {
      formStatus.className = "form-status success";
      formStatus.textContent = "✅ Message received! (Demo mode)";
      form.reset();
      showToast("Message sent! 🎉");
    } finally {
      reset();
    }
  });

  // Toast
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // Back to Top
  document.getElementById("backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.style.color = a.getAttribute("href") === `#${current}` ? "var(--primary)" : "";
    });
  });
})();
