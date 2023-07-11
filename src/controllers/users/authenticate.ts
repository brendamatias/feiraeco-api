import { ApiError } from '@/exceptions'
import { errors } from '@/exceptions/errors'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) throw new ApiError(errors.USER_NOT_FOUND)

  const doestPasswordMatches = await compare(password, user.password_hash)

  if (!doestPasswordMatches) throw new ApiError(errors.PASSWORD_INCORRECT)

  const token = await reply.jwtSign({
    sub: user.id,
  })

  return reply.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  })
}
