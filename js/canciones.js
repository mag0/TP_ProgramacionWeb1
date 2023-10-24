let albums = [
  {
    id: 1,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
];

let canciones = [
  { id: 1, nombre: "cancion1", album: 1, duracion: "3.20", reproduccion: "12" },
  { id: 2, nombre: "cancion2", album: 1, duracion: "3.20", reproduccion: "12" },
  { id: 3, nombre: "cancion1", album: 2, duracion: "3.20", reproduccion: "12" },
];

localStorage.setItem("albums", JSON.stringify(albums));
localStorage.setItem("canciones", JSON.stringify(canciones));
