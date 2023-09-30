import http from 'http'
import { 
  getProducts, getProduct, createProduct, deleteThisProduct, updateProduct 
} from './controllers/productController.js'

const extractIdFromUrl = url => {
  const parts = url.split('/')
  return parts[3]
}

const routes = {
  '/api/products': {
    'GET': getProducts,
    'POST': createProduct
  },
  '/api/products/:id': {
    'GET': (req, res, id) => getProduct(req, res, id),
    'DELETE': (req, res, id) => deleteThisProduct(req, res, id),
    'PUT': (req, res, id) => updateProduct(req, res, id),
  }
}

const server = http.createServer((req, res) => {
  const routeKey = req.url.match(/\/api\/products\/([0-9]+)/) ? '/api/products/:id' : req.url

  if (routes[routeKey] && routes[routeKey][req.method]) {
    const handler = routes[routeKey][req.method]
    const id = routeKey.includes(':id') ? extractIdFromUrl(req.url) : null
    handler(req, res, id)
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({ message: 'Route Not Found' }))
  }
})


const PORT = process.env.PORT || 6000

server.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))

