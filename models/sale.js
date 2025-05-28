'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      Sale.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  Sale.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    salePrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};