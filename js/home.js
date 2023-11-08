let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioConectado = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));
let cancionesFav = usuarios[buscarUsuario(usuarioConectado)].albumFav;
let musicaSonandoStar = document.getElementById("musicaSonandoStar")
const favorito = false;
const contenedorAlbums = document.getElementById("albums");
let usuarioLogueado = localStorage.getItem("usuarioConectado");

for (let i = 0; i < albums.length; i++) {
  let idAlbum = albums[i].id;
  if (!esFavorito(idAlbum, usuarioLogueado)) {
    contenedorAlbums.innerHTML += `<div id="${idAlbum}" class="album">
  <a class="a" href="#">
      <img src="${albums[i].loc}" alt="">
      <i class="far fa-star estrella"></i>
  </a>
</div>`;
  } else {
    contenedorAlbums.innerHTML += `<div id="${idAlbum}" class="album">
  <a class="a" href="#">
      <img  src="${albums[i].loc}" alt="">
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
      let cancionesFavoritas = usuarios[idxUsuario].albumFav.filter((e) => {
        return e != idAlbum;
      });
      usuarios[idxUsuario].albumFav = cancionesFavoritas;
      star.classList = "far fa-star estrella";
      if (idAlbum == musicaSonando) {
        musicaSonandoStar.classList = "far fa-star";
      }
    } else {
      usuarios[idxUsuario].albumFav.push(idAlbum);
      star.classList = "fas fa-star estrella";
      if (idAlbum == musicaSonando) {
        musicaSonandoStar.classList = "fas fa-star";
      }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  });
});

const albumsArr = document.querySelectorAll(".album a img");

albumsArr.forEach(e => {
  e.addEventListener("click", d => {
    let idAlbm = e.parentNode.parentNode.id
    localStorage.setItem("musicaSonando", idAlbm)
    location.href = "./musicaSonando.html"
  })
})


function buscarUsuario(usuarioLogueado) {
  let idx = usuarios.findIndex((e,i) => {
    return (e.nombre == usuarioLogueado)
  });
  return idx
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





musicaSonandoStar.addEventListener("click", d => {
  let idAlbum = musicaSonando
  let idxUsuario = buscarUsr(usuario)
  let estrellaEnAlbum = document.querySelector(`[id='${musicaSonando}'] a i`)
  if (esFav(idAlbum, usuario)) {
    let cancionesFavoritas = usuarioss[idxUsuario].albumFav.filter((e) => {
      return e != idAlbum;
    });
    usuarioss[idxUsuario].albumFav = cancionesFavoritas;
    estrellaEnAlbum.classList = "far fa-star estrella"
    musicaSonandoStar.classList = "far fa-star";
  } else {
    usuarioss[idxUsuario].albumFav.push(idAlbum);
    estrellaEnAlbum.classList = "fas fa-star estrella"
    musicaSonandoStar.classList = "fas fa-star";
  }
  localStorage.setItem("usuarios", JSON.stringify(usuarioss));

})