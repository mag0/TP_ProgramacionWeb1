let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioConectado = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));

let cancionesFav = usuarios[buscarUsuario(usuarioConectado)].canFav;

const favorito = false;
const contenedorAlbums = document.getElementById("albums");
let usuarioLogueado = localStorage.getItem("usuarioConectado");

for (let i = 0; i < albums.length; i++) {
  let idAlbum = albums[i].id;
  if (!esFavorito(idAlbum, "jose")) {
    contenedorAlbums.innerHTML += `<div id="${idAlbum}" class="album">
  <a class="a" href="#">
      <img onClick = 'location.href = "./musicaSonando.html"' id="imagine_dragons" src="${albums[i].loc}" alt="">
      <i class="far fa-star estrella"></i>
  </a>
</div>`;
  } else {
    contenedorAlbums.innerHTML += `<div id="${idAlbum}" class="album">
  <a class="a" href="#">
      <img onClick = 'location.href = "./musicaSonando.html"' id="imagine_dragons" src="${albums[i].loc}" alt="">
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

    if (esFavorito(idAlbum, usuarioLogueado)) {
      let cancionesFavoritas = usuarios[idxUsuario].canFav.filter((e) => {
        console.log(e);
        return e != idAlbum;
      });
      usuarios[idxUsuario].canFav = cancionesFavoritas;
      star.classList = "far fa-star estrella";
    } else {
      usuarios[idxUsuario].canFav.push(idAlbum);
      star.classList = "fas fa-star estrella";
    }
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
