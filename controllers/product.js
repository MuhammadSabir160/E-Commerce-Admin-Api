const { Product, Inventory, Sale } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Inventory]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    await Inventory.create({
      productId: product.id,
      quantity: 0,
      lowStockThreshold: 10
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Inventory,
            attributes: ['quantity', 'lowStockThreshold']
          },
          {
            model: Sale,
            attributes: ['quantity', 'salePrice', 'saleDate'],
            limit: 5,
            order: [['saleDate', 'DESC']]
          }
        ]
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };