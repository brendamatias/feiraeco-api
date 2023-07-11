import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ApiError } from '@/exceptions'
import { errors } from '@/exceptions/errors'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showFairParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = showFairParamsSchema.parse(request.params)

  const fair = await prisma.fair.findFirst({
    where: {
      id,
      user_id: request.user.sub,
    },
  })

  if (!fair) throw new ApiError(errors.FAIR_NOT_FOUND)

  return reply.status(200).send(fair)
}
