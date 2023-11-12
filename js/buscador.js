let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioConectado = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));
let cancionesFav = usuarios[buscarUsuario(usuarioConectado)].albumFav;
let musicaSonandoStar = document.getElementById("musicaSonandoStar")
const favorito = false;
const contenedorAlbums = document.getElementById("albums");
let usuarioLogueado = localStorage.getItem("usuarioConectado");
let star = document.querySelectorAll(".estrella");



buscador.addEventListener("keyup", (e) => {
  contenedorAlbums.innerHTML = "";
  albums.forEach((e) => {
    if (e.nombre.toUpperCase().includes(buscador.value.toUpperCase())) {

      contenedorAlbums.innerHTML += `<div class="album">
      <a class="a" href="#">
          <img id="${e.id}" src="${e.loc}" alt="${e.nombre}">
          <i class="${esFavorito(e.id, usuarioLogueado) ? "fas" : "far"} fa-star estrella"></i>
      </a>
    </div>`;
    }
  });
  star = document.querySelectorAll(".estrella");
  agregarEventosEstrellas()
  agregarELsonando()
});






function agregarELsonando() {
  const albumsArr = document.querySelectorAll(".album a img");

  albumsArr.forEach(e => {
    e.addEventListener("click", d => {
      let idAlbm = e.id
      console.log(idAlbm);
      localStorage.setItem("musicaSonando", idAlbm)
      location.href = "./musicaSonando.html"
    })
  })
}



function buscarUsuario(usuarioLogueado) {
  let idx = usuarios.findIndex((e, i) => {
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



function agregarEventosEstrellas() {
  star.forEach(function (star) {
    star.addEventListener("click", () => {

      let idAlbum = star.parentElement.firstChild.nextSibling.id
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
}


musicaSonandoStar.addEventListener("click", d => {
  let idAlbum = musicaSonando
  let idxUsuario = buscarUsuario(usuarioLogueado)
  let estrellaEnAlbum=null

  let idEstrellaEnAlbum = document.querySelector(`[id='${musicaSonando}']`)

  if(idEstrellaEnAlbum!=null){
    estrellaEnAlbum=idEstrellaEnAlbum.nextSibling.nextSibling
  }

  console.log(esFavorito(idAlbum,usuarioLogueado));
  console.log(usuarios);

  if (esFavorito(idAlbum, usuarioLogueado)) {
    let cancionesFavoritas = usuarios[idxUsuario].albumFav.filter((e) => {
      return e != idAlbum;
    });
    usuarios[idxUsuario].albumFav = cancionesFavoritas;
    if (estrellaEnAlbum != null)
      estrellaEnAlbum.classList = "far fa-star estrella"
    musicaSonandoStar.classList = "far fa-star";
  } else {
    console.log("noEsfav");
    usuarios[idxUsuario].albumFav.push(idAlbum);
    if (estrellaEnAlbum != null)
      estrellaEnAlbum.classList = "fas fa-star estrella"
    musicaSonandoStar.classList = "fas fa-star";
  }
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

})