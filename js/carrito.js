
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    mostrarCarrito();
});

function agregarAlCarrito(nombreProducto, rutaImagen) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre: nombreProducto, imagen: rutaImagen });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (contador) {
        contador.textContent = carrito.length;
    }
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const vacio = document.getElementById("vacio");
    const totalDiv = document.getElementById("total");
    const botonWhatsapp = document.getElementById("whatsapp-compra");
    if (!lista) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    lista.innerHTML = "";
    botonWhatsapp.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        vacio.style.display = "block";
        totalDiv.textContent = "";
        return;
    }

    vacio.style.display = "none";

    carrito.forEach((producto, index) => {
        const precio = 49900;
        total += precio;
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>$${precio.toLocaleString()}</p>
            <button class="boton" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        lista.appendChild(div);
    });

    totalDiv.textContent = `Total a pagar: $${total.toLocaleString()}`;

    const mensaje = encodeURIComponent(
        "Hola DAZZLIA, estoy interesado en los siguientes productos:\n" +
        carrito.map(p => "- " + p.nombre).join("\n") +
        `\nTotal: $${total.toLocaleString()}`
    );
    const enlace = `https://wa.me/573108203372?text=${mensaje}`;
    botonWhatsapp.innerHTML = `<a class="boton" href="${enlace}" target="_blank">Contactar por WhatsApp</a>`;
}

function eliminarDelCarrito(indice) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();
}
