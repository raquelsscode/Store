const connection = require('./connection');

async function getAll() {
   const SQL = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.query(SQL);
  
  if (products.length === 0) {
    return null;
  }
  return products;
}

async function getById(id) {
  const SQL = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.query(SQL, [id]);
  if (!product || product.length === 0) {
    return null;
  }
  return product[0];
}

async function createProducts(name) {
  const SQL = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.query(SQL, [name]);
  return { id: product.insertId, name };
}

async function updateProducts(id, name) {
  const SQL = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const UPDATE_SQL = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

  const [product] = await connection.query(SQL, [id]);
  if (!product || product.length === 0) {
    return null;
  }
  await connection.query(UPDATE_SQL, [name, id]);
  return { id, name };
}

async function deleteProducts(id) {
  const SQL = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const DELETE_SQL = 'DELETE FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.query(SQL, [id]);
  if (!product || product.length === 0) {
    return null;
  }
  await connection.query(DELETE_SQL, [id]);
  return {};
}

module.exports = {
  getAll,
  getById,
  createProducts,
  updateProducts,
  deleteProducts,
}; 
