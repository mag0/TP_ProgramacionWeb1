let albums = [
  {
    id: 1,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 2,
    nombre: "maroon 5",
    loc: "../img/albums/maroon_5.jpg",
  },
  {
    id: 3,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 4,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 5,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 6,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 7,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 8,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
  {
    id: 9,
    nombre: "imagine_dragons",
    loc: "../img/albums/imagine_dragons.jpg",
  },
];

let canciones = [
  {
    id: 1,
    nombre: "cancion1",
    nombreAlbum: "imagine Dragons",
    album: 1,
    duracion: "3.20",
    reproduccion: "12",
  },
  {
    id: 2,
    nombre: "cancion2",
    nombreAlbum: "imagine Dragons",
    album: 1,
    duracion: "3.20",
    reproduccion: "12",
  },
  {
    id: 3,
    nombre: "cancion3",
    nombreAlbum: "Maroon 5",
    album: 2,
    duracion: "3.20",
    reproduccion: "12",
  },
];

localStorage.setItem("albums", JSON.stringify(albums));
localStorage.setItem("canciones", JSON.stringify(canciones));
