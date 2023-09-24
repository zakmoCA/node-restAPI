import products from '../data/data.json' assert { type: 'json' }
import { v4 as uuidv4 } from 'uuid'
import { writeDataToFile } from '../utils.js'

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((x) => x.id === id)
    resolve(product)
  })
}

function createNewProduct(product) {
  return new Promise((resolve, reject) => {
    const newProduct = {id: uuidv4(), ...product}
    products.push(newProduct)
    writeDataToFile('./data/data.json', products)
    resolve(newProduct)
  })
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = {id, ...product}
    writeDataToFile('./data/data.json', products)
    resolve(products[index])
  })
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) {
      return reject(new Error('Product not found'))
    }
    
    const deletedProduct = products[index]
    products.splice(index, 1);
    
    try {
      writeDataToFile('./data/data.json', products)
      resolve(deletedProduct)
    } catch (error) {
      reject(error)
    }
  })
}


const Product = {
  findAll,
  findById,
  createNewProduct,
  update,
  deleteProduct
}

export default Product