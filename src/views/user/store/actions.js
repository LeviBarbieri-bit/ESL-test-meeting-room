import services from '@/http'

export const ActionAddUser = (context, payload) => (
    services.user.addOnUser(payload)
)