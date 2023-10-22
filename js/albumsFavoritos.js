let usuarios = [
  { nombre: "jose", contrasenia: "1234", canFav: [1, 2, 3, 4] },
  { nombre: "messi", contrasenia: "1234", canFav: [] },
];

let albums = [
  { id: 1, nombre: "imagine_dragons" },
  { id: 2, nombre: "imagine_dragons" },
  { id: 3, nombre: "imagine_dragons" },
  { id: 4, nombre: "imagine_dragons" },
  { id: 5, nombre: "imagine_dragons" },
  { id: 6, nombre: "imagine_dragons" },
  { id: 7, nombre: "imagine_dragons" },
];

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
        <img id="imagine_dragons" src="../img/albums/${albums[i].nombre}.jpg" alt="">
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

    console.log(usuarios[idxUsuario].canFav);
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
