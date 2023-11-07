let usuario = localStorage.getItem("usuarioConectado");
const nombreUsuario = document.getElementById("nombreUsuario");
nombreUsuario.textContent = usuario;
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  localStorage.setItem("conectado", false);
});
