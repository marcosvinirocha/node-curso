const express = require('express');
const bodyParser = require('body-parser');


const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended:false }))


userRoutes(app);

app.get('/', (req, res) => {
  res.send('Ola mundo ');
});

app.listen(PORT, () => {
  console.log(`o servidor esta aberto na porta ${PORT}`);
});
