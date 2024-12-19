export async function up(knex) {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.text('description').nullable()
    table.decimal('price', 10, 2).notNullable().defaultTo(0)
    table.integer('stock').defaultTo(0)
    table.enum('category', ['electronics', 'clothing', 'books', 'other']).defaultTo('other')
    table.boolean('is_active').defaultTo(true)
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt').nullable()
  })
}

export async function down(knex) {
  await knex.schema.dropTable('products')
}
