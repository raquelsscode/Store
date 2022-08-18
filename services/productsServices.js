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

async function createProducts(name) {
  if (name === undefined) {
    return { code: 400, message: '"name" is required' };
  }
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }

  const product = await productsModel.createProducts(name);

  return product;
}

function validatyName(name) {
  if (!name || name === undefined) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return {
      code: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  return true;
}

async function updateProducts(id, name) {
  const validaty = validatyName(name);
  if (validaty !== true) return validaty;
  const product = await productsModel.updateProducts(id, name);
  if (product === null) {
    return { code: 404, message: ERROR_MESSAGE };
  }
  return product;
}

async function deleteProducts(id) {
  const product = await productsModel.deleteProducts(id);
  if (product === null) {
    return { code: 404, message: ERROR_MESSAGE };
  }
  return {};
}

module.exports = {
  getAll,
  getById,
  createProducts,
  validatyName,
  updateProducts,
  deleteProducts,
}; 
