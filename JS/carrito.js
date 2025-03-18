const btnProductos = document.querySelectorAll('.btn-product')
const numeroContadorCarrito = document.querySelector('.contar-pro')
const listadoCarrito = document.querySelector(".list-cart tbody")
const btnCarrito = document.querySelector(".fa-cart-shopping")

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos()
})



btnCarrito.addEventListener("click", () => {
    const toggleForm = document.querySelector(".list-cart")
    toggleForm.classList.toggle("ocultar")

})

btnProductos.forEach((btn, i) => {
    btn.addEventListener('click', () => {

        guardarProductos(i)
    })
});

function guardarProductos(i) {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let producto = btnProductos[i].parentElement.parentElement.parentElement
    let infoProducto = {
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1

    }
    productos.push(infoProducto)


    localStorage.setItem("productos", JSON.stringify(productos))
    mostrarProductos()

}

function mostrarProductos() {

    let productos = JSON.parse(localStorage.getItem("productos")) || []
if (productos.length===0){
    let limpiarZona = document.querySelectorAll(".list-cart tbody tr")
    limpiarZona.forEach((tr) => {
        tr.remove()
    })
    let fila = document.createElement("tr")
    fila.innerHTML=`
    <td colspan="4">
        <p class="text-center">No hay productos en el carrito</p>
    </td>
    `
    listadoCarrito.appendChild(fila)
}

else{
    let limpiarZona = document.querySelectorAll(".list-cart tbody tr")
    limpiarZona.forEach((tr) => {
        tr.remove()
    })


    productos.forEach((producto, i) => {
        const fila = document.createElement("tr")

        fila.innerHTML = `
        <td>${i + 1}</td>
        <td><img src="${producto.imagen}" width="70px"></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td><span onclick="borrarProducto(${i})" class="btn btn-danger">X</span></td>
        `

        listadoCarrito.appendChild(fila)

    })
    contadorCarrito()
}

}

function borrarProducto(i) {
    let productos = JSON.parse(localStorage.getItem("productos"))
    productos.splice(i, 1)
    localStorage.setItem("productos", JSON.stringify(productos))
    mostrarProductos()
}


function contadorCarrito() {
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let cantidad = productos.length                                     /* Object.keys(productos).length */
    numeroContadorCarrito.textContent = cantidad
}


