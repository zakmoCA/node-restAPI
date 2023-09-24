import Product from '../models/productModel.js'
import { getPostData } from '../utils.js'

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

// Create a product
// POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const product = {
      title,
      description,
      price
    }

    const newProduct = await Product.createNewProduct(product)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))

  } catch (error) {
    console.log(error)
  }
}

export { getProducts, getProduct, createProduct }