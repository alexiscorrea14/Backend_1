import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductRouter from './routes/ProductRouter.js';
import CartRouter from './routes/CartRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);

app.get('/products', async (req, res) => {
    res.render('index', { title: "Lista de Productos", productos: await getProducts() });
});

app.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', { title: "Productos en tiempo real" });
});

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.emit('productosActualizados', getProducts());

    socket.on('nuevoProducto', async (producto) => {
        await addProduct(producto);
        io.emit('productosActualizados', getProducts());
    });

    socket.on('eliminarProducto', async (id) => {
        await deleteProduct(id);
        io.emit('productosActualizados', getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

import fs from 'fs/promises';

const filePath = path.join(__dirname, '../products.json');

async function getProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function addProduct(product) {
    const productos = await getProducts();
    productos.push({ ...product, id: Date.now().toString() });
    await fs.writeFile(filePath, JSON.stringify(productos, null, 2));
}

async function deleteProduct(id) {
    let productos = await getProducts();
    productos = productos.filter(p => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(productos, null, 2));
}
