let usuario = localStorage.getItem("usuarioConectado");
const nombreUsuario = document.getElementById("nombreUsuario");
let musicaSonando = localStorage.getItem("musicaSonando");


nombreUsuario.textContent = usuario;
let albumss = JSON.parse(localStorage.getItem("albums"));
let navegador = document.querySelector(".navegador")
let usuarioss = JSON.parse(localStorage.getItem("usuarios"))


const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  localStorage.setItem("conectado", false);
});


function buscarUsr(usuarioLogueado) {
  return usuarioss.findIndex((e) => {
    return (e.usuarioLogueado = usuarioLogueado);
  });
}

function esFavorito(id, usuarioLogueado) {
  let idx = buscarUsr(usuarioLogueado);

  for (let i = 0; i < usuarioss[idx].albumFav.length; i++) {
    if (usuarioss[idx].albumFav[i] == id) {
      return true;
    }
  }
  return false;
}




let album
albumss.forEach(e => {
  if (e.id == musicaSonando)
    album = e
})

if (musicaSonando) {
  navegador.innerHTML += `
  <div class="cancion_actual">
  <div>
    <img src=${album.loc}
     alt="cancion_actual" />
    <i class="${esFavorito(musicaSonando, usuario) ? 'fas' : 'far'} fa-star" id="musicaSonandoStar"></i>
  </div>
  </div>
  <p id="descripcion">
  ${album.nombre}
  </p>
  `
}




function buscarUsr(usuarioLogueado) {
  return usuarioss.findIndex((e) => {
    return (e.usuarioLogueado = usuarioLogueado);
  });
}

function esFav(id, usuarioLogueado) {
  let idx = buscarUsr(usuarioLogueado);

  for (let i = 0; i < usuarioss[idx].albumFav.length; i++) {
    if (usuarioss[idx].albumFav[i] == id) {
      return true;
    }
  }
  return false;
}
