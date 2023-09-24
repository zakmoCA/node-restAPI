import Product from '../models/productModel.js'

// Get all products
// GET /api/products
async function getProducts(req, res) {
  try{
    const products = await Product.findAll()

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

// Get single product
// GET /api/products/:id
async function getProduct(req, res, id) {
  try{
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

async function createProduct(req, res) {
  try {
    const product = {
      title: 'Test Product',
      description: 'This is a product',
      price: 10
    }

    const newProduct = await Product.createNewProduct(product)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {

  }
}

export { getProducts, getProduct, createProduct }