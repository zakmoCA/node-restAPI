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

const Product = {
  findAll,
  findById,
  createNewProduct
}

export default Product