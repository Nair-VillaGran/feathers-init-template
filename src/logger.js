// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
import { createLogger, format, transports } from 'winston'
import chalk from 'chalk'

// Función para agregar emojis y colores según el nivel de log
const levelStyles = {
  error: {
    color: chalk.bold.red,
    emoji: '🚨',
    prefix: 'ERROR'
  },
  warn: {
    color: chalk.bold.yellow,
    emoji: '⚠️ ',
    prefix: 'WARN'
  },
  info: {
    color: chalk.bold.blue,
    emoji: '📝',
    prefix: 'INFO'
  },
  debug: {
    color: chalk.bold.green,
    emoji: '🔍',
    prefix: 'DEBUG'
  },
  verbose: {
    color: chalk.bold.magenta,
    emoji: '📢',
    prefix: 'VERBOSE'
  },
  database: {
    color: chalk.bold.magenta,
    emoji: '🔌',
    prefix: 'DATABASE'
  },
  databaseTable: {
    color: chalk.bold.magenta,
    emoji: ' ℗',
    prefix: 'TABLE'
  }
}

// Formato de log personalizado y súper colorido
const colorfulFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
  const { color, emoji: levelEmoji, prefix } = levelStyles[level] || levelStyles.info
  
  // Formatear timestamp solo con hora en verde
  const formattedTimestamp = chalk.green(`[${timestamp.split(' ')[1]}]`)
  
  // Formatear mensaje principal
  const formattedMessage = color(`${levelEmoji} ${prefix}: ${message}`)
  
  // Agregar metadatos si existen
  const metadataStr = Object.keys(metadata).length 
    ? chalk.cyan(`\n  📦 Detalles: ${JSON.stringify(metadata, null, 2)}`) 
    : ''
  
  return `${formattedTimestamp} ${formattedMessage}${metadataStr}`
})

// Configurar logger
export const logger = createLogger({
  level: 'debug',
  levels: {
    error: 0,
    warn: 1,
    info: 2,

    // Personalizated levels
    database: 3,
    databaseTable: 4,
    //
    
    verbose: 5,
    debug: 6,
  },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    colorfulFormat
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      handleRejections: true
    })
  ]
})

// Métodos personalizados para hacer el logging aún más divertido
logger.success = (message, ...args) => {
  logger.info(`✅ ${chalk.green(message)}`, ...args)
}

logger.connection = (message, ...args) => {
  logger.info(`🔌 ${chalk.magenta.bold(message)}`, ...args)
}

logger.danger = (message, ...args) => {
  logger.error(`💥 ${chalk.red.bold(message)}`, ...args)
}

logger.database = (message, ...args) => {
  logger.log('database', message, ...args)
}

logger.databaseTable = (message, ...args) => {
  logger.log('databaseTable', message, ...args)
}