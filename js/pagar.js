let planSpan = document.querySelector("#planSpan")
let nroTargeta = document.querySelector("#numero_tarjeta")
let cvc = document.querySelector("#cvc")
let btnPagar = document.querySelector("#btnPagar")
let msjErr_targeta = document.querySelector("#msjErr_targeta")
let msjErr_cvc = document.querySelector("#msjErr_cvc")
let precio = document.querySelector("#precio")
let cardBody = document.querySelector(".cardBody")
let dialog = document.querySelector("dialog")
dialog.style.display = "none"
let usuarios = JSON.parse(localStorage.getItem("usuarios"))
let usuarioConectado = localStorage.getItem("usuarioConectado");

let caracteristicasPlan = JSON.parse(localStorage.getItem("caracteristicasPlan"))
let btnModal = document.querySelector("#btnModal")
let conectado = JSON.parse(localStorage.getItem("conectado"))

planSpan.innerHTML = localStorage.getItem("planElegido")

btnPagar.addEventListener("click", e => {
    e.preventDefault()
    msjErr_targeta.innerHTML = ""
    msjErr_cvc.innerHTML = ""
    if ((nroTargeta.value).length != 16) {
        msjErr_targeta.innerHTML = "Valor incorrecto"

    } else if (cvc.value == 000 || cvc.value == 999 || (cvc.value).length != 3) {

        msjErr_cvc.innerHTML = "Valor incorrecto"
    } else {
        dialog.style.display = "flex"
        usuarios[buscarUsuario(usuarioConectado)].premium = true
        localStorage.setItem("usuarios",JSON.stringify(usuarios))
        dialog.showModal()
    }
})

precio.innerHTML = localStorage.getItem("precio")


cardBody.innerHTML = ""
caracteristicasPlan.forEach(e => {
    cardBody.innerHTML += `
    <p>${e}</p>
    `
});



btnModal.addEventListener("click", e => {
    e.preventDefault()
    if (conectado) {
        location.href = "../pages/home.html"
    } else {
        location.href = "../index.html"
    }
})

function buscarUsuario(usuarioLogueado) {
    let idx = usuarios.findIndex((e,i) => {
      return (e.nombre == usuarioLogueado)
    });
    return idx
  }
  