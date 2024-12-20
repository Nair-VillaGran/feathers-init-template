import { Ability, AbilityBuilder } from '@casl/ability'
import { logger } from '../logger.js'

export function defineAbilityFor(user) {
    const { can, cannot, build } = new AbilityBuilder(Ability)

    // Base permissions for all users
    can('read', 'products')

    if (user) {
        if (user.role === 'admin') {
            can('manage', 'all')
        }

        if (user.role === 'user') {
            can('read', 'users')

            can('read', 'products')
            can('create', 'products')
            can('update', 'products')
        }
    }

    const ability = build()
    logger.info('Abilities:', ability.rules?.[0])

    return ability
}