import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { errors } from '@/exceptions/errors'
import { ApiError } from '@/exceptions'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().min(3).max(100),
  })

  const { name } = createBodySchema.parse(request.body)

  const fairExists = await prisma.fair.findFirst({
    where: {
      name,
      user_id: request.user.sub,
    },
  })

  if (fairExists) throw new ApiError(errors.FAIR_ALREADY_CREATED)

  await prisma.fair.create({
    data: {
      name,
      user_id: request.user.sub,
    },
  })

  return reply.status(201).send()
}
