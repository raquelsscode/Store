const productsModel = require('../models/productsModel');

const ERROR_MESSAGE = 'Product not found';

async function getAll() {
  const products = await productsModel.getAll();
  if (products === null) {
    return { code: 404, message: ERROR_MESSAGE };
  }
  return products;
}

async function getById(id) {
  const product = await productsModel.getById(id);
  if (product === null) {
    return { code: 404, message: ERROR_MESSAGE };
  }
  return product;
}

module.exports = {
  getAll,
  getById,
}; 
