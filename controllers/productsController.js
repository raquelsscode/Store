const productsServices = require('../services/productsServices');

async function getAll(_req, res) {
  const products = await productsServices.getAll();
  if (products.message) {
    return res.status(products.code).json(products.message);
  }
  return res.status(200).json(products);
}

async function getById(req, res) {
  const product = await productsServices.getById(req.params.id);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(200).json(product);
}

module.exports = {
  getAll,
  getById,
};
