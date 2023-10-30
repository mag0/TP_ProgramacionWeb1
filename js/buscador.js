const buscador = document.getElementById("buscador");
let albums = JSON.parse(localStorage.getItem("albums"));
let contenedorAlbums = document.getElementById("albums");

buscador.addEventListener("keyup", (e) => {
  console.log(buscador.value);
  contenedorAlbums.innerHTML = "";
  albums.forEach((e) => {
    if (e.nombre.toUpperCase().includes(buscador.value.toUpperCase())) {
      contenedorAlbums.innerHTML += `<div class="album">
    <a href="musicaSonando.html">
        <img src="${e.loc}" alt="${e.nombre}">
    </a>
</div>`;
    }
  });
});
