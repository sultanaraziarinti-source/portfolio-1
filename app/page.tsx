"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ── DATA ─────────────────────────────────────── */
const SKILLS = [
  { name: "Android Development", icon: "🤖", level: 90, color: "#2563EB", bg: "#EFF6FF" },
  { name: "JavaScript",          icon: "⚡", level: 88, color: "#D97706", bg: "#FFFBEB" },
  { name: "UI/UX Design",        icon: "🎨", level: 85, color: "#DB2777", bg: "#FDF2F8" },
  { name: "Python",              icon: "🐍", level: 82, color: "#059669", bg: "#ECFDF5" },
  { name: "Data Science",        icon: "📊", level: 78, color: "#7C3AED", bg: "#F5F3FF" },
  { name: "Google Analytics",    icon: "📈", level: 86, color: "#EA580C", bg: "#FFF7ED" },
];

const PROJECTS = [
  {
    title: "NextDoor Daily Shop",
    subtitle: "E-Commerce Web App",
    desc: "A fully functional e-commerce platform built with Next.js and TypeScript. Features user authentication, product filtering, cart management, and Google Analytics event tracking.",
    tags: ["Next.js", "TypeScript", "Google Analytics", "Tailwind CSS"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    color: "#2563EB",
    live: "https://nextdoor-olive.vercel.app",
  },
  {
    title: "Daily Shop",
    subtitle: "Responsive Shopping Site",
    desc: "A clean HTML/CSS/JS shopping website with login, product catalogue, cart sidebar, mobile bottom navigation, and GA4 event tracking integration.",
    tags: ["JavaScript", "HTML/CSS", "UI/UX", "Google Analytics"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    color: "#DB2777",
    live: "https://daily-shop-brown.vercel.app",
  },
  {
    title: "Android Shopping App",
    subtitle: "Native Mobile Application",
    desc: "A native Android e-commerce app developed in Java. Includes product listing, cart system, user profile, and a modern Material Design UI for seamless mobile shopping.",
    tags: ["Android", "Java", "Material Design", "Firebase"],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
    color: "#059669",
    live: "#",
  },
  {
    title: "Data Analytics Dashboard",
    subtitle: "Python Data Visualisation",
    desc: "An interactive analytics dashboard built with Python, Pandas, and Matplotlib. Displays user behaviour patterns, sales trends, and KPIs in real time.",
    tags: ["Python", "Pandas", "Matplotlib", "Data Science"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    color: "#7C3AED",
    live: "#",
  },
];

const EXPERIENCE = [
  { year: "2024 – Present", role: "Full Stack Developer", company: "Freelance", desc: "Building web and mobile applications for clients using Next.js, React, and Android." },
  { year: "2023 – 2024",   role: "UI/UX Designer & Developer", company: "Digital Agency", desc: "Designed and developed responsive web interfaces with a focus on user experience and accessibility." },
  { year: "2022 – 2023",   role: "Android Developer", company: "Tech Startup", desc: "Developed native Android applications in Java/Kotlin with Firebase backend integration." },
];

const WORDS = ["Android Developer", "JavaScript Engineer", "UI/UX Designer", "Python Developer", "Data Scientist", "Analytics Expert"];

/* ── COMPONENT ────────────────────────────────── */
export default function Portfolio() {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [bars, setBars] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* active nav link */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    ["home","about","skills","projects","experience","contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* typewriter */
  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 85);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === word.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % WORDS.length);
    }
  }, [displayed, deleting, wordIdx]);

  /* skill bars on scroll */
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setBars(true); }, { threshold: 0.3 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => { setNav(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const NAV_LINKS = ["home", "about", "skills", "projects", "experience", "contact"];

  return (
    <div style={{ background: "#fff", color: "#111827" }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none",
        borderBottom: scrolled ? "1px solid #F3F4F6" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "14px" }}>SRS</div>
            <span style={{ fontWeight: 800, fontSize: "16px", color: "#111827" }}>Sultana Razia</span>
          </div>
          <nav className="hidden md:flex" style={{ gap: "4px" }}>
            {NAV_LINKS.map(n => (
              <button key={n} onClick={() => go(n)} style={{
                padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "14px", textTransform: "capitalize", transition: "all 0.2s",
                background: activeSection === n ? "#EFF6FF" : "transparent",
                color: activeSection === n ? "#2563EB" : "#6B7280",
              }}>
                {n}
              </button>
            ))}
          </nav>
          <button onClick={() => go("contact")} className="hidden md:block" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>
            Hire Me →
          </button>
          <button onClick={() => setNav(o => !o)} className="md:hidden" style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#374151" }}>
            {nav ? "✕" : "☰"}
          </button>
        </div>
        {nav && (
          <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: "4px", borderTop: "1px solid #F3F4F6" }}>
            {NAV_LINKS.map(n => (
              <button key={n} onClick={() => go(n)} style={{ padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === n ? "#EFF6FF" : "transparent", color: activeSection === n ? "#2563EB" : "#374151", fontWeight: 700, fontSize: "15px", cursor: "pointer", textAlign: "left", textTransform: "capitalize" }}>
                {n}
              </button>
            ))}
            <button onClick={() => go("contact")} style={{ marginTop: "8px", background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>
              Hire Me →
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "88px 20px 60px", background: "linear-gradient(160deg,#f8faff 0%,#f0f4ff 40%,#fdf0f8 100%)", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(37,99,235,0.06)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(219,39,119,0.05)", filter: "blur(50px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }} className="hero-grid">
          {/* Text */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
              <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 600 }}>Available for freelance work</span>
            </div>
            <h1 style={{ fontSize: "clamp(38px,5vw,68px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "12px", color: "#111827" }}>
              Sultana Razia<br /><span className="grad-text">Sharmin</span>
            </h1>
            <div style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: "#6B7280", marginBottom: "24px", minHeight: "32px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#2563EB" }}>{displayed}</span>
              <span style={{ display: "inline-block", width: "2px", height: "24px", background: "#2563EB", borderRadius: "2px", animation: "fadeUp 0.5s ease infinite alternate" }} />
            </div>
            <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: 1.8, maxWidth: "480px", marginBottom: "40px" }}>
              I build beautiful digital products — from native Android apps to data-driven web platforms. Specialising in clean UI/UX, Python analytics, and Google Analytics integration.
            </p>
            <div className="hero-btns">
              <button onClick={() => go("projects")} style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}>
                View Projects →
              </button>
              <a href="/resume" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#2563EB", border: "2px solid #2563EB", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", textDecoration: "none" }}>
                ⬇ Download CV
              </a>
              <button onClick={() => go("contact")} style={{ background: "transparent", color: "#374151", border: "2px solid #E5E7EB", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                Contact Me
              </button>
            </div>
            {/* Stats */}
            <div className="stats-bar" style={{ gap: "0" }}>
              {[["3+", "Years Exp."], ["10+", "Projects"], ["6", "Skills"], ["2", "Live Apps"]].map(([n, l], i) => (
                <div key={l} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? "1px solid #E5E7EB" : "none", padding: "0 16px" }}>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#2563EB" }}>{n}</div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px", fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="hidden md:flex floating" style={{ justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Ring decoration */}
              <div style={{ position: "absolute", inset: "-16px", borderRadius: "50%", border: "2px dashed rgba(37,99,235,0.2)", animation: "float 8s linear infinite" }} />
              <div style={{ position: "absolute", inset: "-32px", borderRadius: "50%", border: "2px dashed rgba(219,39,119,0.15)" }} />
              {/* Main image */}
              <div style={{ width: "320px", height: "320px", borderRadius: "50%", overflow: "hidden", border: "6px solid #fff", boxShadow: "0 24px 80px rgba(37,99,235,0.18)" }}>
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&h=320&fit=crop&crop=face"
                  alt="Sultana Razia Sharmin"
                  width={320} height={320}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              {/* Floating badges */}
              {[
                { icon: "🤖", label: "Android Dev",  top: "10%",  left: "-80px" },
                { icon: "📊", label: "Data Science", top: "60%",  left: "-90px" },
                { icon: "⚡", label: "JavaScript",   top: "10%",  right: "-80px" },
                { icon: "📈", label: "Analytics",    bottom: "10%", right: "-70px" },
              ].map(({ icon, label, ...pos }) => (
                <div key={label} style={{
                  position: "absolute", ...pos,
                  background: "#fff", border: "1px solid #E5E7EB",
                  borderRadius: "12px", padding: "10px 14px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "12px", fontWeight: 700, color: "#374151",
                  whiteSpace: "nowrap",
                }}>
                  <span>{icon}</span>{label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="about-grid">
          {/* Image side */}
          <div className="about-img-wrap">
            <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.1)" }}>
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=700&fit=crop"
                alt="Working on code"
                width={600} height={700}
                style={{ objectFit: "cover", width: "100%", display: "block" }}
              />
            </div>
            {/* Floating card */}
            <div className="about-float-card">
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#2563EB" }}>10+</div>
              <div style={{ fontSize: "13px", color: "#6B7280", fontWeight: 600, marginTop: "4px" }}>Projects Completed</div>
              <div style={{ display: "flex", gap: "4px", marginTop: "10px" }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: "14px" }}>⭐</span>)}
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="section-tag">About Me</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginTop: "16px", marginBottom: "20px", color: "#111827" }}>
              Passionate Developer &<br /><span className="grad-text">Creative Thinker</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
              Hi! I&apos;m Sultana Razia Sharmin — a multi-disciplinary developer from Bangladesh. I specialise in creating clean, responsive, and accessible digital experiences across mobile and web platforms.
            </p>
            <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>
              With expertise spanning Android development, modern JavaScript frameworks, UI/UX design, Python data science, and Google Analytics — I bring a full-stack perspective to every project I work on.
            </p>
            {/* Info grid */}
            <div className="info-grid" style={{ marginBottom: "32px" }}>
              {[
                ["📛", "Name",     "Sultana Razia Sharmin"],
                ["📧", "Email",    "sultanaraziarinti@gmail.com"],
                ["📍", "Location", "Bangladesh"],
                ["💼", "Status",   "Available for hire"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ background: "#F9FAFB", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 700, marginBottom: "4px" }}>{icon} {label}</div>
                  <div style={{ fontSize: "14px", color: "#111827", fontWeight: 700 }}>{val}</div>
                </div>
              ))}
            </div>
            <button onClick={() => go("contact")} style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 8px 24px rgba(37,99,235,0.25)" }}>
              Let&apos;s Work Together →
            </button>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillsRef} className="section-pad" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-tag">My Skills</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginTop: "16px", color: "#111827" }}>
              What I <span className="grad-text">Specialise In</span>
            </h2>
            <p style={{ color: "#6B7280", marginTop: "12px", fontSize: "16px" }}>Technologies and tools I use to build great products</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "20px" }}>
            {SKILLS.map((s, i) => (
              <div key={s.name} style={{
                background: "#fff", borderRadius: "20px", padding: "28px 32px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.3s, box-shadow 0.3s",
                animationDelay: `${i * 0.1}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "16px", color: "#111827" }}>{s.name}</div>
                    <div style={{ fontSize: "13px", color: s.color, fontWeight: 700, marginTop: "2px" }}>{s.level}% proficiency</div>
                  </div>
                </div>
                <div style={{ background: "#F3F4F6", borderRadius: "50px", height: "8px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: "50px", background: `linear-gradient(90deg,${s.color},${s.color}aa)`,
                    width: bars ? `${s.level}%` : "0%",
                    transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${i * 0.12}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <p style={{ color: "#9CA3AF", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "20px" }}>ALSO EXPERIENCED WITH</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {["Kotlin", "React", "Next.js", "Tailwind CSS", "Firebase", "SQL", "Git", "Figma", "Vercel", "REST APIs"].map(t => (
                <span key={t} style={{ background: "#fff", border: "1px solid #E5E7EB", color: "#374151", padding: "8px 18px", borderRadius: "50px", fontSize: "13px", fontWeight: 600, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-tag">Portfolio</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginTop: "16px", color: "#111827" }}>
              Featured <span className="grad-text">Projects</span>
            </h2>
            <p style={{ color: "#6B7280", marginTop: "12px", fontSize: "16px" }}>Real-world projects I&apos;ve designed and built</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "24px" }}>
            {PROJECTS.map(p => (
              <div key={p.title} style={{
                background: "#fff", borderRadius: "24px", overflow: "hidden",
                border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                transition: "transform 0.3s, box-shadow 0.3s", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}>
                {/* Project image */}
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 40%,${p.color}cc 100%)` }} />
                  <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.05em" }}>{p.subtitle}</div>
                    <div style={{ fontSize: "18px", color: "#fff", fontWeight: 900 }}>{p.title}</div>
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px", flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ background: "#F3F4F6", color: "#374151", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  {p.live !== "#" && (
                    <a href={p.live} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", color: p.color, fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
                      🔗 View Live Site →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section-pad" style={{ background: "#F9FAFB" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-tag">Experience</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginTop: "16px", color: "#111827" }}>
              My <span className="grad-text">Journey</span>
            </h2>
          </div>
          <div className="timeline-wrap">
            <div className="timeline-line" />
            <div className="timeline-items">
              {EXPERIENCE.map((e, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div className="timeline-dot" />
                  <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize: "12px", color: "#2563EB", fontWeight: 700, marginBottom: "8px", background: "#EFF6FF", display: "inline-block", padding: "4px 10px", borderRadius: "6px" }}>{e.year}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>{e.role}</h3>
                    <div style={{ fontSize: "14px", color: "#6B7280", fontWeight: 600, marginBottom: "12px" }}>🏢 {e.company}</div>
                    <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.7 }}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="contact-grid">
          {/* Left info */}
          <div>
            <span className="section-tag">Get In Touch</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, marginTop: "16px", marginBottom: "20px", color: "#111827" }}>
              Let&apos;s Build<br /><span className="grad-text">Something Great</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: 1.8, marginBottom: "40px" }}>
              Whether you have a project idea, a job opportunity, or just want to say hello — I&apos;d love to hear from you. I&apos;m currently available for freelance work and full-time roles.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[["📧", "Email", "sultanaraziarinti@gmail.com", "#2563EB"],
                ["💼", "LinkedIn", "linkedin.com/in/sultana", "#0077B5"],
                ["🐙", "GitHub", "github.com/sultanaraziarinti-source", "#333"],
                ["📍", "Location", "Bangladesh", "#DB2777"]].map(([icon, label, val, color]) => (
                <div key={label} style={{ display: "flex", gap: "16px", alignItems: "center", background: "#F9FAFB", borderRadius: "14px", padding: "16px 20px", border: "1px solid #E5E7EB" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 700 }}>{label}</div>
                    <div style={{ fontSize: "14px", color: color as string, fontWeight: 700 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={e => { e.preventDefault(); alert("Thank you! I'll get back to you soon."); (e.target as HTMLFormElement).reset(); }}
            style={{ background: "#F9FAFB", borderRadius: "24px", padding: "40px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>Send a Message</h3>
            <div className="form-name-grid">
              {[["Full Name", "text", "Jane Doe"], ["Email", "email", "jane@example.com"]].map(([label, type, ph]) => (
                <div key={label}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>{label}</label>
                  <input type={type} placeholder={ph} required
                    style={{ width: "100%", background: "#fff", border: "1px solid #E5E7EB", color: "#111827", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", outline: "none" }}
                    onFocus={e => (e.target.style.borderColor = "#2563EB")}
                    onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>Subject</label>
              <input type="text" placeholder="Project enquiry / Job offer" required
                style={{ width: "100%", background: "#fff", border: "1px solid #E5E7EB", color: "#111827", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", outline: "none" }}
                onFocus={e => (e.target.style.borderColor = "#2563EB")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>Message</label>
              <textarea rows={5} placeholder="Tell me about your project..." required
                style={{ width: "100%", background: "#fff", border: "1px solid #E5E7EB", color: "#111827", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", outline: "none", resize: "vertical" }}
                onFocus={e => (e.target.style.borderColor = "#2563EB")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
            </div>
            <button type="submit" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", border: "none", padding: "16px", borderRadius: "12px", fontWeight: 800, fontSize: "16px", cursor: "pointer", boxShadow: "0 8px 24px rgba(37,99,235,0.25)" }}>
              Send Message →
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111827", padding: "48px 24px", color: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "13px" }}>SRS</div>
              <span style={{ fontWeight: 800, fontSize: "16px" }}>Sultana Razia Sharmin</span>
            </div>
            <p style={{ color: "#6B7280", fontSize: "13px" }}>© 2025 Sultana Razia Sharmin. All rights reserved.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {NAV_LINKS.map(n => (
              <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", color: "#6B7280", fontSize: "13px", cursor: "pointer", textTransform: "capitalize", fontWeight: 600 }}>{n}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
