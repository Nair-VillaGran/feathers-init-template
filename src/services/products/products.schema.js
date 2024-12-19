// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax, StringEnum } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'


// Main data model schema
export const productsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 255 }),
    description: Type.Optional(Type.String()),
    price: Type.Number({ minimum: 0 }),
    stock: Type.Number({ minimum: 0, default: 0 }),
    category: StringEnum(['electronics', 'clothing', 'books', 'other'], {
      default: 'other'
    }),
    is_active: Type.Boolean({ default: true }),
  },
  { $id: 'Products', additionalProperties: false }
)
export const productsValidator = getValidator(productsSchema, dataValidator)
export const productsResolver = resolve({})

export const productsExternalResolver = resolve({})

// Schema for creating new entries
export const productsDataSchema = Type.Pick(productsSchema, ['name', 'description', 'price', 'stock', 'category'], {
  $id: 'ProductsData'
})
export const productsDataValidator = getValidator(productsDataSchema, dataValidator)
export const productsDataResolver = resolve({})

// Schema for updating existing entries
export const productsPatchSchema = Type.Partial(productsSchema, {
  $id: 'ProductsPatch'
})
export const productsPatchValidator = getValidator(productsPatchSchema, dataValidator)
export const productsPatchResolver = resolve({})

// Schema for allowed query properties
export const productsQueryProperties = Type.Pick(productsSchema, ['id', 'name', 'category', 'is_active', 'price', 'stock'])
export const productsQuerySchema = Type.Intersect(
  [
    querySyntax(productsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const productsQueryValidator = getValidator(productsQuerySchema, queryValidator)
export const productsQueryResolver = resolve({})
