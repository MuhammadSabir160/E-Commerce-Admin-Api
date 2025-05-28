const express = require('express');
const router = express.Router();
const product = require('../controllers/product');

router.get('/', product.getAllProducts);
router.post('/', product.createProduct);
router.get('/:id', product.getProductById);

module.exports = router;