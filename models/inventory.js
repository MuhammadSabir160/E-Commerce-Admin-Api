'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  Inventory.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    lowStockThreshold: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};