let planSpan = document.querySelector("#planSpan")
let nroTargeta = document.querySelector("#numero_tarjeta")
let cvc = document.querySelector("#cvc")
let btnPagar = document.querySelector("#btnPagar")
let msjErr_targeta = document.querySelector("#msjErr_targeta")
let msjErr_cvc = document.querySelector("#msjErr_cvc")
let precio = document.querySelector("#precio")
let cardBody = document.querySelector(".cardBody")
let caracteristicasPlan = JSON.parse(localStorage.getItem("caracteristicasPlan"))
console.log(caracteristicasPlan);
planSpan.innerHTML= localStorage.getItem("planElegido")

btnPagar.addEventListener("click",e=>{
    e.preventDefault()
    msjErr_targeta.innerHTML = ""
    msjErr_cvc.innerHTML = ""
    if((nroTargeta.value).length != 16){
        msjErr_targeta.innerHTML = "Valor incorrecto"
        
    }else if(cvc.value==000 || cvc.value==999 || (cvc.value).length != 3){

        msjErr_cvc.innerHTML = "Valor incorrecto"
    }
})

precio.innerHTML = localStorage.getItem("precio")


cardBody.innerHTML=""
caracteristicasPlan.forEach(e => {
    cardBody.innerHTML+=`
    <p>${e}</p>
    `
});