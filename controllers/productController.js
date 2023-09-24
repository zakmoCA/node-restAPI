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

// Get a product
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

// Update product
// PUT /api/products/:id
async function updateProduct(req, res, id) {
  try{
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
        const body = await getPostData(req)

        const { productName, description, price } = JSON.parse(body)

        const productData = {
          productName: productName || product.productName,
          description: description || product.description,
          price: price || product.price
        }

        const updatedProduct = await Product.update(id, productData)

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(updatedProduct))
    }
  } catch (error) {
    console.log(error)
  }
}

// Delete product
// DELETE /api/products/:id
async function deleteThisProduct(req, res, id) {
  try{
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
        await Product.deleteProduct(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: `Product with ID:${id} has been deleted.` }))
    }
  } catch (error) {
      console.log(error)
      res.writeHead(500, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ message: 'Server Error' }))
  }
}

// Create a product
// POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const product = {
      productName,
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

export { getProducts, getProduct, createProduct, updateProduct, deleteThisProduct }