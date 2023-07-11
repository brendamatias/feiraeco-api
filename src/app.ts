import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

import { usersRoutes } from './controllers/users/routes'
import { fairsRoutes } from './controllers/fairs/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(usersRoutes)
app.register(fairsRoutes, { prefix: 'fairs' })
