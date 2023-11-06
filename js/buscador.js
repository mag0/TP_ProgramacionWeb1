const buscador = document.getElementById("buscador");
let albums = JSON.parse(localStorage.getItem("albums"));
let contenedorAlbums = document.getElementById("albums");



buscador.addEventListener("keyup", (e) => {
  console.log(buscador.value);
  contenedorAlbums.innerHTML = "";
  albums.forEach((e) => {
    if (e.nombre.toUpperCase().includes(buscador.value.toUpperCase())) {
      contenedorAlbums.innerHTML += `<div class="album">
    <a>
        <img id="${e.id}" src="${e.loc}" alt="${e.nombre}">
    </a>
</div>`;
    }
  });
  console.log("aasdsadada");
  agregarELsonando()
});

function agregarELsonando(){
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