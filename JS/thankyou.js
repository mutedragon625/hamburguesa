const nombreCliente = document.querySelector("#nombreCliente")
const btnGracias = document.querySelector(".btn-gracias")
const tituloDetallesEnvio = document.querySelector(".datos-envio .card-title")
const contenidoDetallesEnvio = document.querySelector(".datos-envio .card-text")
const tituloProductosComprados = document.querySelector(".productos-comprados .card-title")
const contenidoProductosComprados = document.querySelector(".productos-comprados .card-text")

btnGracias.addEventListener("click", () => {
    localStorage.clear()
    location.href = "index.html"

})

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos()
})

function mostrarDatos() {
    let cliente = JSON.parse(localStorage.getItem("cliente"))
    let proResumen = JSON.parse(localStorage.getItem("pro-resumen"))
    nombreCliente.textContent = `${cliente.nombres}!`
    tituloDetallesEnvio.textContent = "Detalles de Envio"
    contenidoDetallesEnvio.innerHTML = `
    <p class="mt-3"><span class="fw-bold">Nombre completo: </span> ${cliente.nombres} ${cliente.apellidos}</p>
    <p><span class="fw-bold">Celular: </span> ${cliente.celular}</p>
    <p><span class="fw-bold">Correo: </span> ${cliente.email}</p>
    <p><span class="fw-bold">Direccion: </span> ${cliente.direccion}</p>
    <p><span class="fw-bold">Direccion opcional: </span> ${cliente.direccion2}</p>
    <p><span class="fw-bold">Nota Adicional: </span> ${cliente.informacionAdicional}</p>
    `
    tituloProductosComprados.textContent = "Productos Comprados"
    contenidoProductosComprados.textContent = ""

    proResumen.productos.forEach(producto => {
        let filaProducto = document.createElement("div")
        filaProducto.classList.add("d-flex", "justify-content-start")
        filaProducto.innerHTML = `
        <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}</p>
        
        `
        contenidoProductosComprados.appendChild(filaProducto)
    });
    let filaResumen = document.createElement("div")
    filaResumen.innerHTML = `
    <p><span class="fw-bold">Ciudad: </span>${proResumen.domicilio}</p>
    <p><span class="fw-bold">Valor del domicilio: </span>${proResumen.valorDomicilio}</p>
    <p><span class="fw-bold">Descuento: </span>${proResumen.descuento}</p>
    <p><span class="fw-bold">Metodo de pago: </span>${proResumen.metodoPago}</p>
    <p><span class="fw-bold">Total a pagar: </span>${proResumen.totalMP}</p>
    `
    contenidoProductosComprados.appendChild(filaResumen)

}