import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { errors } from '@/exceptions/errors'
import { ApiError } from '@/exceptions'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) throw new ApiError(errors.USER_ALREADY_CREATED)

  const passwordHash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })

  return reply.status(201).send()
}
