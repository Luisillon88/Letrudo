// =====================
// CONFIG
// =====================
const modo = localStorage.getItem("modo");
const submodo = localStorage.getItem("submodo");
const size = parseInt(localStorage.getItem("gridSize")) || 10;
const numWords = parseInt(localStorage.getItem("numWords")) || 5;
const isTimer = localStorage.getItem("timer") === "true";

// =====================
// DB (igual que el tuyo)
// =====================
const palabrasDB = {

  futbol: {
    Futbolistas: [
      "MESSI","RONALDO","NEYMAR","MBAPPE","HAALAND","KROOS","MODRIC","VINICIUS","BELLINGHAM","KANE",
      "SALAH","DEBRUYNE","LEWANDOWSKI","GRIEZMANN","PEDRI","MUSIALA","LAUTARO","ALVAREZ","COURTOIS","CASEMIRO",
      "XAVI","INIESTA","PUYOL","RAMOS","PIQUE","SUAREZ","BENZEMA","DI MARIA","ROONEY","BALE"
    ],

    Estadios: [
      "BERNABEU","CAMPNOU","MARACANA","ANFIELD","OLDTRAFFORD","SANSIRO","WEMBLEY","AZTECA","ETIHAD","ALLIANZ",
      "BOMBONERA","MONUMENTAL","METROPOLITANO","EMIRATES","MESTALLA","VELODROME","MARACANA","OLIMPICO","NACIONAL","ARENA"
    ],

    Clubs: [
      "REALMADRID","BARCELONA","LIVERPOOL","MANCHESTERCITY","MANCHESTERUNITED","BAYERN","JUVENTUS","INTER","MILAN","PSG",
      "ARSENAL","CHELSEA","ATLETICO","DORTMUND","PORTO","BENFICA","AJAX","NAPOLI","RIVER","FLAMENGO"
    ]
  },

  f1: {
    Pilotos: [
      "HAMILTON","VERSTAPPEN","ALONSO","LECLERC","PEREZ","NORRIS","RUSSELL","SAINZ","PIASTRI","GASLY",
      "OCON","ALBON","STROLL","TSUNODA","RICCIARDO","BOTTAS","ZHOU","SENNA","PROST","VETTEL"
    ],

    Circuitos: [
      "MONACO","SILVERSTONE","SUZUKA","SPA","MONZA","INTERLAGOS","ZANDVOORT","BAKU","COTA","MEXICO",
      "JEDDAH","CATALUNYA","HUNGARORING","MONTREAL","LASVEGAS","SHANGHAI","IMOLA","SEPANG","VALENCIA","INDIA"
    ],

    Escuderias: [
      "FERRARI","MERCEDES","REDBULL","MCLAREN","ASTONMARTIN","ALPINE","WILLIAMS","HAAS","SAUBER","RB",
      "LOTUS","RENAULT","BRAWN","JORDAN","BENETTON","TYRRELL","MINARDI","BRABHAM","TOROROSSO","FORCEINDIA"
    ]
  },

  paises: {
    Capitales: [
      "MADRID","PARIS","ROMA","MEXICO","BUENOSAIRES","BOGOTA","SANTIAGO","LIMA","QUITO","LISBOA",
      "VIENA","ATENAS","PRAGA","BUDAPEST","OTTAWA","CANBERRA","BERLIN","TOKYO","OSLO","HELSINKI"
    ],

    Ciudades: [
      "TOKYO","LONDRES","BERLIN","BARCELONA","MILAN","MUNICH","MANCHESTER","NEWYORK","LOSANGELES","CHICAGO",
      "TORONTO","SAOPAULO","RIO","MEDELLIN","MONTERREY","OSAKA","SEUL","SIDNEY","DUBAI","ESTAMBUL"
    ]
  },

  normal: {
    Random: [
      // cortas (modo fácil 🔥)
      "SOL","LUNA","MAR","RIO","FLOR","CASA","GATO","PERRO","LUZ","PAN",
      "SAL","DIA","NUBE","ROCA","FUEGO","AGUA","AIRE","HOJA","MESA","SILLA",

      // medianas
      "ARBOL","CIELO","PLAYA","MONTE","RUIDO","COLOR","DULCE","FRUTA","NIEVE","VIENTO",
      "TIERRA","MUSICA","VIAJE","CAMINO","PUERTA","VENTANA","CIUDAD","PUEBLO",

      // largas
      "MONTANA","ELECTRICO","HORIZONTE","UNIVERSO","GALAXIA","ESTRELLA","PLANETA","COMPUTADORA"
    ]
  },

  videojuegos: {
    Juegos: [
      "MINECRAFT","FORTNITE","HALO","ZELDA","MARIO","SONIC","CALLDUTY","ROBLOX","TETRIS","DOOM",
      "FIFA","GTA","VALORANT","OVERWATCH","RESIDENT","POKEMON","METROID","ELDENRING","CYBERPUNK","SKYRIM"
    ]
  },

  escuela: {
    Materias: [
      "MATE","FISICA","QUIMICA","HISTORIA","GEOGRAFIA","BIOLOGIA","ARTE","INGLES","ESPANOL","ETICA"
    ]
  }

};

// =====================
let palabrasJuego = [];
let palabrasEncontradas = [];
let matrizGlobal = [];

// =====================
// OBTENER PALABRAS
// =====================
function obtenerPalabras() {
  let lista = palabrasDB[modo]?.[submodo] || palabrasDB["normal"]["Random"];

  lista = lista.filter(p => p.length <= size && p.length >= 3);

  return [...lista].sort(() => 0.5 - Math.random()).slice(0, numWords);
}

// =====================
// MATRIZ
// =====================
function crearMatriz(size) {
  return Array.from({ length: size }, () => Array(size).fill(""));
}

