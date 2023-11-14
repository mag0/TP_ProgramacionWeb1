// ARCHIVO JAVASCRIPT PRINCIPAL
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioConectado = localStorage.getItem("usuarioConectado");
nombreUsuario.textContent = usuarioConectado;
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  localStorage.setItem("conectado", false);
});
let modal = document.querySelector("#modal");
modal.style.display = "none";
let modalCerrar = document.querySelector("#modalCerrar");
let modalHome = document.querySelector("#modalHome");

const nombre = document.getElementById("usuario");
const contrasenia = document.getElementById("inputPassword");
const contrasenia_espejo = document.getElementById("repetirContra");
const email = document.getElementById("mail");
const fechaDeNacimiento = document.getElementById("fechaNac");
const msj = document.getElementById("msj");
const btn = document.getElementById("btn");
const elimUsr = document.getElementById("eliminarUsr");
const premiumOpc = document.getElementById("premiumOpc");

if (usuarios[buscarUsuario(usuarioConectado)].premium == true) {
  premiumOpc.style.display = "none";
}

nombre.value = usuarios[buscarUsuario(usuarioConectado)].nombre;
contrasenia.value = decodificarContrasenia(
  usuarios[buscarUsuario(usuarioConectado)].contrasenia
);
contrasenia_espejo.value = decodificarContrasenia(
  usuarios[buscarUsuario(usuarioConectado)].contrasenia
);
email.value = usuarios[buscarUsuario(usuarioConectado)].email;
fechaDeNacimiento.value =
  usuarios[buscarUsuario(usuarioConectado)].fecha_de_nacimiento;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!campoVacios() && usuarioValido(nombre.value) && contraseniasIguales()) {
    registrarUsuario();
    modal.style.display = "flex";
    modal.showModal();
    localStorage.setItem("conectado", true);
  }
});

modalCerrar.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
  modal.close();
});

modalHome.addEventListener("click", (e) => {
  location.href = "../pages/home.html";
});

function usuarioValido(nombre) {
  let usuarioValido = true;
  if (usuarioConectado == nombre) return true;
  usuarios.forEach((e) => {
    if (e.nombre == nombre) {
      usuarioValido = false;
      msj.textContent = "El usuario ya existe";
    }
  });

  return usuarioValido;
}

function campoVacios() {
  let campoVacios = true;
  if (
    nombre.value != "" &&
    contrasenia.value != "" &&
    contrasenia_espejo != "" &&
    email.value != "" &&
    fechaDeNacimiento != ""
  ) {
    campoVacios = false;
  } else {
    msj.textContent = "Complete todos los campos";
  }
  return campoVacios;
}

function contraseniasIguales() {
  let contraseniasIguales = false;
  if (contrasenia.value == contrasenia_espejo.value) {
    contraseniasIguales = true;
  } else {
    msj.textContent = "La contrasenia no es la misma";
  }
  return contraseniasIguales;
}

function codificarContrasenia(cad) {
  let cad1 = cad.substring(0, parseInt(cad.length / 2));
  let cad2 = cad.substring(parseInt(cad.length / 2), cad.length);

  return cad2 + cad1;
}
function decodificarContrasenia(cad) {
  let cad1;
  let cad2;
  if (cad.length % 2 == 0) {
    cad1 = cad.substring(0, parseInt(cad.length / 2));
    cad2 = cad.substring(parseInt(cad.length / 2), cad.length);
  } else {
    cad1 = cad.substring(0, parseInt(cad.length / 2) + 1);
    cad2 = cad.substring(parseInt(cad.length / 2) + 1, cad.length);
  }

  return cad2 + cad1;
}

function registrarUsuario() {
  let usuario = {
    nombre: nombre.value,
    contrasenia: codificarContrasenia(contrasenia.value),
    email: email.value,
    fecha_de_nacimiento: fechaDeNacimiento.value,
    canFav: usuarios[buscarUsuario(usuarioConectado)].canFav,
    albumFav: usuarios[buscarUsuario(usuarioConectado)].albumFav,
    premium: usuarios[buscarUsuario(usuarioConectado)].premium,
  };
  eliminarUsr(usuarioConectado);
  usuarios.push(usuario);
  localStorage.setItem("usuarioConectado", nombre.value);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
function buscarUsuario(usuarioLogueado) {
  let idx = usuarios.findIndex((e, i) => {
    return e.nombre == usuarioLogueado;
  });
  return idx;
}

function eliminarUsr(nombreUsr) {
  usuarios = usuarios.filter((e) => {
    return e.nombre != nombreUsr;
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("conectado", false);
}

elimUsr.addEventListener("click", (e) => {
  e.preventDefault();
  eliminarUsr(usuarioConectado);
  location.href = "../index.html";
});

//la funcion buscarUsuario da el primer indice y no el q debe ser
//boton eliminar
//modal
// onclick="location.href='../pages/home.html'"
