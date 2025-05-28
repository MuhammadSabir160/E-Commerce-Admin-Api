const express = require('express');
const router = express.Router();
const sale = require('../controllers/sale');

router.get('/', sale.getAllSale);
router.get('/saleByFilters',sale.getSalesByFilters)
router.get('/revenue',sale.getRevenue)

module.exports = router;