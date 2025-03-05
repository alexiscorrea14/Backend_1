import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';

// Importar routers
import ProductRouter from './routes/ProductRouter.js';
import CartRouter from './routes/CartRouter.js';
import ViewsRouter from './routes/ViewsRouter.js';
import AuthRouter from './routes/AuthRouter.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Inicialización de Passport para autenticación
app.use(passport.initialize());

// Las rutas
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter); 
app.use('/api/sessions', AuthRouter); 
app.use('/', ViewsRouter); 

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos', error);
  });
