// let usuarios = [
//   { nombre: "jose", contrasenia: "1234", canFav: [1, 2, 3, 4] },
//   { nombre: "messi", contrasenia: "1234", canFav: [] },
// ];

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

let albums = JSON.parse(localStorage.getItem("albums"));

let canciones = [
  { id: 1, nombre: "cancion1" },
  { id: 2, nombre: "cancion2" },
];
let cancionesFav = [1];
const favorito = false;
const contenedorAlbums = document.getElementById("albums");
let usuarioLogueado = "jose;";

for (let i = 0; i < albums.length; i++) {
  let idAlbum = albums[i].id;
  if (esFavorito(idAlbum, usuarioLogueado)) {
    contenedorAlbums.innerHTML += `<div id="${idAlbum}" class="album">
    <a class="a" href="#">
        <img onClick = 'location.href = "./musicaSonando.html"' id="imagine_dragons" src="${albums[i].loc}" alt="${albums[i].nombre}">
        <i class="fas fa-star estrella"></i>
    </a>
  </div>`;
  }
}

const star = document.querySelectorAll(".estrella");

star.forEach(function (star) {
  star.addEventListener("click", () => {
    let idAlbum = star.parentNode.parentNode.id;
    let idxUsuario = buscarUsuario(usuarioLogueado);

    let cancionesFavoritas = usuarios[idxUsuario].canFav.filter((e) => {
      return e != idAlbum;
    });
    usuarios[idxUsuario].canFav = cancionesFavoritas;
    star.classList = "far fa-star estrella";
    star.parentNode.parentNode.remove();
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  });
});

function buscarUsuario(usuarioLogueado) {
  return usuarios.findIndex((e) => {
    return (e.usuarioLogueado = usuarioLogueado);
  });
}

function esFavorito(id, usuarioLogueado) {
  let idx = buscarUsuario(usuarioLogueado);

  for (let i = 0; i < usuarios[idx].canFav.length; i++) {
    if (usuarios[idx].canFav[i] == id) {
      return true;
    }
  }
  return false;
}
