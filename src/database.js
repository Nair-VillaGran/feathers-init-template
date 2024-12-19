import knex from 'knex'
import { logger } from './logger.js'

export const database = (app) => {
  // Load our database connection info from the app configuration
  const config = app.get('postgresql')
  const db = knex(config)

  try {
    const validateConnection = async () => {
      try {
        await db.raw('SELECT 1')

        const connectionTest = await db.raw('SELECT current_database()')

        if (!connectionTest.rows || connectionTest.rows.length === 0) {
          throw new Error('Unable to retrieve database information')
        }

        const dbInfo = connectionTest.rows[0]

        logger.database(`Connected to database: ${dbInfo.current_database}`)
        logger.success('Connection established successfully')

        // Optional options (This code can be commented out)
        const tablesResult = await db.raw(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
        `)
        
        // Optional options (This code can be commented out)
        const tableNames = tablesResult.rows.map((row) => row.table_name)

        // Optional options (This code can be commented out)
        if (tableNames?.length) {
          logger.database('Tables in the database:')
          tableNames.forEach((table) => {
            logger.databaseTable(table)
          })
        }
        
      } catch (error) {
        logger.danger('Critical connection error')
        logger.error(`Error details: ${error.message}`)
        throw error
      }
    }

    validateConnection()
    app.set('databaseClient', db)
  } catch (error) {
    logger.danger('Database connection failed!')
    logger.error(`Error details: ${error.message}`)
    throw new Error('Unable to establish database connection')
  }
}
