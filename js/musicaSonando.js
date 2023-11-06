let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioActivo = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));
let contCanciones = document.querySelector("#tabla")
let albumSonando = parseInt(localStorage.getItem("musicaSonando"))


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

        if (canciones[i].album == albumSonando) {
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
                                              <i class="${esAlbumFav(albumSonando) ? 'fas' : 'far'} fa-star starAlbum"></i>
                                              
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
        if (esCancionFav(e.id)) {
            quitarCancionDeFav(e.id)
            e.className = "far fa-star starCancion"
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        } else {
            agregarCancionAFav(e.id)
            e.className = "fas fa-star starCancion"
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        }
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
    e.addEventListener("click", event => {
        event.preventDefault()
        if (esAlbumFav(albumSonando)) {
            quitarAlbumFav()
            estrellasAlbums.forEach(e => {
                e.className = "far fa-star starAlbum"
            })

            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        } else {
            agregarAlbumFav()

            estrellasAlbums.forEach(e => {
                e.className = "fas fa-star starAlbum"
            })
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        }

    })
})

function agregarAlbumFav() {
    let idxUsr = buscarUsuario(usuarioActivo)
    usuarios[idxUsr].albumFav.push(albumSonando)

}

function quitarAlbumFav() {
    let idxUsr = buscarUsuario(usuarioActivo)
    let arrAlb = usuarios[idxUsr].albumFav.filter(e => e != albumSonando)
    usuarios[idxUsr].albumFav = arrAlb
}