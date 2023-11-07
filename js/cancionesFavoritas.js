let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioActivo = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));
let contCanciones = document.querySelector("#tabla")
let musicaSonando = parseInt(localStorage.getItem("musicaSonando"))
if (musicaSonando == null) {
  musicaSonando = 1
}
let navegador = document.querySelector(".navegador")

function esCancionFav(idx) {
  let idxUsr = buscarUsuario(usuarioActivo)
  let siEs = false

  usuarios[idxUsr].canFav.forEach(e => {
    if (e == idx)
      siEs = true
  })
  return siEs
}

function esAlbumFav(idx) {
  let idxUsr = buscarUsuario(usuarioActivo)
  let siEs = false

  usuarios[idxUsr].albumFav.forEach(e => {
    if (e == idx)
      siEs = true
  })
  return siEs
}


function buscarUsuario(usuarioLogueado) {
  return usuarios.findIndex((e) => {
    return (e.usuarioLogueado = usuarioLogueado);
  });
}


function renderizarCanciones() {

  contCanciones.innerHTML = `
  <div class="fila">
  <div class="columna"></div>
  <div class="columna">
      <h4>Canción</h4>
  </div>
  <div class="columna">
      <h4>Album</h4>
  </div>
  <div class="columna">
      <h4>Duracion</h4>
  </div>
  <div class="columna">
      <h4>Reproducciones</h4>
  </div>
</div>

  `
  for (let i = 0; i < canciones.length; i++) {
    let idCancion = canciones[i].id;
    if (esCancionFav(idCancion, usuarioActivo)) {
      contCanciones.innerHTML += ` <div class="fila">
      <div class="columna">
          <a class="contPlay"><i id="playy${canciones[i].album}" class="fas fa-play btnPlay"></i></a>
      </div>
      <div class="columna cancion">
          <p>${canciones[i].nombre}</p>
          <i id=${canciones[i].id} class="${esCancionFav(canciones[i].id) ? 'fas' : 'far'} fa-star starCancion"></i>
      </div>
      <div class="columna cancion">
          <p>${canciones[i].nombreAlbum}</p>
          <i class="album${canciones[i].album} ${esAlbumFav(canciones[i].album) ? 'fas' : 'far'} fa-star starAlbum starr${canciones[i].album}"></i>
          
      </div>
      <div class="columna">
          <p class="durac">${canciones[i].duracion}</p>
      </div>
      <div class="columna">
          <p class="reprod">${canciones[i].reproduccion}</p>
      </div>
  </div>`;
    }
  }

}

renderizarCanciones()

let album
albums.forEach(e => {
  if (e.id == musicaSonando)
    album = e
})

if (musicaSonando) {
  navegador.innerHTML += `
  <div class="cancion_actual">
  <div>
    <img src=${album.loc}
     alt="cancion_actual" />
    <i class="${esAlbumFav(musicaSonando) ? 'fas' : 'far'} fa-star" id="musicaSonandoStar"></i>
  </div>
  </div>
  <p id="descripcion">
  ${album.nombre}
  </p>
  `
}

let estrellasCanciones = document.querySelectorAll(".starCancion")


estrellasCanciones.forEach(e => {
  e.addEventListener("click", event => {
    event.preventDefault()
    quitarCancionDeFav(e.id)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    e.parentNode.parentNode.remove()
  })
})


function agregarCancionAFav(id) {
  let idxUsr = buscarUsuario(usuarioActivo)
  usuarios[idxUsr].canFav.push(id)

}

function quitarCancionDeFav(id) {
  let idxUsr = buscarUsuario(usuarioActivo)
  let arrAlb = usuarios[idxUsr].canFav.filter(e => e != id)
  usuarios[idxUsr].canFav = arrAlb
}




let estrellasAlbums = document.querySelectorAll(".starAlbum")


estrellasAlbums.forEach(e => {
  let idAlbum = extraerIDAlbum(e.className)
  // let estrellaMismoAlbum = document.querySelectorAll(`[class = '${e.id}']`)
  let estrellaMismoAlbum = document.querySelectorAll(`.album${idAlbum}`)
  e.addEventListener("click", event => {
    event.preventDefault()
    if (esAlbumFav(idAlbum)) {
      quitarAlbumFav(idAlbum)

      estrellaMismoAlbum.forEach(e => {
        e.className = `album${idAlbum} far fa-star starAlbum starr${idAlbum}`
      })

      if (idAlbum == musicaSonando) {
        musicaSonandoStar.classList = "far fa-star";
      }
    } else {
      agregarAlbumFav(idAlbum)

      estrellaMismoAlbum.forEach(e => {
        e.className = `album${idAlbum} fas fa-star starAlbum starr${idAlbum}`
      })

      if (idAlbum == musicaSonando) {
        musicaSonandoStar.classList = "fas fa-star";
      }

    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

  })
})

function agregarAlbumFav(id) {
  let idxUsr = buscarUsuario(usuarioActivo)
  usuarios[idxUsr].albumFav.push(id)

}

function quitarAlbumFav(id) {
  let idxUsr = buscarUsuario(usuarioActivo)
  let arrAlb = usuarios[idxUsr].albumFav.filter(e => e != id)
  usuarios[idxUsr].albumFav = arrAlb
}


function extraerIDAlbum(cad) {
  return parseInt(cad.slice(5))
}


musicaSonandoStar.addEventListener("click", d => {
  let idAlbum = musicaSonando
  let idxUsuario = buscarUsuario(usuarioActivo)
  let estrellaEnAlbum = document.querySelectorAll(`.starr${musicaSonando}`)

  if (esAlbumFav(idAlbum)) {
    let albumsFavoritas = usuarios[idxUsuario].albumFav.filter((e) => {
      return e != idAlbum;
    });
    usuarios[idxUsuario].albumFav = albumsFavoritas;
    estrellaEnAlbum.forEach(e => {
      e.classList = `album${idAlbum} far fa-star starAlbum starr${idAlbum}`
    });
    musicaSonandoStar.classList = "far fa-star";
  } else {
    usuarios[idxUsuario].albumFav.push(idAlbum);
    estrellaEnAlbum.forEach(e => {
      e.classList = `album${idAlbum} fas fa-star starAlbum starr${idAlbum}`
    });

    musicaSonandoStar.classList = "fas fa-star";
  }
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

})

let playBtns = document.querySelectorAll(".btnPlay")
playBtns.forEach(e => {

  e.addEventListener("click", (a) => {
    a.preventDefault()
    localStorage.setItem("musicaSonando", extraerIDAlbum(e.id))
    location.href = "../pages/musicaSonando.html"
  })
})