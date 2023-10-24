// ARCHIVO JAVASCRIPT PRINCIPAL
let usuario = localStorage.getItem("usuarioConectado");
const nombreUsuario = document.getElementById("nombreUsuario");

nombreUsuario.textContent = usuario;
