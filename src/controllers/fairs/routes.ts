import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { create } from './create'
import { list } from './list'
import { show } from './show'

export async function fairsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, create)
  app.get('/', { onRequest: [verifyJwt] }, list)
  app.get('/:id', { onRequest: [verifyJwt] }, show)
}
