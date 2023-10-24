const tabla = document.getElementById("tabla");

let canciones = JSON.parse(localStorage.getItem("canciones"));

for (let i = 0; i < canciones.length; i++) {
  let idAlbum = albums[i].id;
  if (esFavorito(idAlbum, usuarioLogueado)) {
    contenedorAlbums.innerHTML += ` <div class="fila">
                                        <div class="columna">
                                            <a href="musicaSonando.html"><i class="fas fa-play"></i></a>
                                        </div>
                                        <div class="columna cancion">
                                            <p>Cancion 2</p>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="columna cancion">
                                            <p>Album 1</p>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="columna">
                                            <p>4:00</p>
                                        </div>
                                        <div class="columna">
                                            <p>1500</p>
                                        </div>
                                    </div>`;
  }
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
