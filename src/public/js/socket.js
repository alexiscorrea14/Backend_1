const socket = io();
const listaProductos = document.getElementById('listaProductos');
const formAgregar = document.getElementById('formAgregar');

socket.on('productosActualizados', (productos) => {
    listaProductos.innerHTML = "";
    productos.forEach(prod => {
        const li = document.createElement('li');
        li.innerHTML = `${prod.title} - $${prod.price} <button onclick="eliminarProducto('${prod.id}')">Eliminar</button>`;
        listaProductos.appendChild(li);
    });
});

formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreProducto').value;
    const precio = document.getElementById('precioProducto').value;

    socket.emit('nuevoProducto', { title: nombre, price: precio });
    formAgregar.reset();
});

function eliminarProducto(id) {
    socket.emit('eliminarProducto', id);
}
