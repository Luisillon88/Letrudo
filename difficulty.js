const body = document.body;
const tema = localStorage.getItem("tema");
if (tema) body.classList.add(tema);
else body.classList.add("light");

function selectDiff(size, words, timer = false) {
  localStorage.setItem("gridSize", size);
  localStorage.setItem("numWords", words);
  localStorage.setItem("timer", timer);

  window.location.href = "game.html";
}

document.getElementById("username").textContent =
  localStorage.getItem("username") || "Jugador";

function goBack() {
  window.history.back();
}