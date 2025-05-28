const { Inventory } = require('../models');

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInventory = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Inventory.update(req.body, {
        where: { id: id }
      });
  
      if (updated) {
        const updatedInventory = await Inventory.findByPk(id);
        return res.status(200).json(updatedInventory);
      }
      
      throw new Error('Inventory not found');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };