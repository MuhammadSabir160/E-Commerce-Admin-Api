const express = require('express');
const router = express.Router();
const inventory = require('../controllers/inventory');

router.get('/', inventory.getAllInventory);
router.post('/', inventory.createInventory);
router.put('/:id',inventory.updateInventory);

module.exports = router;