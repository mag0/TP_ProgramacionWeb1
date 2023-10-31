let usuarios = JSON.parse(localStorage.getItem("usuarios"));
console.log(usuarios);
if (usuarios == null) {
  localStorage.setItem("usuarios", "[]");
  usuarios = JSON.parse(localStorage.getItem("usuarios"));
}
const usuario = document.getElementById("usuario");
const contrasenia = document.getElementById("contrasenia");
const boton = document.getElementById("boton");
const msj = document.getElementById("mensaje");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !contraseniaCorrecta(usuario.value, codificarContrasenia(contrasenia.value))
  ) {
    msj.textContent = "El usuario y/o contraseña es incorrecto";
  } else {
    localStorage.setItem("conectado", true);
    localStorage.setItem("usuarioConectado", usuario.value);
    location.href = "pages/home.html";
  }
});

function contraseniaCorrecta(usuario, contrasenia) {
  let existe = false;
  usuarios.forEach((us) => {
    if (us.nombre == usuario && us.contrasenia == contrasenia) {
      existe = true;
    }
  });
  return existe;
}

function codificarContrasenia(cad) {
  let cad1 = cad.substring(0, parseInt(cad.length / 2));
  let cad2 = cad.substring(parseInt(cad.length / 2), cad.length);

  return cad2 + cad1;
}
