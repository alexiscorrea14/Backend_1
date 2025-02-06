import { Router } from 'express';
import { ProductManager } from '../managers/ProductManager.js';

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductManager.getProducts();
    res.json(products);
});

router.post('/', async (req, res) => {
    const product = req.body;
    const newProduct = await ProductManager.addProduct(product);
    
    req.io.emit('productosActualizados', await ProductManager.getProducts());

    res.status(201).json(newProduct);
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const deleted = await ProductManager.deleteProduct(pid);
    
    if (deleted) {
        req.io.emit('productosActualizados', await ProductManager.getProducts());
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

export default router;