// =====================
// COLOCAR PALABRAS (MEJORADO)
// =====================
function colocarPalabras(matriz, palabras) {
  const dirs = [[0,1],[1,0],[1,1],[-1,1]];

  let palabrasColocadas = [];

  palabras.forEach(palabra => {
    let placed = false;
    let tries = 0;

    while (!placed && tries < 200) {
      tries++;

      const dir = dirs[Math.floor(Math.random()*dirs.length)];
      const row = Math.floor(Math.random()*size);
      const col = Math.floor(Math.random()*size);

      let ok = true;

      for (let i=0;i<palabra.length;i++){
        const r = row + dir[0]*i;
        const c = col + dir[1]*i;

        if (r<0||c<0||r>=size||c>=size || (matriz[r][c] && matriz[r][c]!==palabra[i])){
          ok=false;
          break;
        }
      }

      if (ok){
        for (let i=0;i<palabra.length;i++){
          const r = row + dir[0]*i;
          const c = col + dir[1]*i;
          matriz[r][c]=palabra[i];
        }
        placed=true;
        palabrasColocadas.push(palabra);
      }
    }
  });

  return palabrasColocadas; // 🔥 SOLO LAS QUE SÍ SE PUDIERON
}

// =====================
// RELLENAR
// =====================
function rellenar(matriz){
  const letras="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      if(!matriz[i][j]){
        matriz[i][j]=letras[Math.floor(Math.random()*letras.length)];
      }
    }
  }
}

// =====================
// GRID (OPTIMIZADO)
// =====================
function pintarGrid(matriz){
  const grid=document.getElementById("grid");
  grid.style.gridTemplateColumns=`repeat(${size},45px)`;
  grid.innerHTML="";

  const fragment = document.createDocumentFragment();

  matriz.forEach((row, i)=>{
    row.forEach((letra, j)=>{
      const div=document.createElement("div");
      div.className="cell";
      div.textContent=letra;
      div.dataset.row = i;
      div.dataset.col = j;
      fragment.appendChild(div);
    });
  });

  grid.appendChild(fragment);
}

// =====================
// LISTA PALABRAS
// =====================
function pintarLista(){
  const cont=document.getElementById("wordList");
  cont.innerHTML="";

  palabrasJuego.forEach(p=>{
    const div=document.createElement("div");
    div.className="word";
    div.id="word-"+p;
    div.textContent = "_ ".repeat(p.length);
    cont.appendChild(div);
  });
}

// =====================
// SELECCIÓN (OPTIMIZADA)
// =====================
let selecting=false;
let selected=[];

function activarSeleccion(){
  const grid = document.getElementById("grid");

  grid.addEventListener("mousedown", e=>{
    if(!e.target.classList.contains("cell")) return;

    selecting=true;
    selected=[];
    limpiarSeleccion();

    e.target.classList.add("selected");
    selected.push(e.target);
  });

  grid.addEventListener("mouseover", e=>{
    if(selecting && e.target.classList.contains("cell")){
      if(!e.target.classList.contains("selected")){
        e.target.classList.add("selected");
        selected.push(e.target);
      }
    }
  });

  document.addEventListener("mouseup", finalizarSeleccion);
}

function limpiarSeleccion(){
  document.querySelectorAll(".cell.selected")
    .forEach(c=>c.classList.remove("selected"));
}

function finalizarSeleccion(){
  if(!selecting) return;
  selecting=false;

  const word=selected.map(c=>c.textContent).join("");
  const reverse=word.split("").reverse().join("");

  const encontrada = palabrasJuego.find(p=>p===word || p===reverse);

  if(encontrada && !palabrasEncontradas.includes(encontrada)){
    palabrasEncontradas.push(encontrada);

    selected.forEach(c=>{
      c.classList.remove("selected");
      c.classList.add("found");
    });

    const w = document.getElementById("word-"+encontrada);
    w.textContent = encontrada;
    w.classList.add("found");

    checkWin(); // 🔥 AQUÍ SE VERIFICA
  } else {
    limpiarSeleccion();
  }

  selected=[];
}

// =====================
// VICTORIA
// =====================
function checkWin() {
  if (palabrasEncontradas.length === palabrasJuego.length) {
    mostrarVictoria();
  }
}

function mostrarVictoria() {
  document.getElementById("winScreen").classList.add("active");
}

function goToModes() {
  window.location.href = "modes.html";
}

// =====================
// TIMER
// =====================
function iniciarTimerSiEsLeyenda() {
  const timerDisplay = document.getElementById("timer");

  if (!isTimer) {
    timerDisplay.classList.add("hidden");
    return;
  }

  timerDisplay.classList.remove("hidden");

  let tiempo = 420;

  const intervalo = setInterval(() => {
    let min = Math.floor(tiempo / 60);
    let seg = tiempo % 60;

    timerDisplay.textContent = `⏱️ ${min}:${seg < 10 ? "0" : ""}${seg}`;

    tiempo--;

    if (tiempo < 0) {
      clearInterval(intervalo);
      alert("⏰ Se acabó el tiempo");
      goToModes();
    }
  }, 1000);
}

// =====================
// INIT
// =====================
function iniciarJuego(){
  palabrasJuego = obtenerPalabras();

  const matriz = crearMatriz(size);

  palabrasJuego = colocarPalabras(matriz, palabrasJuego); // 🔥 IMPORTANTE
  rellenar(matriz);

  matrizGlobal = matriz;

  pintarGrid(matriz);
  pintarLista();
  activarSeleccion();
  iniciarTimerSiEsLeyenda();
}

document.addEventListener("DOMContentLoaded", iniciarJuego);

// =====================
function volver(){
  window.location.href="modes.html";
}