let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let albums = JSON.parse(localStorage.getItem("albums"));
let usuarioLogueado = localStorage.getItem("usuarioConectado")

const favorito = false;
const contenedorAlbums = document.getElementById("albums");

for (let i = 0; i < albums.length; i++) {
  let idAlbum = albums[i].id;
  if (esFavorito(idAlbum, usuarioLogueado)) {
    contenedorAlbums.innerHTML += `<div id="${idAlbum}" class="album">
    <a class="a" href="#">
        <img  src="${albums[i].loc}" alt="${albums[i].nombre}">
        <i class="fas fa-star estrella"></i>
    </a>
  </div>`;
  }
}

const albumsArr = document.querySelectorAll(".album a img");

albumsArr.forEach(e => {
  e.addEventListener("click", d => {
    let idAlbm = e.parentNode.parentNode.id
    console.log(idAlbm);
    localStorage.setItem("musicaSonando", idAlbm)
    location.href = "./musicaSonando.html"
  })
})

const star = document.querySelectorAll(".estrella");

star.forEach(function (star) {
  star.addEventListener("click", () => {
    let idAlbum = star.parentNode.parentNode.id;
    let idxUsuario = buscarUsuario(usuarioLogueado);

    let cancionesFavoritas = usuarios[idxUsuario].albumFav.filter((e) => {
      return e != idAlbum;
    });
    usuarios[idxUsuario].albumFav = cancionesFavoritas;
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

  for (let i = 0; i < usuarios[idx].albumFav.length; i++) {
    if (usuarios[idx].albumFav[i] == id) {
      return true;
    }
  }
  return false;
}


let musicaSonandoStar = document.getElementById("musicaSonandoStar")


musicaSonandoStar.addEventListener("click", d => {
  let idAlbum = musicaSonando
  let idxUsuario = buscarUsr(usuario)
  if (esFav(idAlbum, usuario)) {
    let cancionesFavoritas = usuarioss[idxUsuario].albumFav.filter((e) => {
      return e != idAlbum;
    });
    usuarioss[idxUsuario].albumFav = cancionesFavoritas;
    musicaSonandoStar.classList = "far fa-star";
  } else {
    usuarioss[idxUsuario].albumFav.push(idAlbum);
    musicaSonandoStar.classList = "fas fa-star";
  }
  localStorage.setItem("usuarios", JSON.stringify(usuarioss));

})