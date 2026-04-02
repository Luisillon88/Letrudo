// aplicar tema
const body = document.body;
const tema = localStorage.getItem("tema");

if (tema) body.classList.add(tema);
else body.classList.add("light");

// guardar modo y avanzar
function selectMode(mode) {
  localStorage.setItem("modo", mode);
  window.location.href = "submodes.html";
}

document.getElementById("username").textContent =
  localStorage.getItem("username") || "Jugador";

function goBack() {
  window.location.href="index.html";
}