import { Notes } from '../components'

export default [
    {
        path: '/',
        component: Notes,
        name: 'notes',
        meta: {
            guest: false,
            needsAuth: true
        }
    }
]