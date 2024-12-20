import { defineAbilityFor } from '../abilities/defineAbility.js'
import { NotAcceptable, Forbidden } from '@feathersjs/errors'

export function authorize(action) {
  return async (context) => {
    const resource = context.path || context.service.path
    const { user } = context.params

    const ability = defineAbilityFor(user)

    if (!ability.can(action, resource)) {
      throw new NotAcceptable('No tienes permiso para realizar esta acción')
    }

    return context
  }
}
