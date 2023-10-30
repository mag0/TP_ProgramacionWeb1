// ARCHIVO JAVASCRIPT PRINCIPAL
let usuario = localStorage.getItem("usuarioConectado");
const nombreUsuario = document.getElementById("nombreUsuario");
let musicaSonando = JSON.parse(localStorage.getItem("musicaSonando"));
let cancion_actual_html = document.getElementById("cancion_actual");
nombreUsuario.textContent = usuario;
let albumss = JSON.parse(localStorage.getItem("albums"));
let listaAlbums = document.querySelectorAll(".album");

const cerrarSesion = document.getElementById("cerrarSesion");

cerrarSesion.addEventListener("click", () => {
  localStorage.setItem("conectado", false);
});

if (!musicaSonando) {
  cancion_actual_html.style.display = "none";
} else {
  cancion_actual_html.innerHTML = `<div>
      <img src="${musicaSonando.loc}" alt="${musicaSonando.nombre}">
      <i class="far fa-star"></i>
</div>
<p class="descripcion">
${musicaSonando.nombre}  
</p>`;
}

listaAlbums.forEach((e) => {
  e.addEventListener("click", () => {});
});
