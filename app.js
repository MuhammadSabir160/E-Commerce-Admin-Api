const express = require('express');
const cors = require('cors');
const db = require('./models');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: "E-commerce Admin API" });
});

const product = require('./routes/product');
const inventory = require('./routes/inventory');
const sale = require('./routes/sale');

app.use('/api/products', product);
app.use('/api/inventory', inventory);
app.use('/api/sales', sale);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});