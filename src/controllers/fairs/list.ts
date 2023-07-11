import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const fairs = await prisma.fair.findMany({
    where: {
      user_id: request.user.sub,
    },
  })

  return reply.status(200).send(fairs)
}
