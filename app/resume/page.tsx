"use client";

export default function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        /* ── PRINT — full A4, same font sizes as screen ── */
        @media print {
          .no-print { display: none !important; }

          html, body {
            margin: 0 !important; padding: 0 !important;
            width: 210mm !important; height: 297mm !important;
            background: #fff !important;
            overflow: hidden !important;
          }

          .page-wrapper {
            padding: 0 !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            background: #fff !important;
          }

          /* Card = exact A4, flex column */
          .resume-card {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }

          /* Header — tighten padding only, keep font sizes */
          .resume-header { padding: 18px 24px !important; flex-shrink: 0 !important; }
          .resume-contacts { margin-top: 8px !important; gap: 10px !important; }
          .resume-avatar { width: 62px !important; height: 62px !important; }

          /* Body fills remaining height */
          .resume-body {
            display: grid !important;
            grid-template-columns: 200px 1fr !important;
            flex: 1 !important;
            min-height: 0 !important;
            align-items: stretch !important;
          }

          /* Columns fill full height, spread sections */
          .resume-col-left {
            padding: 18px 18px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            overflow: hidden !important;
          }

          .resume-col-right {
            padding: 18px 22px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            overflow: hidden !important;
          }

          /* Let flex spacing handle gaps instead of margins */
          .resume-col-left > div { margin-bottom: 0 !important; }
          .resume-col-right > div { margin-bottom: 0 !important; }

          /* Tighten section title spacing only */
          .sec-title { margin-bottom: 2px !important; }
          .sec-line  { margin-bottom: 8px !important; }

          /* Tighten skill bar spacing */
          .skill-row { margin-bottom: 7px !important; }

          /* Tighten experience spacing */
          .exp-card { margin-bottom: 0 !important; }
          .exp-list { margin-top: 4px !important; }
          .exp-list li { margin-bottom: 2px !important; }

          /* Tighten education spacing */
          .edu-card { margin-bottom: 0 !important; }

          /* Tighten language spacing */
          .lang-row { margin-bottom: 5px !important; }
        }
        @page { margin: 0; size: A4 portrait; }

        /* ── BASE ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', Arial, sans-serif; background: #F1F5F9; }

        /* ── TOP BAR ── */
        .top-bar {
          position: sticky; top: 0; z-index: 100;
          background: #1E293B;
          padding: 12px 20px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          flex-wrap: wrap;
        }
        .top-bar-title { color: #fff; font-weight: 700; font-size: 14px; }
        .top-bar-actions { display: flex; gap: 10px; flex-shrink: 0; }
        .btn-back {
          color: #94A3B8; font-size: 13px; font-weight: 600;
          text-decoration: none; padding: 8px 14px;
          border-radius: 8px; border: 1px solid #334155;
          white-space: nowrap;
        }
        .btn-download {
          background: linear-gradient(135deg,#2563EB,#7C3AED);
          color: #fff; border: none; padding: 8px 18px;
          border-radius: 8px; font-weight: 700; font-size: 13px;
          cursor: pointer; white-space: nowrap;
        }

        /* ── OUTER WRAPPER ── */
        .page-wrapper { background: #F1F5F9; min-height: 100vh; padding: 24px 12px; }

        /* ── RESUME CARD ── */
        .resume-card {
          max-width: 860px; margin: 0 auto;
          background: #fff;
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          border-radius: 6px;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .resume-header {
          background: linear-gradient(135deg,#2563EB 0%,#7C3AED 60%,#DB2777 100%);
          padding: 40px 40px 32px;
          color: #fff;
        }
        .resume-header-inner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
        }
        .resume-header h1 { font-size: 32px; font-weight: 900; letter-spacing: -0.5px; }
        .resume-header-sub { font-size: 14px; color: rgba(255,255,255,0.85); margin-top: 6px; font-weight: 600; }
        .resume-contacts { display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
        .resume-contacts span { font-size: 12px; color: rgba(255,255,255,0.85); display: flex; align-items: center; gap: 5px; }
        .resume-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          border: 4px solid rgba(255,255,255,0.35);
          overflow: hidden; flex-shrink: 0;
        }
        .resume-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── BODY GRID ── */
        .resume-body {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
        }

        /* ── LEFT COLUMN ── */
        .resume-col-left {
          background: #F8FAFF;
          padding: 32px 28px;
          border-right: 1px solid #E5E7EB;
        }

        /* ── RIGHT COLUMN ── */
        .resume-col-right { padding: 32px 36px; }

        /* ── SECTION TITLE ── */
        .sec-title {
          font-size: 11px; font-weight: 900; letter-spacing: 0.1em;
          text-transform: uppercase; color: #374151; margin-bottom: 4px;
        }
        .sec-title.accent { color: #2563EB; }
        .sec-line { height: 2px; width: 28px; background: #D1D5DB; border-radius: 2px; margin-bottom: 16px; }
        .sec-line.accent { background: linear-gradient(90deg,#2563EB,#7C3AED); }

        /* ── SKILL BAR ── */
        .skill-row { margin-bottom: 13px; }
        .skill-label { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .skill-label span:first-child { font-size: 12px; font-weight: 700; color: #374151; }
        .skill-track { background: #E5E7EB; border-radius: 50px; height: 6px; }
        .skill-fill { height: 100%; border-radius: 50px; }

        /* ── TECH TAGS ── */
        .tech-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .tech-tag { background: #EFF6FF; color: #2563EB; padding: 3px 9px; border-radius: 5px; font-size: 11px; font-weight: 700; }

        /* ── LANGUAGE ROW ── */
        .lang-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
        .lang-row span:first-child { font-weight: 700; color: #374151; }
        .lang-row span:last-child { color: #9CA3AF; font-weight: 600; }

        /* ── EXP CARD ── */
        .exp-card { margin-bottom: 22px; padding-left: 14px; border-left: 3px solid #2563EB; }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; gap: 8px; flex-wrap: wrap; }
        .exp-role { font-size: 14px; font-weight: 800; color: #111827; }
        .exp-company { font-size: 12px; color: #6B7280; font-weight: 600; }
        .exp-badge { background: #EFF6FF; color: #2563EB; padding: 2px 8px; border-radius: 5px; font-size: 10px; font-weight: 700; white-space: nowrap; flex-shrink: 0; }
        .exp-list { margin-top: 8px; padding-left: 14px; }
        .exp-list li { font-size: 12px; color: #6B7280; line-height: 1.7; margin-bottom: 2px; }

        /* ── EDU CARD ── */
        .edu-card { margin-bottom: 18px; padding-left: 14px; border-left: 3px solid #7C3AED; }
        .edu-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
        .edu-degree { font-size: 14px; font-weight: 800; color: #111827; }
        .edu-inst { font-size: 12px; color: #6B7280; font-weight: 600; }
        .edu-note { font-size: 11px; color: #9CA3AF; margin-top: 3px; }
        .edu-badge { background: #F5F3FF; color: #7C3AED; padding: 2px 8px; border-radius: 5px; font-size: 10px; font-weight: 700; white-space: nowrap; flex-shrink: 0; }

        /* ── PROJECT ROW ── */
        .proj-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #F3F4F6; gap: 8px; flex-wrap: wrap; }
        .proj-name { font-size: 13px; font-weight: 700; color: #111827; }
        .proj-tech { font-size: 11px; color: #6B7280; }
        .proj-url { font-size: 11px; color: #2563EB; font-weight: 600; word-break: break-all; }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .top-bar-title { font-size: 12px; }
          .resume-header { padding: 24px 20px; }
          .resume-header h1 { font-size: 22px; }
          .resume-header-sub { font-size: 12px; }
          .resume-avatar { width: 60px; height: 60px; }
          .resume-body { grid-template-columns: 1fr; }
          .resume-col-left { border-right: none; border-bottom: 1px solid #E5E7EB; padding: 24px 20px; }
          .resume-col-right { padding: 24px 20px; }
          .resume-contacts { gap: 10px; }
          .resume-contacts span { font-size: 11px; }
          .exp-role, .edu-degree { font-size: 13px; }
        }

        /* ── TABLET ── */
        @media (min-width: 641px) and (max-width: 860px) {
          .resume-body { grid-template-columns: 220px 1fr; }
          .resume-header { padding: 32px 28px; }
          .resume-header h1 { font-size: 26px; }
          .resume-col-left { padding: 28px 20px; }
          .resume-col-right { padding: 28px 24px; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="top-bar no-print">
        <span className="top-bar-title">📄 Sultana Razia Sharmin — CV</span>
        <div className="top-bar-actions">
          <a href="/" className="btn-back">← Back</a>
          <button onClick={handlePrint} className="btn-download">⬇ Download PDF</button>
        </div>
      </div>

      {/* PAGE WRAPPER */}
      <div className="page-wrapper">
        <div className="resume-card">

          {/* HEADER */}
          <div className="resume-header">
            <div className="resume-header-inner">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1>Sultana Razia Sharmin</h1>
                <p className="resume-header-sub">Android Developer · JavaScript · UI/UX Designer · Data Scientist · Google Analytics</p>
                <div className="resume-contacts">
                  {[["📧", "sultanaraziarinti@gmail.com"], ["📍", "Bangladesh"], ["🐙", "github.com/sultanaraziarinti-source"], ["💼", "Available for hire"]].map(([icon, text]) => (
                    <span key={text}>{icon} {text}</span>
                  ))}
                </div>
              </div>
              <div className="resume-avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face" alt="Profile" />
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="resume-body">

            {/* LEFT COLUMN */}
            <div className="resume-col-left">

              {/* Profile */}
              <div style={{ marginBottom: "28px" }}>
                <p className="sec-title">Profile</p>
                <div className="sec-line" />
                <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.8 }}>
                  Multi-disciplinary developer from Bangladesh specialising in Android, JavaScript, UI/UX design, Python data science, and Google Analytics. Passionate about clean, accessible, and data-driven digital experiences.
                </p>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: "28px" }}>
                <p className="sec-title">Skills</p>
                <div className="sec-line" />
                {[
                  { name: "Android Development", level: 90, color: "#2563EB" },
                  { name: "JavaScript",          level: 88, color: "#D97706" },
                  { name: "UI/UX Design",        level: 85, color: "#DB2777" },
                  { name: "Python",              level: 82, color: "#059669" },
                  { name: "Data Science",        level: 78, color: "#7C3AED" },
                  { name: "Google Analytics",    level: 86, color: "#EA580C" },
                ].map(s => (
                  <div key={s.name} className="skill-row">
                    <div className="skill-label">
                      <span>{s.name}</span>
                      <span style={{ color: s.color, fontSize: "11px", fontWeight: 700 }}>{s.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${s.level}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div style={{ marginBottom: "28px" }}>
                <p className="sec-title">Tools & Tech</p>
                <div className="sec-line" />
                <div className="tech-tags">
                  {["Kotlin", "React", "Next.js", "Tailwind CSS", "Firebase", "SQL", "Git", "Figma", "Vercel", "REST APIs", "Pandas", "Matplotlib"].map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="sec-title">Languages</p>
                <div className="sec-line" />
                {[["Bengali", "Native"], ["English", "Professional"]].map(([lang, lvl]) => (
                  <div key={lang} className="lang-row">
                    <span>{lang}</span>
                    <span>{lvl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="resume-col-right">

              {/* Experience */}
              <div style={{ marginBottom: "32px" }}>
                <p className="sec-title accent">Work Experience</p>
                <div className="sec-line accent" />
                {[
                  { year: "2024 – Present", role: "Full Stack Developer", company: "Freelance", points: ["Built Next.js e-commerce platforms with TypeScript and Tailwind CSS", "Integrated Google Analytics 4 event tracking across multiple projects", "Delivered responsive mobile-first designs for clients across 3 countries"] },
                  { year: "2023 – 2024",   role: "UI/UX Designer & Developer", company: "Digital Agency", points: ["Designed and built responsive web interfaces using HTML, CSS, and JavaScript", "Created wireframes and prototypes in Figma for client approval", "Improved user retention by 30% through redesigned onboarding flows"] },
                  { year: "2022 – 2023",   role: "Android Developer", company: "Tech Startup", points: ["Developed native Android apps in Java and Kotlin with Firebase backend", "Built real-time chat and shopping cart features using Firebase Firestore", "Published 2 apps to Google Play Store with 4.5+ star ratings"] },
                ].map(e => (
                  <div key={e.role} className="exp-card">
                    <div className="exp-header">
                      <div>
                        <div className="exp-role">{e.role}</div>
                        <div className="exp-company">🏢 {e.company}</div>
                      </div>
                      <span className="exp-badge">{e.year}</span>
                    </div>
                    <ul className="exp-list">
                      {e.points.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div style={{ marginBottom: "32px" }}>
                <p className="sec-title accent">Education</p>
                <div className="sec-line accent" />
                {[
                  { year: "2019 – 2023", degree: "BSc in Computer Science", institution: "University of Dhaka", note: "Specialisation in Software Engineering & Data Science" },
                  { year: "2017 – 2019", degree: "Higher Secondary Certificate", institution: "Dhaka College", note: "Science — GPA 5.00/5.00" },
                ].map(e => (
                  <div key={e.degree} className="edu-card">
                    <div className="edu-header">
                      <div>
                        <div className="edu-degree">{e.degree}</div>
                        <div className="edu-inst">🎓 {e.institution}</div>
                        <div className="edu-note">{e.note}</div>
                      </div>
                      <span className="edu-badge">{e.year}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div>
                <p className="sec-title accent">Key Projects</p>
                <div className="sec-line accent" />
                {[
                  { name: "NextDoor Daily Shop",       tech: "Next.js · TypeScript · GA4",      url: "nextdoor-olive.vercel.app" },
                  { name: "Daily Shop",                tech: "HTML · CSS · JavaScript · GA4",   url: "daily-shop-brown.vercel.app" },
                  { name: "Android Shopping App",      tech: "Java · Android · Firebase",       url: "Google Play Store" },
                  { name: "Data Analytics Dashboard",  tech: "Python · Pandas · Matplotlib",    url: "Private Repo" },
                ].map(p => (
                  <div key={p.name} className="proj-row">
                    <div>
                      <div className="proj-name">{p.name}</div>
                      <div className="proj-tech">{p.tech}</div>
                    </div>
                    <span className="proj-url">{p.url}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
