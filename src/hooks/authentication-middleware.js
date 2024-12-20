export const extractUserFromToken = async (context) => {
  const { user } = context.params
  const { accessToken } = context.params?.authentication || {}

  if (user) return context

  if (accessToken) {
    try {
      const authService = context.app.service('authentication')
      const payload = await authService.verifyAccessToken(accessToken)
      
      const knexClient = context.app.get('databaseClient')

      const userResult = await knexClient('users').where({ id: payload.sub }).first()

      if (userResult) {
        delete userResult.password
        context.params.user = userResult
      }
    } catch (error) {
      context.params.user = null
    }
  }

  return context
}
