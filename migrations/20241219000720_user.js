export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('email').unique()
    table.enum('role', ['admin', 'user']).defaultTo('user')
    table.string('password')
    table.string('googleId')
    table.string('facebookId')
    table.string('twitterId')
    table.string('githubId')
    table.string('auth0Id')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt').nullable()
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
