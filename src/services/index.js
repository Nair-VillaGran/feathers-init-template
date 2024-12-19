import { products } from './products/products.js'
import { user } from './users/users.js'
export const services = (app) => {
  app.configure(products)

  app.configure(user)

  // All services will be registered here
}
