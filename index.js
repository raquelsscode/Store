const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();
const productsController = require('./controllers/productsController');

app.use(bodyParser.json());

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', productsController.createProducts);
app.put('/products/:id', productsController.updateProducts);
app.delete('/products/:id', productsController.deleteProducts);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
