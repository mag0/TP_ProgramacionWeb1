let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioActivo = localStorage.getItem("usuarioConectado");
let albums = JSON.parse(localStorage.getItem("albums"));
let canciones = JSON.parse(localStorage.getItem("canciones"));
let contCanciones = document.querySelector("#tabla")
let musicaSonando = parseInt(localStorage.getItem("musicaSonando"))
if(musicaSonando == null){
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
    console.log(usuarioLogueado);
    let idx = usuarios.findIndex((e,i) => {
      return (e.nombre == usuarioLogueado)
    });
    console.log(idx);
    return idx
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

        if (canciones[i].album == musicaSonando) {
            contCanciones.innerHTML += ` <div class="fila">
                                          <div class="columna">
                                              <a href="musicaSonando.html" class="contPlay"><i class="fas fa-play"></i></a>
                                          </div>
                                          <div class="columna cancion">
                                              <p>${canciones[i].nombre}</p>
                                              <i id=${canciones[i].id} class="${esCancionFav(canciones[i].id) ? 'fas' : 'far'} fa-star starCancion"></i>
                                          </div>
                                          <div class="columna cancion">
                                              <p>${canciones[i].nombreAlbum}</p>
                                              <i class="${esAlbumFav(musicaSonando) ? 'fas' : 'far'} fa-star starAlbum"></i>
                                              
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
let musicaSonandoStar = document.getElementById("musicaSonandoStar")

estrellasAlbums.forEach(e => {
    e.addEventListener("click", event => {
        event.preventDefault()
        if (esAlbumFav(musicaSonando)) {
            quitarAlbumFav()
            estrellasAlbums.forEach(e => {
                e.className = "far fa-star starAlbum"
            })
            musicaSonandoStar.classList = "far fa-star";
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        } else {
            agregarAlbumFav()

            estrellasAlbums.forEach(e => {
                e.className = "fas fa-star starAlbum"
            })
            musicaSonandoStar.classList = "fas fa-star";
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
        }

    })
})

function agregarAlbumFav() {
    let idxUsr = buscarUsuario(usuarioActivo)
    usuarios[idxUsr].albumFav.push(musicaSonando)

}

function quitarAlbumFav() {
    let idxUsr = buscarUsuario(usuarioActivo)
    let arrAlb = usuarios[idxUsr].albumFav.filter(e => e != musicaSonando)
    usuarios[idxUsr].albumFav = arrAlb
}


musicaSonandoStar.addEventListener("click", d => {
    
    let idAlbum = musicaSonando
    let idxUsuario = buscarUsuario(usuarioActivo)
    if (esAlbumFav(idAlbum)) {
        let cancionesFavoritas = usuarios[idxUsuario].albumFav.filter((e) => {
            return e != idAlbum;
        });
        usuarios[idxUsuario].albumFav = cancionesFavoritas;
        musicaSonandoStar.classList = "far fa-star";
        estrellasAlbums.forEach(e => {
            e.className = "far fa-star starAlbum"
        })
    } else {
        usuarios[idxUsuario].albumFav.push(idAlbum);
        estrellasAlbums.forEach(e => {
            e.className = "fas fa-star starAlbum"
        })
        musicaSonandoStar.classList = "fas fa-star";
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
})