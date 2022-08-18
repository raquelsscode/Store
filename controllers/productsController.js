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

async function createProducts(req, res) {
  const { name } = req.body;
  const product = await productsServices.createProducts(name);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(201).json(product);
}

async function updateProducts(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const product = await productsServices.updateProducts(id, name);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(200).json(product);
}

async function deleteProducts(req, res) {
  const { id } = req.params;
  const product = await productsServices.deleteProducts(id);
  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  return res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  createProducts,
  updateProducts,
  deleteProducts,
};
