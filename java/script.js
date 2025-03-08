const productos = [
    { id: 1, nombre: "🍔 Hamburguesa Clásica", precio: 5.99 },
    { id: 2, nombre: "🍔 Hamburguesa Doble", precio: 7.99 },
    { id: 3, nombre: "🍟 Papas Fritas", precio: 2.99 },
    { id: 4, nombre: "🥤 Refresco", precio: 1.99 }
];

let carrito = [];
const productosDiv = document.getElementById("productos");
const carritoLista = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const contadorSpan = document.getElementById("contador");
const IVA = 0.19; // IVA de Colombia (19%)

productos.forEach(producto => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
                     <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>`;
    productosDiv.appendChild(div);
});

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let subtotal = 0;
    let cantidadTotal = 0;
    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.cantidad} x ${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
        carritoLista.appendChild(li);
        subtotal += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;
    });
    contadorSpan.textContent = cantidadTotal;
    totalSpan.textContent = subtotal.toFixed(2);
}

document.getElementById("pagar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    let factura = "Factura de compra:\n";
    let subtotal = 0;
    carrito.forEach((producto) => {
        factura += `${producto.cantidad} x ${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)}\n`;
        subtotal += producto.precio * producto.cantidad;
    });
    
    let ivaCalculado = subtotal * IVA;
    let total = subtotal + ivaCalculado;
    
    factura += `\nSubtotal: $${subtotal.toFixed(2)}`;
    factura += `\nIVA (19%): $${ivaCalculado.toFixed(2)}`;
    factura += `\nTotal a pagar: $${total.toFixed(2)}`;
    
    alert(factura);
    carrito = [];
    actualizarCarrito();
});

document.getElementById("btn-ayuda").addEventListener("click", () => {
    alert("Para ayuda, envía un correo a soporte@hamburguesas.com o llámanos al 123-456-7890");
});
