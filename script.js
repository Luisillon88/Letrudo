// =====================
// 🌙 TEMA (CLARO / OSCURO)
// =====================
const toggle = document.getElementById("themeToggle");
const body = document.body;

/* cargar preferencia */
let temaGuardado = localStorage.getItem("tema");

if (temaGuardado) {
  body.classList.add(temaGuardado);
  toggle.textContent = temaGuardado === "dark" ? "☀️" : "🌙";
} else {
  body.classList.add("light");
}

/* cambiar tema */
toggle.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    toggle.textContent = "☀️";
    localStorage.setItem("tema", "dark");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    toggle.textContent = "🌙";
    localStorage.setItem("tema", "light");
  }
});


// =====================
// ⚙️ AJUSTES (PANEL)
// =====================
const settingsBtn = document.getElementById("openSettings");
const panel = document.getElementById("settingsPanel");
const closeBtn = document.getElementById("closeSettings");

if (settingsBtn && panel && closeBtn) {
  settingsBtn.addEventListener("click", () => {
    console.log("CLICK DETECTADO");
    panel.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
  });
}

// ==============================
// 🎮 BOTÓN UN JUGADOR (AQUÍ 👇)
// ==============================
const playBtn = document.getElementById("playBtn");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    window.location.href = "modes.html";
  });
}


// =====================
// ✨ PARTÍCULAS (SEGURAS)
// =====================
const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,255,0.8)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "cyan";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// =====================
// 👤 NOMBRE USUARIO
// =====================
const username = document.getElementById("username");
const editBtn = document.getElementById("editName");
const namePanel = document.getElementById("namePanel");
const saveName = document.getElementById("saveName");
const closeName = document.getElementById("closeName");
const input = document.getElementById("nameInput");

// cargar nombre
let savedName = localStorage.getItem("username");

if (savedName) {
  username.textContent = savedName;
}

// abrir panel
editBtn.addEventListener("click", () => {
  namePanel.classList.add("active");
});

// guardar nombre
saveName.addEventListener("click", () => {
  const newName = input.value.trim();

  if (newName !== "") {
    localStorage.setItem("username", newName);
    username.textContent = newName;
    namePanel.classList.remove("active");
  }
});

// cerrar
closeName.addEventListener("click", () => {
  namePanel.classList.remove("active");
});