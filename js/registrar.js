const nombre = document.getElementById("usuario");
const contrasenia = document.getElementById("contrasenia");
const contrasenia_espejo = document.getElementById("contrasenia-espejo");
const email = document.getElementById("email");
const fechaDeNacimiento = document.getElementById("fecha_de_nacimiento");
const msj = document.getElementById("msj");
const btn = document.getElementById("btn");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));
console.log(usuarios);
btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log;
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
