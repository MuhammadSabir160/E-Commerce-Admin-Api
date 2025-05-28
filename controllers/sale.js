const { Sale, Product, Sequelize } = require('../models');
const {Op} = require('sequelize');
const moment = require('moment')

exports.getAllSale = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalesByFilters = async (req, res) => {
    try {
      const { startDate, endDate, productId, category } = req.query;
      
      const whereClause = {};
      const include = [];
      
      if (startDate && endDate) {
        whereClause.createdAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      } else if (startDate) {
        whereClause.createdAt = {
          [Op.gte]: new Date(startDate)
        };
      } else if (endDate) {
        whereClause.createdAt = {
          [Op.lte]: new Date(endDate)
        };
      }
      
      if (productId) {
        whereClause.productId = productId;
      }
      
      if (category) {
        include.push({
          model: Product,
          where: { category: category },
          attributes: [] 
        });
      }
      
      const sales = await Sale.findAll({
        where: whereClause,
        include: include.length ? include : undefined,
        order: [['createdAt', 'DESC']]
      });
      
      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getRevenue = async (req, res) => {
    try {
      const { period = 'daily', startDate, endDate } = req.query;
      
      const where = {};
      if (startDate) where.createdAt = { [Sequelize.Op.gte]: moment(startDate).startOf('day').toDate() };
      if (endDate) where.createdAt = { ...where.createdAt, [Sequelize.Op.lte]: moment(endDate).endOf('day').toDate() };
  
      const sales = await Sale.findAll({
        where,
        attributes: ['createdAt', 'quantity', 'salePrice'],
        raw: true
      });
  
      const groupedData = sales.reduce((acc, sale) => {
        let dateKey;
        const saleDate = moment(sale.createdAt);
        
        switch(period) {
          case 'yearly':
            dateKey = saleDate.format('YYYY');
            break;
          case 'monthly':
            dateKey = saleDate.format('YYYY-MM');
            break;
          default:
            dateKey = saleDate.format('YYYY-MM-DD');
        }
        
        const revenue = sale.quantity * sale.salePrice;
        
        if (!acc[dateKey]) {
          acc[dateKey] = { date: dateKey, revenue: 0 };
        }
        
        acc[dateKey].revenue += revenue;
        return acc;
      }, {});
  
      const result = Object.values(groupedData).sort((a, b) => a.date.localeCompare(b.date));
  
      res.json({ 
        period,
        data: result 
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };