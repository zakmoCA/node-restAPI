import products from '../data/data.json' assert { type: 'json' }

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

const Product = {
  findAll,
  findById
}

export default Product