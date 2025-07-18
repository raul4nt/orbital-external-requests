import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetSpaceshipsListUseCase } from '@/use-cases/factories/make-get-spaceships-list-use-case'

export async function getSpaceships(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getSpaceshipsListUseCase = makeGetSpaceshipsListUseCase()
    const { spaceships } = await getSpaceshipsListUseCase.execute({})
    return reply.status(200).send({
      spaceships,
    })
  } catch (err) {
    console.error(err)
    return reply.status(500).send({
      error: 'Erro ao buscar informações das naves.',
    })
  }
}
