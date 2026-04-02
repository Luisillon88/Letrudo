const body = document.body;
const tema = localStorage.getItem("tema");
if (tema) body.classList.add(tema);
else body.classList.add("light");

const menu = document.getElementById("subMenu");
const modo = localStorage.getItem("modo");

const opciones = {
  futbol: ["Futbolistas", "Estadios", "Clubs"],
  f1: ["Pilotos", "Circuitos", "Escuderias"],
  paises: ["Capitales", "Ciudades"],
  normal: ["Random"],
  videojuegos: ["Juegos"],
  escuela: ["Materias"]
};

opciones[modo].forEach(op => {
  const btn = document.createElement("button");
  btn.classList.add("btn", "primary");
  btn.textContent = op;

  btn.onclick = () => {
    localStorage.setItem("submodo", op);
    window.location.href = "difficulty.html";
  };

  const backBtn = document.querySelector(".back-btn");

  menu.insertBefore(btn, backBtn);
});

document.getElementById("username").textContent =
  localStorage.getItem("username") || "Jugador";

function goBack() {
  window.history.back();
}