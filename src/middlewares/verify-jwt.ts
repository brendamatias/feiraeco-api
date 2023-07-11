import { ApiError } from '@/exceptions'
import { errors } from '@/exceptions/errors'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new ApiError(errors.TOKEN_INVALID)
  }
}
