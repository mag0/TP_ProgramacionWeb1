let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioActivo = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));
let contCanciones = document.querySelector("#tabla")


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
          <a href="musicaSonando.html"><i class="fas fa-play"></i></a>
      </div>
      <div class="columna cancion">
          <p>${canciones[i].nombre}</p>
          <i id=${canciones[i].id} class="${esCancionFav(canciones[i].id) ? 'fas' : 'far'} fa-star starCancion"></i>
      </div>
      <div class="columna cancion">
          <p>${canciones[i].nombreAlbum}</p>
          <i id='album${canciones[i].album}' class="${esAlbumFav(canciones[i].album) ? 'fas' : 'far'} fa-star starAlbum"></i>
          
      </div>
      <div class="columna">
          <p>${canciones[i].duracion}</p>
      </div>
      <div class="columna">
          <p>${canciones[i].reproduccion}</p>
      </div>
  </div>`;
    }
  }

}

renderizarCanciones()

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
  let idAlbum = extraerIDAlbum(e.id)
  e.addEventListener("click", event => {
    event.preventDefault()
    if (esAlbumFav(idAlbum)) {
      quitarAlbumFav(idAlbum)
      estrellasAlbums.forEach(e => {
        e.className = "far fa-star starAlbum"
      })

      localStorage.setItem("usuarios", JSON.stringify(usuarios))
    } else {
      agregarAlbumFav(idAlbum)

      estrellasAlbums.forEach(e => {
        e.className = "fas fa-star starAlbum"
      })
      localStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

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

