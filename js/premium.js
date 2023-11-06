localStorage.setItem("planElegido","Plan Bronce")

let planes = document.querySelectorAll("[name = 'plan-elegido']")
console.log(planes);


planes.forEach((e)=>{
    e.addEventListener("click",(a)=>{
        if(e.id == "plan1"){
            localStorage.setItem("planElegido","Plan Bronce")
            localStorage.setItem("precio","$1")
            localStorage.setItem("caracteristicasPlan",JSON.stringify(["Música ilimitada"]))
        }
        if(e.id == "plan2"){
            localStorage.setItem("planElegido","Plan Plata")
            localStorage.setItem("precio","$5")
            localStorage.setItem("caracteristicasPlan",JSON.stringify(["Música ilimitada","Sin anuncios"]))
        }
        if(e.id == "plan3"){
            localStorage.setItem("planElegido","Plan Oro")
            localStorage.setItem("precio","$10")
            localStorage.setItem("caracteristicasPlan",JSON.stringify(["Música ilimitada","Sin anuncios","Descarga tus canciones favoritas"]))
        }
    })
})

