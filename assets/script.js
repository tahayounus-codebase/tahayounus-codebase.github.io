 /* ── SMOOTH SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
 
    /* ── LIGHT / DARK TOGGLE ── */
    const modeBtn = document.getElementById('modeBtn');
    let isLight = false;
    modeBtn.addEventListener('click', () => {
      isLight = !isLight;
      document.body.classList.toggle('light', isLight);
      modeBtn.textContent = isLight ? '🌙 Dark' : '☀ Light';
    });
 
    /* ── SCROLL REVEAL ── */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
 
    document.querySelectorAll('.sr, .sr-l, .sr-r, .sr-s').forEach(el => observer.observe(el));
 
    /* ── PARTICLE BACKGROUND ── */
    const canvas = document.getElementById('bgc');
    const ctx    = canvas.getContext('2d');
    let W, H, particles = [], mx = -999, my = -999;
 
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
 
    const COLORS = ['rgba(120,80,255,', 'rgba(200,240,74,', 'rgba(0,180,255,'];
 
    for (let i = 0; i < 70; i++) {
      particles.push({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 1.4 + 0.4,
        c:  COLORS[i % 3],
        a:  Math.random() * 0.4 + 0.1
      });
    }
 
    (function tick() {
      ctx.clearRect(0, 0, W, H);
 
      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120,80,255,${0.05 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
 
      /* dots */
      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(p.x, p.y, d < 140 ? p.r * 2.5 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + (d < 140 ? 0.5 : p.a) + ')';
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
 
      requestAnimationFrame(tick);
    })();

    const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Ring ko cursor ki position par move karna (with smooth animation)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { 
        duration: 500, // Speed control (jitna zyada, utna smooth follow karega)
        fill: "forwards" 
    });
});

// Interactive elements trigger (Links, Buttons, Cards)
const interactables = document.querySelectorAll("a, button, .project-card, .skill-icon, .nav-links li");

interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover-active");
    });
    el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover-active");
    });
});