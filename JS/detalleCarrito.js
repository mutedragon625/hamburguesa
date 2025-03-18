const tablaCarrito = document.querySelector(".cart-table tbody")
const btnResumen = document.querySelector(".btn-resumen")
const varSubtotal = document.querySelector(".res-sub-total")
const varDescuento = document.querySelector(".promo")
const varTotal = document.querySelector(".total")
const varDomicilio = document.querySelector(".valor-domi")
const selectCiudad = document.querySelector(".destino")
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos()
})

function mostrarProductos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    if (productos.length === 0) {
        let limpiarZona = document.querySelectorAll(".cart-table tbody tr")
        btnResumen.classList.add("d-none")
        limpiarZona.forEach((element) => {
            element.remove()
        })
        let fila = document.createElement("tr")
        fila.innerHTML = `
    <td colspan="4">
        <p class="text-center mt-3 fs-3">No hay ningun producto en el carrito</p>
    </td>
    
    `
        tablaCarrito.appendChild(fila)
    }
    else {
        let limpiarZona = document.querySelectorAll(".cart-table tbody tr")
        btnResumen.classList.remove("d-none")
        limpiarZona.forEach((element) => {
            element.remove()
        })



        productos.forEach((producto, i) => {
            let fila = document.createElement("tr")
            fila.innerHTML = `
        <td class="d-flex justify-content-evenly align-items-center">
        <span onclick="borrarProducto(${i})" class="btn btn-danger">X</span>
        <img src="${producto.imagen}" width="100px">
        ${producto.nombre}
        </td>
        <td>$${producto.precio}</td>
         <td>
            <div class="quantity quantity-wrap">
                <div class="decrement" onclick="actualizarCantidad(${i},-1)"> <i class="fa-solid fa-minus"></i> </div>
                <input class="number" type="text" name="quantity" value=${producto.cantidad} maxlength="2" size="1" min="1" readonly>
                <div class="increment" onclick="actualizarCantidad(${i},1)"> <i class="fa-solid fa-plus"></i> </div>
            </div>
         </td>  
         <td>$${(producto.precio * producto.cantidad).toFixed(3)}</td>     
        
        `
            tablaCarrito.appendChild(fila)
        });
    }

    resumenCompra()
}
function actualizarCantidad(i, number) {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    if (productos[i].cantidad >= 1) {
        productos[i].cantidad = productos[i].cantidad + number
    }
    if (productos[i].cantidad === 0) {
        productos[i].cantidad++
    }
    localStorage.setItem("productos", JSON.stringify(productos))
    mostrarProductos()

}




function borrarProducto(i) {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    productos.splice(i, 1)
    localStorage.setItem("productos", JSON.stringify(productos))
    mostrarProductos()
}



function resumenCompra() {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let subtotal = 0
    productos.forEach((producto) => {
        subtotal += producto.precio * producto.cantidad

    })
    let domicilio = 0
    switch (selectCiudad.value) {
        case "Medellin": default: domicilio; break;
        case "Bello": domicilio = 10.000; break;
        case "Itagui": case "Envigado": case "Sabaneta": domicilio = 15.000; break;
        case "La Estrella": case "Caldas": case "Copacabana": domicilio= 20.000;break;
    }

    let descuento = (subtotal > 100.000) ? subtotal * 0.1 : 0
    let total = subtotal - descuento + domicilio
    varSubtotal.textContent = `$${subtotal.toFixed(3)}`
    varDomicilio.textContent = `$${domicilio.toFixed(3)}`
    varDescuento.textContent = `$${descuento.toFixed(3)}`
    varTotal.textContent = `$${total.toFixed(3)}`
}





selectCiudad.addEventListener("change", () => {
    resumenCompra()
})

btnResumen.addEventListener("click",()=>{
    let productos = JSON.parse(localStorage.getItem("productos"))||[]
    let resumenTodo = {
        "productos":productos,
    }
    resumenTodo.subtotal = varSubtotal.textContent.split("$")[1]
    resumenTodo.domicilio = selectCiudad.value
    resumenTodo.valorDomicilio = varDomicilio.textContent.split("$")[1]
    resumenTodo.descuento = varDescuento.textContent.split("$")[1]
    resumenTodo.total = varTotal.textContent.split("$")[1]
localStorage.setItem("pro-resumen",JSON.stringify(resumenTodo))
location.href="checkout.html"
})