'use strict';

module.exports = {
  up: async (queryInterface) => {
    const products = await queryInterface.bulkInsert('Products', [
      {
        name: 'Laptop',
        description: 'High performance laptop',
        price: 999.99,
        category: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone',
        price: 699.99,
        category: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Desk Chair',
        description: 'Ergonomic office chair',
        price: 199.99,
        category: 'Furniture',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    await queryInterface.bulkInsert('Inventories', [
      {
        productId: products[0].id,
        quantity: 15,
        lowStockThreshold: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: products[1].id,
        quantity: 25,
        lowStockThreshold: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: products[2].id,
        quantity: 8,
        lowStockThreshold: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('Sales', [
      {
        productId: products[0].id,
        quantity: 2,
        salePrice: 999.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: products[1].id,
        quantity: 5,
        salePrice: 699.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: products[2].id,
        quantity: 1,
        salePrice: 199.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Sales', null, {});
    await queryInterface.bulkDelete('Inventories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};