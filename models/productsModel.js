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

module.exports = {
  getAll,
  getById,
}; 