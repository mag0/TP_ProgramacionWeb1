// ARCHIVO JAVASCRIPT PRINCIPAL
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuarioConectado = localStorage.getItem("usuarioConectado");
nombreUsuario.textContent = usuarioConectado;
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  localStorage.setItem("conectado", false);
});

const nombre = document.getElementById("usuario");
const contrasenia = document.getElementById("inputPassword");
const contrasenia_espejo = document.getElementById("repetirContra");
const email = document.getElementById("mail");
const fechaDeNacimiento = document.getElementById("fechaNac");
const msj = document.getElementById("msj");
const btn = document.getElementById("btn");

nombre.value = usuarios[buscarUsuario(usuarioConectado)].nombre;
contrasenia.value = usuarios[buscarUsuario(usuarioConectado)].contrasenia;
contrasenia_espejo.value =
  usuarios[buscarUsuario(usuarioConectado)].contrasenia;
email.value = usuarios[buscarUsuario(usuarioConectado)].email;
fechaDeNacimiento.value =
  usuarios[buscarUsuario(usuarioConectado)].fecha_de_nacimiento;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!campoVacios() && usuarioValido(nombre.value) && contraseniasIguales()) {
    registrarUsuario();
    location.href = "../index.html";
  }
});

function usuarioValido(nombre) {
  let usuarioValido = true;
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

function registrarUsuario() {
  delete usuarios[buscarUsuario(usuarioConectado)];
  let usuario = {
    nombre: nombre.value,
    contrasenia: codificarContrasenia(contrasenia.value),
    email: email.value,
    fecha_de_nacimiento: fechaDeNacimiento.value,
    canFav: [],
    albumFav: [],
  };

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
console.log(buscarUsuario(usuarioConectado));
function buscarUsuario(usuarioConectado) {
  return usuarios.findIndex((e) => {
    return (e.usuarioConectado = usuarioConectado);
  });
}
//la funcion buscarUsuario da el primer indice y no el q debe ser
//boton eliminar
//modal
// onclick="location.href='../pages/home.html'"