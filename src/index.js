const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const ProductRouter = require('./routes/ProductRouter');
const CartRouter = require('./routes/CartRouter');
const ViewsRouter = require('./routes/ViewsRouter');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use('/', ViewsRouter); 


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
