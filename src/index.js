import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/config.js';
import path from 'path'; 
import __dirname from './utils.js'; 
import { engine } from 'express-handlebars'; 

dotenv.config(); 

const app = express();


connectDB();

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

import ProductRouter from './routes/ProductRouter.js';
import CartRouter from './routes/CartRouter.js';

app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);


app.get('/', (req, res) => {
  res.render('index', { title: 'Bienvenido a mi tienda' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
